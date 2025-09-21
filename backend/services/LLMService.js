import { callBedrockAPI } from "./bedrockClient.js";

/**
 * Sends a raw prompt to Bedrock LLM and returns the text
 * @param {string} prompt - Fully formatted prompt
 * @returns {string} - LLM output
 */
export async function generateAnswer(prompt) {
    try {
        const response = await callBedrockAPI({
            modelId: "mistral.mistral-large-2407-v1:0", // ✅ Mistral Large (latest as of 2024)
            body: {
                inputText: prompt,
                // You can also tweak decoding params:
                textGenerationConfig: {
                    maxTokenCount: 512,
                    temperature: 0.7,
                    topP: 0.9
                }
            }
        });

        // Response format: { results: [ { outputText: "..." } ] }
        const output = response?.results?.[0]?.outputText;
        return output || "Sorry, I could not generate an answer.";
    } catch (err) {
        console.error("Error generating answer:", err);
        return "Sorry, I could not generate an answer.";
    }
}