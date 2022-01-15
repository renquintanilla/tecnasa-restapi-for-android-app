import { GateWayStack } from '../stacks/gateway-stack';
import { AuthServerlessStack } from "../stacks/auth-serverless-stack";
import { DynamoDBStack } from "../stacks/dynamo-db-stack";
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeployApiStack } from '../stacks/deploy-api-stack';
import { AuthGatewayStack } from '../stacks/auth-gateway-stack';

interface RootStack extends StackProps {
  prefix: string;
  JWT_KEY: string;
}

export class TecnasaRestapiStack extends Stack {
  constructor(scope: Construct, id: string, props: RootStack) {
    super(scope, id, props);

    const dynamoDBStack = new DynamoDBStack(this, `${ props.prefix }DynamodbSt`, {
      prefix: props.prefix
    });

    const gatewayStack = new GateWayStack(this, `${ props.prefix }GatewaySt`, {
      prefix: props.prefix
    });


    const authServerlessStack = new AuthServerlessStack(this, `${ props.prefix }AuthServerlessSt`, {
      prefix: props.prefix,
      JWT_KEY: props.JWT_KEY,
      USER_TABLE_NAME: dynamoDBStack.userTable.tableName,
      GROUP_TABLE_NAME: dynamoDBStack.groupTable.tableName,
      dynamoDBStack
    });

    const authGatewayStack = new AuthGatewayStack(this, `${ props.prefix }AuthGatewaySt`, {
      prefix: props.prefix,
      authServerlessStack,
      apiGateway: gatewayStack.apiGateway
    });

    new DeployApiStack(this, `${ props.prefix }DeployApiSt`, {
      prefix: props.prefix,
      restApi: gatewayStack.apiGateway,
      methods: authGatewayStack.methods
    });
  }
}
