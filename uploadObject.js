// Import required AWS SDK clients and commands for Node.js.
import {S3,PutObjectCommand} from "@aws-sdk/client-s3";
import {basename} from "path";
import {createReadStream} from "fs";

const isLocal = true;

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// Create S3 service object
const s3 = new S3({
  credentials: isLocal ? credentials : undefined,
  region: 'ap-southeast-1',
  endpoint: isLocal ? 'http://localhost:4566' : undefined //uses the default AWS endpoint when undefined
});

const file = "./document/testfile"; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = createReadStream(file);

// Set the parameters
export const uploadParams = {
  Bucket: "localstack-test-bucket-1",
  // Add the required 'Key' parameter using the 'path' module.
  Key: basename(file),
  // Add the required 'Body' parameter
  Body: fileStream
};


// Upload file to specified bucket.
export const run = async () => {
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

run();