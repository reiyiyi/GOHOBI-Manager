resource "aws_dynamodb_table" "data_list" {
  name           = "${var.prefix}_data_list"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "cycleId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "cycleId"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.prefix}_${var.session_index_name}"
    hash_key        = "session"
    projection_type = "ALL"
  }

  attribute {
    name = "session"
    type = "S"
  }
}
