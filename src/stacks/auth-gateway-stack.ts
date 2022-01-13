
import { NestedStack,Construct, NestedStackProps} from "@aws-cdk/core";
import {Method, RestApi, LambdaIntegration} from "@aws-cdk/aws-apigateway";
import { AuthServerlessStack } from "./auth-serverless-stack";

interface AuthGatewayProps extends NestedStackProps {
    prefix: string;
    authServerlessStack: AuthServerlessStack;
    apiGateway: RestApi;
}

export class AuthGatewayStack extends NestedStack {

    public readonly methods: Array<Method> = [];


    constructor(scope: Construct, id: string, props: AuthGatewayProps) {
        super(scope, id, props);

        
        const authLambdas = props.authServerlessStack.authLambdas;

        const authGateway = RestApi.fromRestApiAttributes(this, props.apiGateway.restApiName, {
            restApiId: props.apiGateway.restApiId,
            rootResourceId: props.apiGateway.root.resourceId
        });

        const loginIntegration = new LambdaIntegration(authLambdas.login);
        const loginResource = authGateway.root.addResource('token');
        const loginMethod = loginResource.addMethod('POST', loginIntegration);
        this.methods.push(loginMethod);

        const registerIntegration = new LambdaIntegration(authLambdas.register);
        const registerResource = authGateway.root.addResource('register');
        const registerMethod = registerResource.addMethod('POST', registerIntegration);
        this.methods.push(registerMethod);
    }
}