import { callBedrockAPI } from "./bedrockClient.js";

/**
 * Sends a raw prompt to Bedrock LLM and returns the text
 * @param {string} prompt - Fully formatted prompt
 * @returns {string} - LLM output
 */
export async function generateAnswer(prompt) {
    try {
        const response = await callBedrockAPI(prompt);
        return response.text || "Sorry, I could not generate an answer.";
    } catch (err) {
        console.error("Error generating answer:", err);
        return "Sorry, I could not generate an answer.";
    }
}
