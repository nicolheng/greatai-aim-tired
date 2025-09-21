import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

// Debug: Check if environment variables are being read
console.log('🔍 Environment Variables Check:');
console.log('AWS_REGION:', process.env.AWS_REGION ? '✅ Found' : '❌ Missing');
console.log('AWS_ACCESS_KEY:', process.env.AWS_ACCESS_KEY ? `✅ Found (${process.env.AWS_ACCESS_KEY.substring(0, 8)}...)` : '❌ Missing');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? `✅ Found (${process.env.AWS_SECRET_ACCESS_KEY.substring(0, 8)}...)` : '❌ Missing');

// Check for required environment variables
if (!process.env.AWS_REGION) {
  console.error('❌ AWS_REGION is missing in .env file');
}
if (!process.env.AWS_ACCESS_KEY) {
  console.error('❌ AWS_ACCESS_KEY is missing in .env file');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('❌ AWS_SECRET_ACCESS_KEY is missing in .env file');
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

console.log('📡 DynamoDB Client created with region:', process.env.AWS_REGION || 'us-east-1');

export default client;