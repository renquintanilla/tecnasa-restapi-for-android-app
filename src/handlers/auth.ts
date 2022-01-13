import * as lambda from '@aws-cdk/aws-lambda';
import { Construct } from "@aws-cdk/core";

interface AuthLambdasProps {
    USER_TABLE_NAME: string;
}

export class AuthLambdas {

    public readonly login: lambda.Function;
    public readonly register: lambda.Function;

    constructor(scope: Construct, props: AuthLambdasProps){

        this.login = new lambda.Function(scope, 'Login', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(''),
            handler: 'auth.login',
            environment: {
                USER_TABLE_NAME: props.USER_TABLE_NAME
            }
        });

        this.register = new lambda.Function(scope, 'Register', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(''),
            handler: 'auth.register',
            environment: {
                USER_TABLE_NAME: props.USER_TABLE_NAME
            }
        });

    }
}