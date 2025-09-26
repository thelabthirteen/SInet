import mainRouter from "./config/serverSettings"

import GetAIResponse from "./controller/GenerateResponse"
import { GenerateChatID, StoreChat } from "./controller/StoreChat"

mainRouter.post("/api/response", GetAIResponse)
mainRouter.post("/api/store-chat", StoreChat)

mainRouter.get("/api/chat-id", GenerateChatID)

export default mainRouter