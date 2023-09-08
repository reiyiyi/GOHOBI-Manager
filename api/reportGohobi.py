import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')


def ReportGohobiAPI(user_id, request_body):
    use_gohobi = request_body["useGohobi"]
    
    response = dynamodb.update_item(
        TableName=TABLE_NAME,
        Key={
            "userId": {
                "S": user_id
            }
        },
        UpdateExpression="ADD totalUsedGohobi :val",
        ExpressionAttributeValues={
            ":val": {"N": str(use_gohobi)}
        },
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'status': True
        })
    }