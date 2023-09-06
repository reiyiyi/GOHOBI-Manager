resource "aws_dynamodb_table" "data_list" {
  name         = "${var.prefix}_data_list"
  billing_mode = "PAY_PER_REQUEST"
  read_capacity  = 20
  write_capacity = 20
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
  attribute {
    name = "userName"
    type = "S"
  }
  attribute {
    name = "hashedPassword"
    type = "S"
  }
  attribute {
    name = "session"
    type = "S"
  }
  attribute {
    name = "try"
    type = "S"
  }
  attribute {
    name = "time"
    type = "N"
  }
  attribute {
    name = "gohobi"
    type = "S"
  }
  attribute {
    name = "totalTime"
    type = "N"
  }
  attribute {
    name = "totalUsedGohobi"
    type = "N"
  }

  global_secondary_index {
    name               = "sessionIndex"
    hash_key           = "session"
    write_capacity     = 20
    read_capacity      = 20
    projection_type    = "ALL"
  }
}
