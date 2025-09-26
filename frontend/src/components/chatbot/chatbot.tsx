"use client"

import { FormEvent, useState, useRef, useEffect } from "react"
import { BotMessageSquare, X, Send, Star } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Markdown from "./markdown"
import MessageLoading from "./MessageLoading"

const starterMsgs = [
  "This conversation will be stored for **improvement purposes**.",
  "Welcome to **AI Clicks**! We specialize in creating AI automations that streamline your business operations.",
  `Whether you're looking for a **one-time solution** or **ongoing automation management**, we’ve got you covered! 
  
  Would you like to explore our services and pricing options or get to know how AI can be used to enhance your business?`,
]

// ===================== STOP UNDO =====================

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

function RetrievePrevMsgs(messages: Message[]) {
  const lastFive = messages.slice(-15)
  const importantMessages = messages.filter((msg) => msg.important)
  const result = [...new Set([...lastFive, ...importantMessages])]
  return result
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [msgMetrics, setMsgMetrics] = useState<MessageMetrics[]>([])
  const [chatID, setChatID] = useState<string>("")
  const [stopChat, setStopChat] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesContainer = useRef<HTMLDivElement>(null)
  const userInputRef = useRef<HTMLInputElement>(null)
  const userSendBtnRef = useRef<HTMLButtonElement>(null)
  const CTAtextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // remove "Try it out" after few seconds
    setTimeout(() => {
      if (!CTAtextRef.current) return

      CTAtextRef.current.classList.add("opacity-0")
    }, 10 * 1000)

    starterMsgs.forEach((msg) => {
      let newMsg: Message = {
        role: "bot",
        content: msg,
        important: false,
      }
      setMessages((prev) => [...prev, newMsg])
    })

    // get the chatID for the current session, used to store chat conversations. Non-critical
    fetch(process.env.NEXT_PUBLIC_GET_CHAT_ID!, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.chatID) {
          setChatID(data.chatID)
        }
      })
  }, [])

  // Scroll to the bottom when a new message appears
  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [isLoading, messages])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      // Preparing payload for generating response

      const data = new FormData(e.target as HTMLFormElement)
      const userInput = data.get("userInput")! as string

      if (userInput.trim() === "") {
        return
      } else {
        if (userInputRef.current) {
          userInputRef.current.value = ""
        }
      }

      const newMessage: Message = {
        role: "user",
        content: userInput,
        important: false,
      }

      setMessages((prevMessages) => [...prevMessages, newMessage])

      userInputRef.current!.disabled = true
      userSendBtnRef.current!.disabled = true

      const historyMessages = RetrievePrevMsgs(messages)

      const response = await fetch(process.env.NEXT_PUBLIC_AI_RESPONSE!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput,
          extraContext: historyMessages,
          chatID,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setIsLoading(false)
        return setStopChat(() => errorData.error)
      }

      setIsLoading(false)
      const reader = response.body!.getReader()
      const decoder = new TextDecoder()

      let metaData: {
        importantUserMsg: string
        promptTokens: number
        completionTokens: number
        totalTime: number
      }

      const readChunk = async () => {
        const { done, value } = await reader.read()
        if (done) return

        const chunk = decoder.decode(value)

        if (chunk.includes("\n===END===\n")) {
          const [END, metaDataPart] = chunk.split("\n===END===\n")
          metaData = JSON.parse(metaDataPart)

          // ✅ Ensure the last chunk is appended before stopping
          if (END.trim()) {
            setMessages((prevMessages) => {
              const messagesCopy = [...prevMessages]
              const lastBotMsg = messagesCopy.pop()

              if (lastBotMsg?.role === "bot") {
                const appendedMsg: Message = {
                  role: "bot",
                  content: lastBotMsg.content + END.trim(),
                  important: false,
                }
                messagesCopy.push(appendedMsg)
              } else {
                messagesCopy.push(lastBotMsg!)
              }

              return [...messagesCopy]
            })
          }

          return
        }

        // ✅ Append streamed chunk properly
        setMessages((prevMessages) => {
          const messagesCopy = [...prevMessages]
          const lastBotMsg = messagesCopy.pop()

          if (lastBotMsg?.role === "bot") {
            const appendedMsg: Message = {
              role: "bot",
              content: lastBotMsg.content + chunk,
              important: false,
            }
            messagesCopy.push(appendedMsg)
          } else {
            messagesCopy.push(lastBotMsg!)
            messagesCopy.push({
              role: "bot",
              content: chunk,
              important: false,
            })
          }

          return [...messagesCopy]
        })

        await readChunk()
      }

      readChunk().then(() => {
        // Check if message is important
        let isImportant = false
        if (metaData.importantUserMsg) isImportant = true

        const promptTokens = metaData.promptTokens
        const completionTokens = metaData.completionTokens
        const totalTime = metaData.totalTime

        setMsgMetrics((prevMetrics) => [
          ...prevMetrics,
          { promptTokens, completionTokens, totalTime },
        ])

        setMessages((prevMessages) => {
          const messagesCopy = [...prevMessages]
          const lastBotMsg = messagesCopy.pop()
          const lastUserMsg = messagesCopy.pop()
          // Apply "important" tag to user message
          if (lastUserMsg?.role === "user") {
            messagesCopy.push({ ...lastUserMsg, important: isImportant })
          }
          messagesCopy.push(lastBotMsg!)

          return [...messagesCopy]
        })

        userInputRef.current!.disabled = false
        userSendBtnRef.current!.disabled = false
      })

      return
    } catch (error) {
      setIsLoading(() => false)
      setStopChat(() => "Server Error! Please try again later.")
    }
  }

  const toggleChat = async () => {
    setIsOpen((prev) => {
      if (prev && messages.filter((msg) => msg.role === "user").length) {
        fetch(process.env.NEXT_PUBLIC_STORE_CHAT!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages,
            chatID,
            msgMetrics,
          }),
        })
      }

      return !prev
    })

    // Store chats
  }

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <div className="relative pt-10 pl-20">
          <Button
            onClick={toggleChat}
            className="rounded-full p-0 w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <BotMessageSquare style={{ width: "23px", height: "23px" }} />
          </Button>

          <div
            ref={CTAtextRef}
            className="absolute top-0 left-0 font-medium flex flex-col items-end transition-opacity duration-500 ease-in-out"
          >
            <span>Try it out</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.64645 3.64644C3.45118 3.8417 3.45118 4.15828 3.64645 4.35354L10.2929 11L6 11C5.72386 11 5.5 11.2239 5.5 11.5C5.5 11.7761 5.72386 12 6 12L11.5 12C11.6326 12 11.7598 11.9473 11.8536 11.8536C11.9473 11.7598 12 11.6326 12 11.5L12 5.99999C12 5.72385 11.7761 5.49999 11.5 5.49999C11.2239 5.49999 11 5.72385 11 5.99999V10.2929L4.35355 3.64643C4.15829 3.45117 3.84171 3.45117 3.64645 3.64644Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {isOpen && (
        <Card className="w-[350px] h-[500px] flex flex-col shadow-lg text-sm ">
          <CardHeader className="flex flex-row items-center justify-between px-6 py-2">
            <CardTitle className="flex flex-row justify-center items-center space-x-1">
              <BotMessageSquare style={{ width: "20px", height: "20px" }} />
              <span>Chat</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent
            ref={messagesContainer}
            className="flex-grow overflow-auto space-y-2 p-3"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`relative p-2 rounded-lg max-w-[80%] space-y-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted text-muted-foreground mr-auto"
                }`}
              >
                <Markdown>{message.content}</Markdown>

                <TooltipProvider delayDuration={100}>
                  {message.important && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="absolute bottom-1 right-1 text-yellow-400">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <Star className="w-4 h-4" />
                          </motion.div>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white text-black"
                      >
                        Bot will remember this
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            ))}

            {isLoading && <MessageLoading />}
          </CardContent>
          <CardFooter>
            {!stopChat && (
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  ref={userInputRef}
                  placeholder="Type a message..."
                  className="flex-grow"
                  name="userInput"
                />
                <Button type="submit" size="icon" ref={userSendBtnRef}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}

            {stopChat && (
              <div className="w-full text-center border-t-2 p-2">
                <span>{stopChat}</span>
              </div>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
