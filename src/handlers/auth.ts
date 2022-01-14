import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface AuthLambdasProps {
    USER_TABLE_NAME: string;
}

export class AuthLambdas {

    public readonly login: lambda.Function;
    public readonly register: lambda.Function;

    constructor(scope: Construct, props: AuthLambdasProps){

        this.login = new lambda.Function(scope, 'Login', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('build/lambdas'),
            handler: 'auth.login',
            environment: {
                USER_TABLE_NAME: props.USER_TABLE_NAME
            }
        });

        this.register = new lambda.Function(scope, 'Register', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('build/lambdas'),
            handler: 'auth.register',
            environment: {
                USER_TABLE_NAME: props.USER_TABLE_NAME
            }
        });

    }
}