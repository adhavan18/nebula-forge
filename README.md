# nebula forge

nebula forge is my aws deployment project for ai services.

the idea is simple: when i have a new version of an ai api, the project builds it, checks it, deploys it, watches it, and gives me a way to stop a bad release.

## what happens

1. i push code to github.
2. github actions runs the tests and security scan.
3. docker builds the api image.
4. the image is stored in amazon ecr.
5. codepipeline can promote the image to aws.
6. ecs runs the main api service.
7. eks can run extra worker pods when more capacity is needed.
8. lambda checks release signals and decides whether a release should be promoted or quarantined.
9. cloudwatch watches logs, tasks, errors, and alarms.
10. cloudtrail keeps an audit trail of aws changes.

```text
github actions -> ecr -> codepipeline -> ecs
                              |
                              -> eks workers

eventbridge -> lambda sentinel -> promote or quarantine

ecs and lambda -> cloudwatch
aws api activity -> cloudtrail -> s3
```

## tools i used

- terraform for the aws network and ecs foundation
- cloudformation and sam for the lambda release sentinel
- ecs fargate for the api
- eks and kubernetes for burst workers
- lambda and eventbridge for release decisions
- cloudwatch for logs and alarms
- cloudtrail and s3 for audit logs
- github actions for pull request checks and image releases
- codepipeline and codebuild for an aws-native pipeline
- docker and ecr for the container image
- trivy and sbom generation for basic supply chain checks

## project structure

```text
terraform/       aws network, ecs, ecr, cloudwatch, and cloudtrail
cloudformation/  lambda, eventbridge, sqs, and alarms
kubernetes/      eks worker deployment and autoscaling
services/        api and release sentinel code
pipelines/       codebuild configuration
.github/         github actions workflows
```

## run the api locally

```bash
cd services/release-api
npm install
npm test
docker build -t nebula-forge-api .
docker run --rm -p 8080:8080 nebula-forge-api
curl http://localhost:8080/health
```

## deploy the infrastructure

```bash
terraform -chdir=terraform init
terraform -chdir=terraform plan -var='environment=dev'
terraform -chdir=terraform apply -var='environment=dev'

sam build --template-file cloudformation/template.yaml
sam deploy --guided
```

the terraform stack creates the vpc, private subnets, nat gateway, ecr repository, ecs cluster, two fargate tasks, cloudwatch logs, an iam role, an audit bucket, and a cloudtrail trail.

the terraform stack does not create an eks cluster or configure github. those are separate steps.

## what i learned

- how infrastructure as code can create the same environment again
- why containers need health checks and resource limits
- how github oidc avoids storing long-lived aws keys
- how cloudwatch and cloudtrail are different
- why immutable images make deployments easier to roll back
- how a small lambda can automate a release decision

## honest project note

i used ai assistance while building and explaining this project. i tested the local api, reviewed the generated files, and am using the project to learn aws devops patterns. the aws deployment still needs to be run in an aws account before it can be called a live production system.
