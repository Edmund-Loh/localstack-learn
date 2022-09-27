import {s3} from './s3Config.js';
import { CreateBucketCommand } from '@aws-sdk/client-s3';

// Set the bucket parameters.
export const bucketParams = { Bucket: 'localstack-test-bucket-1' };

export const run = async () => {
  try {
    const data = await s3.send(new CreateBucketCommand(bucketParams));
    console.log('Success', data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();