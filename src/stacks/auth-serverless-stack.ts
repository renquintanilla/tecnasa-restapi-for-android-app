
import { Stack,Construct, StackProps} from "@aws-cdk/core";
import { AuthLambdas } from "src/handlers/auth";

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