// embeddingService.js
import { callBedrockAPI } from "./bedrockClient.js";

const EMBEDDING_MODEL_ID = "amazon.titan-embed-text-v2:0"; // built-in here

export async function getEmbedding(text) {
  const body = {
    inputText: text,
  };

  const response = await callBedrockAPI({
    modelId: EMBEDDING_MODEL_ID,
    body,
  });

  return response.embedding;
}
