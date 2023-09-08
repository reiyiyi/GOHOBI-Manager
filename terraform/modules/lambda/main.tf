data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../../../api"
  output_path = "${path.module}/upload/lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "${var.prefix}_lambda"
  role             = var.lambda_role-arn
  handler          = "api.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "python3.8"
  timeout          = 5
  environment {
    variables = {
      TABLE_NAME = var.data_list_table-name,
      SESSION_INDEX_NAME = var.data_list_session-index-name,
    }
  }
}

resource "aws_lambda_permission" "lambda_permit" {          
  statement_id  = "AllowAPIGatewayInvokeFunction"                        
  action        = "lambda:InvokeFunction"                         
  function_name = aws_lambda_function.lambda.arn                 
  principal     = "apigateway.amazonaws.com"                 
  source_arn    = "${var.api-execution-arn}/*"       
}                                                              