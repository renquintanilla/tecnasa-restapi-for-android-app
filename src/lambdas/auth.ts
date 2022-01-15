import * as AWS from 'aws-sdk';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
const passwordHash = require('password-hash');
const db = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

import * as jwt from 'jsonwebtoken';

import {
    StatusCodes,
} from 'http-status-codes';
import { response } from './services/response-services';

import { LoginSchema } from "./validations/login";
import { RegisterSchema } from './validations/register';

const userTableName = process.env.USER_TABLE_NAME;
const groupTableName = process.env.GROUP_TABLE_NAME;
const jwtKey = process.env.JWT_KEY ?? '';

interface User {
    userName: string;
    password: string;
}

interface UserDB extends User {
    fullName: string;
}


export const login = async (event: any): Promise<any> => {

    const { body } = event;

    if(!body) {
        return response(StatusCodes.BAD_REQUEST, {
            message: 'PETICIÓN INCORRECTA'
        });
    }

    const payload: User = typeof body == 'object' ? body : JSON.parse(body);

    //VALIDAR EL DATOS DE ENTRADA

    const { error } = LoginSchema.validate(payload);

    if(error) {
        return response(StatusCodes.BAD_REQUEST, {
            message: error
        });
    }

    const userQuery: any = {
        TableName: userTableName,
        FilterExpression: 'userName = :userNameValue',
        ExpressionAttributeValues: {
            ':userNameValue': payload.userName
        }
    };

    try {
        const queryResult: ScanOutput = await db.scan(userQuery).promise();

        const singleResult = queryResult?.Items?.[0];

        if(!singleResult) return;

        const userDb: any = singleResult;

        if(!userDb) {
            return response(StatusCodes.UNAUTHORIZED, {
                message: 'USUARIO O CONTRASEÑA INCORRECTA'
            });
        }

        const isValidPassword = passwordHash.verify(payload.password, userDb.password);
        
        if(!isValidPassword) {
            return response(StatusCodes.UNAUTHORIZED, {
                message: 'USUARIO O CONTRASEÑA INCORRECTA'
            });
        }

        const tokenPayload = {
            userId: userDb.userId
        };

        const token = jwt.sign(tokenPayload, jwtKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(tokenPayload, jwtKey, { expiresIn: '800h' });
        
        return response(StatusCodes.OK, {
            token,
            refreshToken
        });


    } catch (error) {
        console.log(error);
        return response(StatusCodes.INTERNAL_SERVER_ERROR, {
            error
        });
    }


} 

export const register = async (event: any): Promise<any> => {
    const { body } = event;

    if(!body) {
        return response(StatusCodes.BAD_REQUEST, {
            message: 'PETICIÓN INCORRECTA'
        });
    }

    const payload: User = typeof body == 'object' ? body : JSON.parse(body);

    //VALIDAR EL DATOS DE ENTRADA

    const { error } = RegisterSchema.validate(payload);

    if(error) {
        return response(StatusCodes.BAD_REQUEST, {
            message: error
        });
    }

    const userQuery: any = {
        TableName: userTableName,
        FilterExpression: 'userName = :userNameValue',
        ExpressionAttributeValues: {
            ':userNameValue': payload.userName
        }
    };

    try {
        const queryResult: ScanOutput = await db.scan(userQuery).promise();

        if(Array.isArray(queryResult.Items) && queryResult.Items.length) {
            return response(StatusCodes.CONFLICT, {
                message: 'USUARIO YA EXISTE'
            });
        }

        const userId = uuidv4();

        const password = passwordHash.generate(payload.password, { saltLength: 10 });

        const registerUserQuery: any = {
            TableName: userTableName,
            Item: {
                userId,
                userName: payload.userName,
                password
            }
        };

        await db.put(registerUserQuery).promise();

    } catch(error) {
        console.log(error);
        return(StatusCodes.INTERNAL_SERVER_ERROR, {
            error
        });
    }

} 