import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GateWayStack } from './../stacks/gateway-stack';

interface RootStack extends StackProps {
  prefix: string;
}

export class TecnasaRestapiForAndroidAppStack extends Stack {
  constructor(scope: Construct, id: string, props: RootStack) {
    super(scope, id, props);

    const gatewayStack = new GateWayStack(this, `${ props.prefix }GatewayStack`, {
      prefix: props.prefix
    });

  }
}
