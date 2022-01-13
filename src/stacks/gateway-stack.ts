import { Stack, StackProps, Construct } from "@aws-cdk/core";
import {RestApi} from "@aws-cdk/aws-apigateway";


interface GatewayProps extends StackProps {
    prefix: string;
}

export class GateWayStack extends Stack {
    constructor(scope: Construct, id: string, props: GatewayProps) {
        super(scope, id, props);

        const apiGateway = new RestApi(this, `${ props.prefix }RestApi`, {
            deploy: false
        });

        apiGateway.root.addMethod('ANY');

    }
}