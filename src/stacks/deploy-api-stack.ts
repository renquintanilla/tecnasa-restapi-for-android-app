import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Deployment, Method, RestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface DeployApiProps extends NestedStackProps {
    prefix: string;
    restApi:  RestApi,
    methods: Array<Method>
}

export class DeployApiStack extends NestedStack {
    constructor(scope: Construct, id: string, props: DeployApiProps) {
        super(scope, id, props);


        const deployment = new Deployment(this, `${ props.prefix }Deployment`, {
            api: RestApi.fromRestApiId(this, props.restApi.restApiName, props.restApi.restApiId)
        });
        if(props.methods) {
            for(const method of props.methods) {
                deployment.node.addDependency(method);
            }
        }
        new Stage(this, `${ props.prefix }Stage`, { 
            deployment
         });
    }
}