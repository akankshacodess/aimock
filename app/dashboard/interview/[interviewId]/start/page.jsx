"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSec from "./_components/questionsSec";
import RecordAnsSec from "./_components/RecordAnsSec";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  // from param we get interview id
  const unwrappedParams = React.use(params);
  const { interviewId } = unwrappedParams;
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (!result.length || !result[0].jsonMockResp) {
        console.error("No Data Found or jsonMockresp is undefinded.");
        return;
      }
      console.log("Raw jsonMockResp:", result[0].jsonMockResp);

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log("Parsed JSON:", jsonMockResp);

      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    // console.log(result);
    // setInterviewData(result[0]);

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}

        <QuestionsSec
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        {/* Answer Record */}
        <RecordAnsSec
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
