import React from "react";

function ChatBubble() {
  return (
    <div className="space-y-4">
      {/* AI Interviewer Message */}

      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex text-center content-center text-white font-bold">
            AI
          </div>
        </div>
        <div className="chat-header">
          AI Interviewer <time className="text-xs opacity-50"> 12:45</time>
        </div>
        <div className="chat-bubble bg-blue-600 text-white">
          Tell me about yourself and why you want this role.
        </div>
      </div>

      {/* User Response */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex text-center content-center text-blue-900 font-bold border-2 border-gray-200">
            You
          </div>
        </div>
        <div className="chat-header ">
          You <time className="text-xs opacity-50"> 12:46</time>
        </div>
        <div className="chat-bubble bg-gray-200 text-black">
          I'm a passionate developer with a strong grasp of React.js & Next.js,
          aiming to build impactful products.
        </div>
      </div>

      {/* AI Follow-Up Question */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex text-center content-center text-white font-bold border-2 border-gray-200">
            AI
          </div>
        </div>
        <div className="chat-header">
          AI Interviewer <time className="text-xs opacity-50"> 12:47</time>
        </div>
        <div className="chat-bubble bg-blue-600 text-white">
          Great! Can you explain how you handle tight deadlines?
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
