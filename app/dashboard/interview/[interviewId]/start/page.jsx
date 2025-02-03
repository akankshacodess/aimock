"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSec from "./_components/questionsSec";
import RecordAnsSec from "./_components/RecordAnsSec";

function StartInterview({ params }) {
  // from param we get interview id
  const unwrappedParams = React.use(params);
  const { interviewId } = unwrappedParams;
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion,setMockInterviewQuestion] = useState();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    // console.log(result);
    // setInterviewData(result[0]);

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}

        <QuestionsSec
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Answer Record */}
        <RecordAnsSec
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData = {interviewData}
        />
      </div>
      <div></div>
    </div>
  );
}

export default StartInterview;
