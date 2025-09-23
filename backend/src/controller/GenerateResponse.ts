import { Request, Response, NextFunction } from "express";
import { GenerateResponse } from "../utils/AI";
import { MessageI } from "../types/allTypes";
import CheckLatency from "../utils/latency";


// Track active requests per user
const activeChats = new Map<string, boolean>();

export default async function GetAIResponse(req: Request, res: Response, next: NextFunction) {
    // console.log(" ================================ NEW RESPONSE  ================================")
    const userInput: string = req.body.userInput;
    const extraContext: MessageI[] = req.body.extraContext;
    const chatID: string = req.body.chatID;

    try {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        const checkIfUserMisuse = false

        // Block misuse or active chats upfront before starting the stream
        if (checkIfUserMisuse || activeChats.has(chatID)) {
            return res.status(403).send({
                error: "Misuse of the assistant is not allowed. Please refresh.",
            });
        }

        activeChats.set(chatID, true);

        const stream = await GenerateResponse(userInput, extraContext);

        if (!stream) {
            return res.status(403).send({
                error: "Misuse of the assistant is not allowed. Please refresh.",
            });
        }

        let promptTokens = 0, completionTokens = 0, totalTime = 0;
        let stopStream = false

        await CheckLatency(async () => {
            for await (const chunk of stream) {
                
                let content;
                if (!chunk.choices[0]?.finish_reason) {
                    content = chunk.choices[0]?.delta?.content || "";


                    if (content.trim() === "STOP") {
                        stopStream = true
                        return res.status(403).send({
                            error: "Misuse of the assistant is not allowed. Please refresh.",
                        })  ;
                         
                       
                    } 

                    if (content){
                        res.write(content);
                    }
                
                } else {
                    promptTokens = chunk.x_groq?.usage?.prompt_tokens || 0;
                    completionTokens = chunk.x_groq?.usage?.completion_tokens || 0;
                    totalTime = chunk.x_groq?.usage?.total_time as number || 0;
                    // CheckLatency(() => new Promise((resolve) => resolve(totalTime * 1000)), `Response: ${(totalTime * 1000).toFixed(2)}`)
                }
            }
        }, "Response")

       
        // if (!stopStream){
        //     console.log("hello")
        //     // const isImportant = await CheckIfUserInputImpo(userInput);
        //     const isImportant = await CheckLatency(() => CheckIfUserInputImpo(userInput), "Check if msg impo");
        //     res.write(`\n===END===\n${JSON.stringify({ 
        //         importantUserMsg: isImportant !== "NO" ? isImportant : "", 
        //         promptTokens, 
        //         completionTokens, 
        //         totalTime 
        //     })}`);
        // }

        

        return res.end();
    } catch (error) {
        console.error("Error processing AI response:", error);
        if (!res.headersSent) {
            return res.status(500).send({ error: "Internal server error. Please try again later." });
        }
    } finally {
        // Clean up active chat regardless of success or failure
        activeChats.delete(chatID);
        // console.log(" ================================ RESPONSE END  ================================")
    }
}