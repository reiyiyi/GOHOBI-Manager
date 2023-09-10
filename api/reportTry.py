import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')


def ReportTryAPI(user_id, request_body):
    try_time = request_body["tryTime"]
    
    response = dynamodb.update_item(
        TableName=TABLE_NAME,
        Key={
            "userId": {
                "S": user_id
            },
            "cycleId": {
                "S": "user_cycle"
            }
        },
        UpdateExpression="ADD totalTime :val",
        ExpressionAttributeValues={
            ":val": {"N": str(try_time)}
        },
    )
    
    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            #"Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({
            'status': True
        })
    }