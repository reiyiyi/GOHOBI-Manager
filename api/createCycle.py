import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')

def CreateCycleAPI(user_id, request_body):
    try_ = request_body["try"]
    time_ = request_body["time"]
    gohobi = request_body["gohobi"]
    
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
        UpdateExpression="SET #tr = :val1, #ti = :val2, gohobi = :val3, totalTime = :val4, totalUsedGohobi = :val5",
        ExpressionAttributeNames = {
          '#tr' : 'try',
          '#ti' : 'time'
        },
        ExpressionAttributeValues = {
            ":val1": {"S": try_},
            ":val2": {"N": str(time_)},
            ":val3": {"S": gohobi},
            ":val4": {"N": "0"},
            ":val5": {"N": "0"},
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