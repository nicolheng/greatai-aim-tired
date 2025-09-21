import dotenv from "dotenv";

dotenv.config();

console.log('🔍 Environment Variable Test:');
console.log('============================');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY:', process.env.AWS_ACCESS_KEY ? `${process.env.AWS_ACCESS_KEY.substring(0, 8)}...` : 'Missing');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? `${process.env.AWS_SECRET_ACCESS_KEY.substring(0, 8)}...` : 'Missing');
console.log('PROPERTIES_TABLE:', process.env.PROPERTIES_TABLE);

console.log('\n📁 Current working directory:', process.cwd());
console.log('📄 Looking for .env file at:', process.cwd() + '/.env');

// Check if .env file exists
import { existsSync } from 'fs';
const envPath = './.env';
console.log('📋 .env file exists:', existsSync(envPath) ? '✅ Yes' : '❌ No');

if (existsSync(envPath)) {
  import('fs').then(fs => {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('\n📄 .env file content preview:');
    console.log(envContent.split('\n').slice(0, 5).join('\n')); // Show first 5 lines
  });
}