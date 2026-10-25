variable "aws_region" { type = string; default = "ap-south-1" }
variable "environment" { type = string; default = "dev" }
variable "project" { type = string; default = "nebula-forge" }
variable "vpc_cidr" { type = string; default = "10.70.0.0/16" }
variable "container_image" { type = string; default = "public.ecr.aws/docker/library/node:22-alpine" }
