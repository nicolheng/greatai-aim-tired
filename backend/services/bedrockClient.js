// bedrockClient.js
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// 1️⃣ Create a single Bedrock client instance
export const bedrockClient = new BedrockRuntimeClient({
  region: "us-east-1", // change if needed
});

// 2️⃣ Helper to call any Bedrock model
export async function callBedrockAPI({ modelId, body }) {
  const command = new InvokeModelCommand({
    modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(body),
  });

  const response = await bedrockClient.send(command);

  // Decode the response body
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  return responseBody;
}
