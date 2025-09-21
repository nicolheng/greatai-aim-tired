import { DynamoDBClient, ScanCommand, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "ap-southeast-1" });
const TABLE_NAME = "properties";

let embeddingIndex = []; // {id, embedding}

export async function initEmbeddingIndex() {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await client.send(command);

    embeddingIndex = response.Items.map(item => {
        const unmarshalled = unmarshall(item);
        return {
            id: unmarshalled.id,
            embedding: unmarshalled.embedding // array of numbers
        };
    });

    console.log(`Loaded ${embeddingIndex.length} embeddings into memory.`);
}

function cosineSimilarity(vecA, vecB) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function knnSearch(queryEmbedding, topK = 5) {
    const scored = embeddingIndex.map(item => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding)
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
}

// Fetch full items from DynamoDB given their IDs
async function fetchFullItems(ids) {
    const params = {
        RequestItems: {
            [TABLE_NAME]: {
                Keys: ids.map(id => ({ id: { S: id } }))
            }
        }
    };

    const response = await client.send(new BatchGetItemCommand(params));
    return response.Responses[TABLE_NAME].map(unmarshall);
}

export async function retrieveTopK(queryEmbedding, topK = 5) {
    const topMatches = knnSearch(queryEmbedding, topK);
    const ids = topMatches.map(item => item.id);
    const fullItems = await fetchFullItems(ids);

    return fullItems; // full data for frontend/LLM
}
