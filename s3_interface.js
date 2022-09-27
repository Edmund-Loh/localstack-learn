// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
// Set the region 
AWS.config.update({region: 'ap-southeast-1'});

const isLocal = true;

// Create S3 service object
s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  endpoint: isLocal ? 'http://localhost:4566' : undefined
});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});