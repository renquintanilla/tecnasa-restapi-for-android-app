import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthLambdas } from "./../handlers/auth";
import { DynamoDBStack } from './dynamo-db-stack';

interface AuthServerlessProps extends StackProps {
    prefix: string;
    JWT_KEY: string;
    USER_TABLE_NAME: string;
    GROUP_TABLE_NAME: string;
    dynamoDBStack: DynamoDBStack;

}

export class AuthServerlessStack extends Stack {

    public readonly authLambdas: AuthLambdas;

    constructor(scope: Construct, id: string, props: AuthServerlessProps) {
        super(scope, id, props);

        this.authLambdas = new AuthLambdas(scope, {
            USER_TABLE_NAME: props.USER_TABLE_NAME,
            GROUP_TABLE_NAME: props.GROUP_TABLE_NAME,
            JWT_KEY: props.JWT_KEY
        });

        props.dynamoDBStack.userTable.grantReadData(this.authLambdas.login);
        props.dynamoDBStack.userTable.grantReadWriteData(this.authLambdas.register);

        props.dynamoDBStack.groupTable.grantReadData(this.authLambdas.login);
        props.dynamoDBStack.groupTable.grantReadWriteData(this.authLambdas.register);

    }
}