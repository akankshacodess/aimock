// import React from "react";

// function ChatBubble() {
//   return (
//     <div>
//       <div className="chat chat-start">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Obi-Wan Kenobi
//           <time className="text-xs opacity-50"> 12:45</time>
//         </div>
//         <div className="chat-bubble">You were the Chosen One!</div>
//         <div className="chat-footer opacity-50">Delivered</div>
//       </div>
//       <div className="chat chat-end">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Anakin
//           <time className="text-xs opacity-50"> 12:46</time>
//         </div>
//         <div className="chat-bubble">Let's Go!</div>
//         <div className="chat-footer opacity-50">Seen at 12:46</div>
//       </div>
//     </div>
//   );
// }

// export default ChatBubble;

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
          "Tell me about yourself and why you want this role."
        </div>
      </div>

      {/* User Response */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex text-center content-center text-blue-900 font-bold">
            You
          </div>
        </div>
        <div className="chat-header">
          You <time className="text-xs opacity-50"> 12:46</time>
        </div>
        <div className="chat-bubble bg-gray-200 text-black">
          "I'm a passionate developer with a strong grasp of React.js & Next.js,
          aiming to build impactful products."
        </div>
      </div>

      {/* AI Follow-Up Question */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex text-center content-center text-white font-bold">
            AI
          </div>
        </div>
        <div className="chat-header">
          AI Interviewer <time className="text-xs opacity-50"> 12:47</time>
        </div>
        <div className="chat-bubble bg-blue-600 text-white">
          "Great! Can you explain how you handle tight deadlines?"
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
