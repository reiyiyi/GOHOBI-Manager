import os
import json
import boto3

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')

def GetCycleAPI(user_id, request_body):
    response = dynamodb.get_item(
        TableName=TABLE_NAME,
        Key={
            'userId': {
                'S': user_id
            }
        }
    )
    
    total_time = response["Item"]["totalTime"]
    time_ = response["Item"]["time"]
    total_used_gohobi = response["Item"]["totalUsedGohobi"]
    try_ = response["Item"]["try"]
    gohobi = response["Item"]["gohobi"]
    
    # サイクルが生成されていない場合
    if not try_:
        return {
            'statusCode': 200,
            'body': json.dumps({
                'status': True,
                'is_created': False,
            })
        }
    
    required_time = total_time % time_
    if required_time == 0:
        required_time = time_
    unused_gohobi = total_time // time_ - total_used_gohobi
        
    return {
        'statusCode': 200,
        'body': json.dumps({
            'status': True,
            'is_created': True,
            'requiredTime': required_time,
            'unusedGohobi': unused_gohobi,
            'try': try_,
            'gohobi': gohobi
        })
    }