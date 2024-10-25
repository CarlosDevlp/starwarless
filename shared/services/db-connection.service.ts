import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class DBConnectionService  { 

    public static get instance(): DBConnectionService {
        if (!DBConnectionService._instance) {
            DBConnectionService._instance = new DBConnectionService();
            const mode = process.env.MODE || 'none';
            if(mode === 'local') {
                DBConnectionService._instance.setUpDBLocally();
            }
        }
        console.log('DBConnectionService created - mode', process.env.MODE);
        return DBConnectionService._instance;
    } 
    private static _instance: DBConnectionService;
    private dynamoDBClient = new DynamoDBClient();
    public dynamoDBDocumentClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
    
    private constructor() { }


    private setUpDBLocally(){
        console.log('DBConnectionService created - mode => ', process.env.MODE);
        this.dynamoDBClient = new DynamoDBClient({
            region: 'us-east-1', 
            endpoint: 'http://localhost:8000', 
        });
        this.dynamoDBDocumentClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
    }
    
}