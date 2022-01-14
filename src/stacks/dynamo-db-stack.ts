import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";


interface DynamoDBStackProps extends StackProps {
    prefix: string;    
};

export class DynamoDBStack extends Stack {

    public readonly userTable: Table;
    public readonly groupTable: Table;

    constructor(scope: Construct, id: string, props: DynamoDBStackProps) {
        super(scope, id, props);

        const userTableName = `${ props.prefix }-users`;

        this.userTable = new Table(scope, userTableName, {
            partitionKey: {
                name: 'userId',
                type: AttributeType.STRING
            },
            tableName: userTableName,
            removalPolicy: RemovalPolicy.DESTROY
        });

        const groupTable = `${ props.prefix }-groups`;

        this.groupTable = new Table(scope, groupTable, {
            partitionKey: {
                name: 'groupId',
                type: AttributeType.STRING
            },
            tableName: groupTable,
            removalPolicy: RemovalPolicy.DESTROY
        });

    }       
}