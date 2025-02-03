"use client";

import { mockInterview } from "@/drizzle/schema";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";

function questionsSec({ mockInterviewQuestion, activeQuestionIndex }) {
  const [activeQuesIndex, setActiveQuesIndex] = useState(0);
  // speaks the question

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10 position-fixed">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <button
                key={index}
                onClick={() => setActiveQuesIndex(activeQuestionIndex)}
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index && "active-ques"
                }`}
              >
                Question #{index + 1}
              </button>
            ))}
        </div>
        <h2 className="my-5 text-sm md:text-md ">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-10">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default questionsSec;
