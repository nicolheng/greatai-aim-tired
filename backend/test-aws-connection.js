import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

async function testAWSConnection() {
  console.log('🔍 Testing AWS DynamoDB Connection...\n');
  
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  try {
    // Test basic AWS connection by listing tables
    console.log('📡 Attempting to list DynamoDB tables...');
    const command = new ListTablesCommand({});
    const response = await client.send(command);
    
    console.log('✅ AWS Connection Successful!');
    console.log('📋 Available tables:', response.TableNames);
    
    if (response.TableNames.includes('properties')) {
      console.log('✅ "properties" table found!');
    } else {
      console.log('❌ "properties" table NOT found');
      console.log('💡 You may need to create the "properties" table in DynamoDB');
    }
    
  } catch (error) {
    console.error('❌ AWS Connection Failed:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.name === 'InvalidSignatureException') {
      console.error('\n💡 This usually means:');
      console.error('   - AWS Access Key or Secret Key is incorrect');
      console.error('   - Check your AWS credentials in .env file');
    }
    
    if (error.name === 'UnrecognizedClientException') {
      console.error('\n💡 This usually means:');
      console.error('   - AWS credentials are completely invalid');
      console.error('   - Region might be wrong');
    }
    
    if (error.name === 'AccessDeniedException') {
      console.error('\n💡 This usually means:');
      console.error('   - Credentials are valid but lack DynamoDB permissions');
      console.error('   - Check IAM policies for your AWS user');
    }
  }
}

testAWSConnection();