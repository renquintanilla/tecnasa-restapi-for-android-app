import * as AWS from 'aws-sdk';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
const passwordHash = require('password-hash');
const db = new AWS.DynamoDB.DocumentClient();

import { LoginSchema } from "./validations/login";

const userTableName = process.env.USER_TABLE_NAME;
const groupTableName = process.env.GROUP_TABLE_NAME;

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

    }

    const payload: User = typeof body == 'object' ? body : JSON.parse(body);

    //VALIDAR EL DATOS DE ENTRADA

    const { error } = LoginSchema.validate(payload);

    if(error) {


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

        }

        passwordHash.verify(payload.password, userDb.password);
        


    } catch (error) {
        
    }


} 

export const register = async (event: any): Promise<any> => {

} 