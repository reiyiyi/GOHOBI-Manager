import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')


def LogoutAPI(user_id, request_body):    
    response = dynamodb.update_item(
        TableName=TABLE_NAME,
        Key={
            "userId": {
                "S": user_id
            }
        },
        UpdateExpression="SET #se :val",
        ExpressionAttributeNames= {
          '#se' : 'session'
        },
        ExpressionAttributeValues={
            ":val": {"S": ""}
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