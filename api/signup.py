import os
import json
import boto3
import hashlib

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')

# 文字列をSHA256ハッシュ関数によりハッシュ化する関数
def hashing(data):
    hashed_data = hashlib.sha256(data.encode()).hexdigest()
    
    return hashed_data

# ユーザIDが重複していないかどうか確認する関数
def user_id_check(user_id):
    response = dynamodb.query(
        TableName=TABLE_NAME,
        KeyConditionExpression = "userId = :val",
        ExpressionAttributeValues={":val": {"S": user_id}},
    )
    
    if response["Items"]:
        return False
    else:
        return True
    

def SignupAPI(request_body):
    user_id = request_body["user_id"]
    user_name = request_body["user_name"]
    password = request_body["password"]
    
    if user_id_check(user_id):
        hashed_password = hashing(password)
        dynamodb.put_item(
            TableName=TABLE_NAME,
            Item={
                "userId": {"S": user_id},
                "cycleId": {"S": "user_cycle"}, # 現在は1ユーザにつき1つのサイクルのみ作成可能
                "userName": {"S": user_name},
                "hashedPassword": {"S": hashed_password},
                "session": {"S": "none"},
                "try": {"S": ""},
                "time": {"N": "0"},
                "gohobi": {"S": ""},
                "totalTime": {"N": "0"},
                "totalUsedGohobi": {"N": "0"},
            }
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
    else:
        return {
            'statusCode': 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                #"Access-Control-Allow-Credentials": 'true'
            },
            'body': json.dumps({
                'status': False
            })
        }
    