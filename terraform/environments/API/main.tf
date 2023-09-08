module "dynamodb" {
  source             = "../modules/dynamodb"
  prefix             = var.prefix
  session_index_name = var.session_index_name
}

module "iam" {
  source              = "../modules/iam"
  prefix              = var.prefix
  data_list_table-arn = module.dynamodb.data_list_table.arn
}

module "lambda" {
  source                       = "../modules/lambda"
  prefix                       = var.prefix
  data_list_table-name         = module.dynamodb.data_list_table.name
  data_list_session-index-name = "${var.prefix}_${var.session_index_name}"
  lambda_role-arn              = module.iam.lambda_role-arn
  api-execution-arn            = module.api_gateway.api-execution-arn
}

module "api_gateway" {
  source            = "../modules/api-gateway"
  prefix            = var.prefix
  lambda-invoke-arn = module.lambda.lambda-invoke-arn
}

