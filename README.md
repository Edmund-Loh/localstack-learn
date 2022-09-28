# localstack-learn
Experimenting with localstack (https://docs.localstack.cloud/overview/)

## Prerequisites
- NodeJS and Node Package Manager (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Docker (https://www.docker.com/)
- Localstack CLI (https://docs.localstack.cloud/get-started/#localstack-cli) - Optional
- AWSLocal (https://docs.localstack.cloud/integrations/aws-cli/#localstack-aws-cli-awslocal) - Optional

## Usage
1. Run `npm install` to install the necessary node packages.
2. Spinup the docker container in detached mode using `docker compose up -d`.
3. Run `node s3MakeBucket` to create the bucket that will be used by the other node apps.