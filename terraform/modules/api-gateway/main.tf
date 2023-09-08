resource "aws_api_gateway_rest_api" "api" {
  name = "${var.prefix}_api"
}

resource "aws_api_gateway_method" "api_get" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id   = aws_api_gateway_rest_api.api.id
}

resource "aws_api_gateway_integration" "api_get" {
  http_method             = aws_api_gateway_method.api_get.http_method
  resource_id             = aws_api_gateway_rest_api.api.root_resource_id
  rest_api_id             = aws_api_gateway_rest_api.api.id
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda-invoke-arn
}

resource "aws_api_gateway_deployment" "api" {
  depends_on = [
    aws_api_gateway_integration.api_get
  ]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "prod"
  triggers = {
    redeployment = filebase64("${path.module}/main.tf")
  }
}
