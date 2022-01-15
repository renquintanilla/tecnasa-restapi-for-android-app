import { Construct } from 'constructs';
import {RestApi} from "aws-cdk-lib/aws-apigateway";
import { Stack, StackProps } from 'aws-cdk-lib';


interface GatewayProps extends StackProps {
    prefix: string;
}

export class GateWayStack extends Stack {

    public readonly apiGateway: RestApi;

    constructor(scope: Construct, id: string, props: GatewayProps) {
        super(scope, id, props);

        this.apiGateway = new RestApi(this, `${ props.prefix }RestApi`, {
            deploy: false
        });

        this.apiGateway.root.addMethod('ANY');

    }
}