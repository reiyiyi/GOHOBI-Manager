import os
import json
import boto3
import string
import secrets
import hashlib

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')


# セッション文字列を生成する関数
def create_session(user_id):
    chars = string.ascii_letters + string.digits + string.punctuation
    while True:
        length = secrets.choice(range(16, 20))
        session = "".join([secrets.choice(chars) for _ in range(length)])
        response = dynamodb.query(
            TableName=TABLE_NAME,
            IndexName = SESSION_INDEX_NAME,
            KeyConditionExpression = "#se = :val",
            ExpressionAttributeNames= {
            '#se' : 'Session',
            },
            ExpressionAttributeValues={":val": {"S": session}},
        )
        
        # セッション値が被った場合は再生成
        if response["Items"]:
            continue
        
        # DynamoDBにセッション値を保存
        response = dynamodb.update_item(
            TableName=TABLE_NAME,
            Key={
                "userId": {
                    "S": user_id
                }
            },
            UpdateExpression="SET #se = :val",
            ExpressionAttributeNames= {
            '#se' : 'Session',
            },
            ExpressionAttributeValues={":val": {"S": session}},
        )
        
        return session

# 文字列をSHA256ハッシュ関数によりハッシュ化する関数
def hashing(data):
    hashed_data = hashlib.sha256(data.encode()).hexdigest()
    
    return hashed_data

# ログイン出来るかどうか確認する関数
def login_check(user_id, password):
    response = dynamodb.get_item(
        TableName=TABLE_NAME,
        Key={
            'user_id': {
                'S': user_id
            },
        }
    )
    # ユーザIDが間違っている場合はFalseを返す
    if "Item" not in response:
        return False
    # パスワードが合っているかを確認する
    hashed_password = hashing(password)
    if response["Item"]["hashedPassword"] == hashed_password:
        return True
    else:
        return False
    
    
def LoginAPI(request_body):
    user_id = request_body["user_id"]
    password = request_body["password"]
    
    # ログインに成功したかを判定する
    if login_check(user_id, password):
        # セッション値の生成を行なう
        session = create_session(user_id)
        return {
            'statusCode': 200,
            'body': json.dumps({
                'status': True,
                'session': session,
            })
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({
                'status': False,
                'session': "",
            })
        }