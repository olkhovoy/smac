
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function getExplanation(topic: string, content: object): Promise<string> {
    if (!API_KEY) {
        return Promise.reject("API_KEY is not configured.");
    }
    
    const prompt = `
        You are a helpful AI assistant for a machine learning engineer. 
        Explain the following section of their experiment plan in a clear, concise, and easy-to-understand way.
        Focus on the key takeaways. Use markdown for formatting.

        Section Title: "${topic}"

        Section Content:
        \`\`\`json
        ${JSON.stringify(content, null, 2)}
        \`\`\`

        Your Explanation:
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
}
