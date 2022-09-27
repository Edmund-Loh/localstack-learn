import {s3} from './s3Config.js';
import {ListBucketsCommand} from '@aws-sdk/client-s3';

export const run = async() => {
  try {
    const bucketList = await s3.send(new ListBucketsCommand({}));
    console.log('Success', bucketList.Buckets);
    return bucketList; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};

run();