import {s3} from './s3Config.js';
import {GetObjectCommand} from '@aws-sdk/client-s3';
import {writeFileSync} from 'fs';

const bucketName = 'localstack-test-bucket-1';
const key = 'testfile.txt'

// Set the parameters
export const bucketParams = {
  Bucket: bucketName,
  Key: key,
};

export const run = async () => {
  try {
    // Create a helper function to convert a ReadableStream to a string.
    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });

    // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3.send(new GetObjectCommand(bucketParams));
    console.log(data);
    
    // Convert the ReadableStream to a string.
    const bodyContents = await streamToString(data.Body);
    console.log(bodyContents);

    // Write to a file on local
    writeFileSync('./downloads/textfile.txt',`${bodyContents}\n`,{flag: 'a+'})

    return bodyContents;

  } catch (err) {
    console.log('Error', err);
  }
}
run();