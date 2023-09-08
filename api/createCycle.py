import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')

def CreateCycleAPI(user_id, request_body):
    try_ = request_body["try"]["S"]
    time_ = int(request_body["time"]["N"])
    gohobi = request_body["gohobi"]["S"]
    
    response = dynamodb.update_item(
        TableName=TABLE_NAME,
        Key={
            "userId": {
                "S": user_id
            }
        },
        # ここら辺書き直して、cycleIdとかも更新する必要あるから
        UpdateExpression="SET #tr = :val1, #ti = :val2, gohobi = :val3, totalTime = :val4, totalUsedGohobi = :val5",
        ExpressionAttributeNames = {
          '#ty' : 'try',
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
        'body': json.dumps({
            'status': True
        })
    }