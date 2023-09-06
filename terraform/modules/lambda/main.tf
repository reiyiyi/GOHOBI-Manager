data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../../../api/${var.filename}"
  output_path = "${path.module}/upload/${var.filename}.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = data.archive_file.lambda.output_path
  function_name    = "${var.prefix}_${var.filename}"
  role             = var.lambda_role-arn
  handler          = "${var.filename}.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "python3.8"
  timeout          = 5
  environment {
    variables = {
      TABLE_NAME = var.data_list_table-name
    }
  }
}

resource "aws_lambda_permission" "lambda_permit" {          
  statement_id  = "AllowAPIGatewayGetTrApi"                        
  action        = "lambda:InvokeFunction"                         
  function_name = aws_lambda_function.lambda.arn                 
  principal     = "apigateway.amazonaws.com"                 
  source_arn    = "${var.api-execution-arn}/test/GET/"       
}                                                              