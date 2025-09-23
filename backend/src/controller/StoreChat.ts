import { Request, Response } from "express"
import { StoreOrUpdateConvo } from "../utils/supabase";
import { v4 as uuidv4 } from "uuid";

interface Message {
    role: "user" | "bot"
    content: string
    important: boolean
  }

interface MessageMetrics {
    promptTokens: number
    completionTokens: number
    totalTime: number
}
  

export async function GenerateChatID(req: Request, res: Response){
    let chatID = uuidv4()
    return res.json({chatID})
}

export async function StoreChat(req: Request, res: Response){
    const messages: Message[] = req.body.messages;
    const chatID: string = req.body.chatID
    const msgMetrics: MessageMetrics[] = req.body.msgMetrics

    if (!messages || !chatID) return res.send()

    const userMessages = messages.filter(message => message.role === "user");
    const botMessages = messages.filter(message => message.role === "bot");

    StoreOrUpdateConvo(chatID, userMessages, botMessages, msgMetrics)    
}
