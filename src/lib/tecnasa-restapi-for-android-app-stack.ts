import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface RootStack extends StackProps {
  prefix: string;
}

export class TecnasaRestapiForAndroidAppStack extends Stack {
  constructor(scope: Construct, id: string, props: RootStack) {
    super(scope, id, props);

    
  }
}
