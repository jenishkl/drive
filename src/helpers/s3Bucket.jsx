import AWS from "aws-sdk";

AWS.config.region = "your-region"; // e.g., us-west-2
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "your-identity-pool-id",
  
  
});
AWS
const s3 = new AWS.S3();
