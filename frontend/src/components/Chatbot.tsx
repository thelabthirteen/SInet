import React, { useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  BookOpen,
  Calendar,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ChatbotProps {
  user: any;
}

interface Message {
  id: string | number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: `Hello ${user?.name}! I'm your UTMKL Assistant, trained specifically on UTMKL academic resources. I can help you with course information, academic guidelines, deadlines, and university policies. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);

  const [botMessages, setBotMessages] = useState<string[]>([]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { id: "course-info", label: "Course Information", icon: BookOpen },
    { id: "deadlines", label: "Assignment Deadlines", icon: Calendar },
    { id: "guidelines", label: "Academic Guidelines", icon: HelpCircle },
    { id: "help", label: "General Help", icon: Lightbulb },
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsTyping(true);

    const historyMessages = updatedMessages.map((msg) => ({
      role: msg.type, // map "type" → "role"
      content: msg.content, // keep content
      important: false, // always false
    }));

    const response = await fetch("http://localhost:5000/api/response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInput: inputMessage,
        extraContext: historyMessages,
      }),
    });

    if (!response.ok) {
      // TODO
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    const botID = uuidv4();
    const botMessage: Message = {
      id: botID,
      type: "bot",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) return;

      const chunk = decoder.decode(value);

      // if (chunk.includes("\n===END===\n")) {
      //   const [END, metaDataPart] = chunk.split("\n===END===\n")
      //   metaData = JSON.parse(metaDataPart)

      //   // ✅ Ensure the last chunk is appended before stopping
      //   if (END.trim()) {
      //     setMessages((prevMessages) => {
      //       const messagesCopy = [...prevMessages]
      //       const lastBotMsg = messagesCopy.pop()

      //       if (lastBotMsg?.role === "bot") {
      //         const appendedMsg: Message = {
      //           role: "bot",
      //           content: lastBotMsg.content + END.trim(),
      //           important: false,
      //         }
      //         messagesCopy.push(appendedMsg)
      //       } else {
      //         messagesCopy.push(lastBotMsg!)
      //       }

      //       return [...messagesCopy]
      //     })
      //   }

      //   return
      // }

      // ✅ Update streamed chunk properly by appending content
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botID ? { ...msg, content: msg.content + chunk } : msg
        )
      );

      await readChunk();
    };

    readChunk().then(() => {
      setIsTyping(false);
    });

    // Simulate bot response
    // setTimeout(() => {
    //   const botResponse = generateBotResponse(inputMessage)
    //   const botMessage = {
    //     id: messages.length + 2,
    //     type: "bot",
    //     content: botResponse,
    //     timestamp: new Date(),
    //   }

    //   setMessages((prev) => [...prev, botMessage])
    //   setIsTyping(false)
    // }, 1500)
  };

  const generateBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("deadline") || lowerInput.includes("assignment")) {
      return `Based on your current courses, here are your upcoming deadlines:\n\n📚 **Data Structures Assignment** - Due Feb 15, 2024\n📝 **Calculus Midterm** - Feb 18, 2024\n🧪 **Software Engineering Quiz** - Feb 20, 2024\n\nWould you like me to set reminders for any of these?`;
    }

    if (lowerInput.includes("course") || lowerInput.includes("subject")) {
      return `I can help you with information about UTMKL courses! Here's what I can provide:\n\n• Course descriptions and prerequisites\n• Lecturer contact information\n• Course schedules and locations\n• Assessment methods and weightage\n\nWhich specific course would you like to know about?`;
    }

    if (lowerInput.includes("gpa") || lowerInput.includes("grade")) {
      return `For GPA and grading information:\n\n📊 **UTMKL Grading Scale:**\n• A+: 4.00 (90-100%)\n• A: 4.00 (80-89%)\n• A-: 3.70 (75-79%)\n• B+: 3.30 (70-74%)\n• B: 3.00 (65-69%)\n\nYour current semester GPA calculation and academic standing can be checked through the student portal.`;
    }

    if (
      lowerInput.includes("graduation") ||
      lowerInput.includes("requirement")
    ) {
      return `For ${user?.program} graduation requirements:\n\n✅ **Credit Requirements:**\n• Foundation: 30-40 credits\n• Bachelor's: 120+ credits\n• Master's: 40+ credits\n• PhD: Research + coursework\n\n📋 **Additional Requirements:**\n• Minimum CGPA: 2.00\n• Industrial training (for Bachelor's)\n• Thesis/dissertation\n\nWould you like specific details for your program?`;
    }

    if (lowerInput.includes("library") || lowerInput.includes("book")) {
      return `📚 **UTMKL Library Services:**\n\n• **Operating Hours:** Mon-Thu: 8AM-10PM, Fri: 8AM-12PM, 2PM-10PM\n• **Digital Resources:** IEEE, ACM, Springer, ScienceDirect\n• **Study Spaces:** Group discussion rooms, silent study areas\n• **Services:** Book loans, inter-library loans, research assistance\n\nYou can access the library catalog online through the student portal.`;
    }

    if (lowerInput.includes("international") || lowerInput.includes("visa")) {
      return `🌍 **International Student Support:**\n\n📋 **Visa Requirements:**\n• Student Pass renewal 3 months before expiry\n• Medical examination every year\n• Travel authorization for overseas trips\n\n🏢 **International Office:**\n• Location: Level 2, Canselori Building\n• Contact: +607-555-2345\n• Email: international@utm.my\n\nYour visa expires on: [Check with International Office]`;
    }

    // Default response
    return `I understand you're asking about "${input}". While I'm trained on UTMKL resources, I might need more specific information to provide the best answer.\n\nHere are some areas I can definitely help with:\n• Course information and schedules\n• Academic policies and guidelines\n• Graduation requirements\n• Campus facilities and services\n• International student procedures\n\nCould you please be more specific about what you'd like to know?`;
  };

  const handleQuickAction = (actionId: string) => {
    let message = "";

    switch (actionId) {
      case "course-info":
        message = "Tell me about my current courses";
        break;
      case "deadlines":
        message = "What are my upcoming assignment deadlines?";
        break;
      case "guidelines":
        message = "Show me the academic guidelines for my program";
        break;
      case "help":
        message = "What can you help me with?";
        break;
    }

    setInputMessage(message);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              UTMKL Assistant
            </h1>
            <p className="text-gray-600">
              AI-powered help for all your academic needs
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: BookOpen,
              title: "Course Info",
              desc: "Syllabi, schedules, prerequisites",
            },
            {
              icon: Calendar,
              title: "Deadlines",
              desc: "Assignments, exams, submissions",
            },
            {
              icon: HelpCircle,
              title: "Guidelines",
              desc: "Academic policies & procedures",
            },
            {
              icon: Sparkles,
              title: "Smart Help",
              desc: "Trained on UTMKL resources",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <Icon className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-2xl ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-blue-600" : "bg-gray-100"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="p-4 rounded-2xl bg-gray-50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 mb-3">
              Try these quick actions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="p-3 text-left border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me anything about UTMKL academics..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Powered by UTMKL AI • Trained on official resources</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
