import { getProperties } from './services/propertyService.js';

async function testPropertyService() {
  try {
    console.log('🔍 Testing Property Service...\n');

    // Test 1: Get properties with sample IDs
    const sampleIds = ['sale-4377301'];
    console.log('📋 Testing with sample property IDs:', sampleIds);
    
    const properties = await getProperties(sampleIds);
    
    console.log('✅ Success! Retrieved properties:');
    console.log(JSON.stringify(properties, null, 2));
    console.log(`\n📊 Total properties found: ${properties.length}`);

    // Show structure of first property if exists
    if (properties.length > 0) {
      console.log('\n🏠 First property structure:');
      console.log('Keys:', Object.keys(properties[0]));
    }

  } catch (error) {
    console.error('❌ Error testing property service:');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.name === 'UnrecognizedClientException') {
      console.error('\n💡 This error usually means:');
      console.error('   - AWS credentials are missing or invalid');
      console.error('   - Check your .env file for AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY');
    }
    
    if (error.name === 'ResourceNotFoundException') {
      console.error('\n💡 This error usually means:');
      console.error('   - The DynamoDB table "properties" does not exist');
      console.error('   - Check your table name and AWS region');
    }
  }
}

// Run the test
testPropertyService();