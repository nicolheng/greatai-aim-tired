import { getProperties } from "../services/propertyService.js";
//import { callBedrock } from "../services/LLMService.js";

export const submitQuestionaire = async (req, res) => {

    try {
        const answer = req.body;

        const responses = await callBedrock(answer);

        res.json({
            success: true,
            result: responses,
        });
    } catch(err){
        console.error("Error calling Bedrock: ", err);
        res.status(500).json({success: false, error: "Server error"});
    }
}