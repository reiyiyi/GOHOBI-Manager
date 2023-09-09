import os
import json
import boto3
from signup import SignupAPI
from login import LoginAPI
from getCycle import GetCycleAPI
from createCycle import CreateCycleAPI
from reportTry import ReportTryAPI
from reportGohobi import ReportGohobiAPI
from logout import LogoutAPI

TABLE_NAME = os.getenv('TABLE_NAME')
SESSION_INDEX_NAME = os.getenv('SESSION_INDEX_NAME')
dynamodb = boto3.client('dynamodb')

# セッション値からユーザIDの取得をする関数
def get_user_id(session):
    response = dynamodb.query(
        TableName=TABLE_NAME,
        IndexName = SESSION_INDEX_NAME,
        KeyConditionExpression = "#se = :val",
        ExpressionAttributeNames= {
        '#se' : 'Session',
        },
        ExpressionAttributeValues={":val": {"S": session}},
    )
    
    # 与えられたセッション値と紐づけられているユーザIDが無い場合
    if not response["Items"]:
        return ""
    
    return response["Items"][0]["userId"]["S"]
    

def handler(event, context):
    request_body = eval(event["body"])
    request_api_name = request_body["API"]
    
    # 新規登録処理を行なうAPI
    if request_api_name == "SignupAPI":
        return SignupAPI(request_body)
    
    # ログイン処理を行なうAPI
    if request_api_name == "LoginAPI":
        return LoginAPI(request_body)
    
    
    #--------以下のAPIはログイン状態であることが必要--------
    session = request_body["session"]
    user_id = get_user_id(session)
    if not user_id:
        return {
            'statusCode': 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                #"Access-Control-Allow-Credentials": 'true'
            },
            'body': json.dumps({
                "message":"Please login."
            })
        }
    
    # サイクル情報の取得処理を行なうAPI
    if request_api_name == "GetCycleAPI":
        return GetCycleAPI(user_id, request_body)
    
    # サイクルの生成処理を行なうAPI
    if request_api_name == "CreateCycleAPI":
        return CreateCycleAPI(user_id, request_body)
    
    # 頑張りの時間の更新処理を行なうAPI
    if request_api_name == "ReportTryAPI":
        return ReportTryAPI(user_id, request_body)
    
    # ごほうびの消費回数の更新処理を行なうAPI
    if request_api_name == "ReportGohobiAPI":
        return ReportGohobiAPI(user_id, request_body)
    
    # ログアウト処理を行なうAPI
    if request_api_name == "LogoutAPI":
        return LogoutAPI(user_id, request_body)
    
    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            #"Access-Control-Allow-Credentials": 'true'
        },
        'body': json.dumps({
            "message":"f{request_api_name} does not exist."
        })
    }