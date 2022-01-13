import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { GateWayStack } from './../stacks/gateway-stack';
import { AuthServerlessStack } from "src/stacks/auth-serverless-stack";
import { DynamoDBStack } from "src/stacks/dynamo-db-stack";

interface RootStack extends StackProps {
  prefix: string;
}

export class TecnasaRestapiForAndroidAppStack extends Stack {
  constructor(scope: Construct, id: string, props: RootStack) {
    super(scope, id, props);


    const dynamoDBStack = new DynamoDBStack(this, `${ props.prefix }DynamodbStack`, {
      prefix: props.prefix
    });

    const gatewayStack = new GateWayStack(this, `${ props.prefix }GatewayStack`, {
      prefix: props.prefix
    });


    const authServerlessStack = new AuthServerlessStack(this, `${ props.prefix }AuthServerlessStack`, {
      prefix: props.prefix
    });

  }
}
