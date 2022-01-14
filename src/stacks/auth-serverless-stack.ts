import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AuthLambdas } from "./../handlers/auth";

interface AuthServerlessProps extends StackProps {
    prefix: string;
}

export class AuthServerlessStack extends Stack {

    public readonly authLambdas: AuthLambdas;

    constructor(scope: Construct, id: string, props: AuthServerlessProps) {
        super(scope, id, props);

        this.authLambdas = new AuthLambdas(scope, {
            USER_TABLE_NAME: ''
        });

    }
}