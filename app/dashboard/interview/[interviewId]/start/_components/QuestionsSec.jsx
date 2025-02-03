import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSec({ mockInterviewQuestion = [], activeQuestionIndex }) {
  // Speaks the question
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      try {
        if (text) {
          const speech = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(speech);
        } else {
          console.error("Text-to-speech: No text provided.");
        }
      } catch (error) {
        console.error("Text-to-speech failed:", error);
      }
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  // Debugging: Log props
  console.log("Questions:", mockInterviewQuestion, "Active Index:", activeQuestionIndex);

  return (
    <div className="p-5 border rounded-lg my-10">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.length > 0 ? (
          mockInterviewQuestion.map((question, index) => (
            <h2
              key={question.id || index} // Use unique key, prefer `id`
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex === index && "bg-black text-violet-50"}
              `}
            >
              Question #{index + 1}
            </h2>
          ))
        ) : (
          <p>No questions available.</p> // Fallback for empty data
        )}
      </div>

      {/* Display Active Question */}
      {mockInterviewQuestion[activeQuestionIndex] ? (
        <>
          <h2 className="my-5 text-md md:text-lg">
            {mockInterviewQuestion[activeQuestionIndex]?.question || "No question available."}
          </h2>
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        </>
      ) : (
        <p className="text-red-500 my-5">Please select a question to view details.</p>
      )}

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100 mt-10">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h2 className="text-sm text-blue-700 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "No additional notes available."}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSec;
