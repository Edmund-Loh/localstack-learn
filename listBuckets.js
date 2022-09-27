// Load the AWS SDK for Node.js
import {S3, ListBucketsCommand} from '@aws-sdk/client-s3';

const isLocal = true;

// Create S3 service object
const s3 = new S3({
  region: 'ap-southeast-1',
  endpoint: isLocal ? 'http://localhost:4566' : undefined //uses the default AWS endpoint when undefined
});

export const run = async() => {
  try {
    const bucketList = await s3.send(new ListBucketsCommand({}));
    console.log("Success", bucketList.Buckets);
    return bucketList; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

run();