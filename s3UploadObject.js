// Import required AWS SDK clients and commands for Node.js.
import {s3} from "./s3Config.js";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {basename} from "path";
import {createReadStream} from "fs";

const file = './uploads/testfile.txt'; // Path to and name of object. For example '../myFiles/index.js'.
const fileStream = createReadStream(file);

const bucketName = 'localstack-test-bucket-1';
const key = basename(file);

// Set the parameters
export const uploadParams = {
  Bucket: bucketName,
  Key: key,
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