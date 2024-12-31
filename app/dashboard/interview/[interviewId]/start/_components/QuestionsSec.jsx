import React from "react";

function QuestionsSec({ mockInterviewQuestion = [], activeQuestionIndex }) {
  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.length > 0 ? (
          mockInterviewQuestion.map((question, index) => (
            <h2
              key={question.id || index} // Use a unique key, prefer `id` if available
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? "bg-blue-700 text-white" : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))
        ) : (
          <p>No questions available.</p> // Fallback for empty data
        )}
      </div>
    </div>
  );
}

export default QuestionsSec;
