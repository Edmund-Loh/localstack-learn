import {S3} from "@aws-sdk/client-s3";

const isLocal = process.env.ENVIRONMENT === 'PROD' ? false : true;

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// Create S3 service object
export const s3 = new S3({
  credentials: credentials,
  endpoint: 'http://localhost:4566',
  forcePathStyle: true
});