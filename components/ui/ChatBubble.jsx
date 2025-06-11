"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"

export default function ChatBubble() {
  const messages = [
    {
      type: "ai",
      text: "Tell me about your experience with React development.",
      delay: 0,
    },
    {
      type: "user",
      text: "I have 3 years of experience building web applications with React...",
      delay: 1,
    },
    {
      type: "ai",
      text: "Great! Can you explain the difference between props and state?",
      delay: 2,
    },
  ]

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <Bot className="w-6 h-6 text-blue-600" />
        <span className="font-semibold text-gray-800 dark:text-gray-200">AI Interview Assistant</span>
        <div className="ml-auto flex gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 dark:text-green-400">Live</span>
        </div>
      </div>

      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: message.delay }}
          className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === "ai"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
            }`}
          >
            {message.type === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </div>
          <div
            className={`max-w-xs p-3 rounded-2xl ${
              message.type === "ai"
                ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                : "bg-blue-600 dark:bg-blue-700 text-white"
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2"
      >
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
          <div
            className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <span>AI is analyzing your response...</span>
      </motion.div>
    </div>
  )
}
