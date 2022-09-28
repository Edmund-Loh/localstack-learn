import {s3} from './s3Config.js';
import {PutObjectCommand,GetObjectCommand,DeleteObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {basename} from 'path';
import {createReadStream,createWriteStream} from 'fs';
import fetch from 'node-fetch';

const file = './uploads/testfileForPreSigned.txt';
const fileStream = createReadStream(file);

const bucketName = 'localstack-test-bucket-1';
const key = basename(file);

// Set the parameters
const uploadParams = {
  Bucket: bucketName,
  Key: key,
  Body: fileStream
};

const downloadParams = {
  Bucket: bucketName,
  Key: key,
};

const downloadFile = (async (url, path) => {
  const res = await fetch(url);
  const fileStream = createWriteStream(path, {flags: 'a+'});
  await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
});

export const run = async () => {
  try {
    // Create a command to put the object in the S3 bucket.
    const uploadCommand = new PutObjectCommand(uploadParams);
    
    // Create the presigned URL for uploading.    
    const signedUploadUrl = await getSignedUrl(s3, uploadCommand, {
      expiresIn: 3600,
    });
    
    console.log(
      `\nPutting "${uploadParams.Bucket}/${uploadParams.Key}" using signedUrl in v3`
    );
    console.log(signedUploadUrl);
    
    // Upload to S3 using the pre-signed URL
    const response = await fetch(signedUploadUrl, {method: 'PUT', body: uploadParams.Body});
    
    console.log(
      `\nResponse returned by signed URL: ${await response.text()}\n`
    );
  } catch (err) {
    console.log("Error creating presigned upload URL", err);
  }

  try {
    // Create the command to download the object from the S3 bucket
    const downloadCommand = new GetObjectCommand(downloadParams);

    // Create the presigned URL.
    const signedDownloadUrl = await getSignedUrl(s3, downloadCommand, {
      expiresIn: 3600,
    });

    console.log(
      `\nGetting "${downloadParams.Bucket}/${downloadParams.Key}" using signedUrlin v3`
    );
    console.log(signedDownloadUrl);

    //Download the file to local
    downloadFile(signedDownloadUrl, './downloads/testfileForPreSigned.txt')

  } catch (err) {
    console.log('Error creating presigned download URL', err);
  }

  // Delete the object.
  try {
    console.log(`\nDeleting object "${uploadParams.Key}" from bucket`);
    const data = await s3.send(
      new DeleteObjectCommand({ Bucket: uploadParams.Bucket, Key: uploadParams.Key })
    );
    console.log('Delete success', data);
  } catch (err) {
    console.log('Error deleting object', err);
  }
};

run();
