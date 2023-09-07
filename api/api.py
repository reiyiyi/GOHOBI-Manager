import json
from signup import SignupAPI
from login import LoginAPI
from getCycle import GetCycleAPI
from createCycle import CreateCycleAPI
from reportTry import ReportTryAPI
from reportGohobi import ReportGohobiAPI
from logout import LogoutAPI

def handler(event, context):
    request_body = eval(event["body"])
    request_api_name = request_body["API"]
    
    # 新規登録処理を行なうAPI
    if request_api_name == "SignupAPI":
        return SignupAPI(request_body)
    
    # ログイン処理を行なうAPI
    if request_api_name == "LoginAPI":
        return LoginAPI(request_body)
    
    # サイクル情報の取得処理を行なうAPI
    if request_api_name == "GetCycleAPI":
        return GetCycleAPI(request_body)
    
    # サイクルの生成処理を行なうAPI
    if request_api_name == "CreateCycleAPI":
        return CreateCycleAPI(request_body)
    
    # 頑張りの時間の更新処理を行なうAPI
    if request_api_name == "ReportTryAPI":
        return ReportTryAPI(request_body)
    
    # ごほうびの消費回数の更新処理を行なうAPI
    if request_api_name == "ReportGohobiAPI":
        return ReportGohobiAPI(request_body)
    
    # ログアウト処理を行なうAPI
    if request_api_name == "LogoutAPI":
        return LogoutAPI(request_body)
    
    return {
        'statusCode': 200,
        'body': json.dumps({"message":"f{request_api_name} does not exist."})
    }