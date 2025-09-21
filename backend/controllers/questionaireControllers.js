import { getEmbedding } from "../services/embeddingService.js";
import { retrieveTopK } from "../services/retrievalService.js";
import { generateAnswer } from "../services/LLMService.js";
import { buildPrompt } from "../services/promptService.js";

export const submitQuestionnaire = async (req, res) => {
    try {
        const userAnswers = req.body;

        // 1️⃣ Generate embedding from user answers
        const answerText = Object.entries(userAnswers)
            .map(([key, value]) => `- ${key}: ${value}`)
            .join("\n");
        const queryEmbedding = await getEmbedding(answerText);

        // 2️⃣ Retrieve top 5 properties
        const topDocs = await retrieveTopK(queryEmbedding, 5);

        // 3️⃣ Build prompt for LLM
        const prompt = buildPrompt(userAnswers, topDocs);

        // 4️⃣ Generate answer
        const answer = await generateAnswer(prompt);

        // 5️⃣ Return JSON
        res.json({ success: true, answer });
    } catch (err) {
        console.error("Error processing questionnaire:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
