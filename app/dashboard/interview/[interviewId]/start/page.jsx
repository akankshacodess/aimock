"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSec from "./_components/QuestionsSec";

import RecordAnsSec from "./_components/RecordAnsSec";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const unwrappedParams = React.use(params);
  const { interviewId } = unwrappedParams;
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [recordingState, setRecordingState] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // Fetch interview details by mock ID
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (!result || result.length === 0) {
        throw new Error("No interview found. It may have been removed.");
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setError(
        error.message ||
          "An error occurred while fetching interview details. Please try again later."
      );
    }
  };
    

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSec
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          setRecordingState={setRecordingState}
          recordingState={recordingState}
        />

        {/* Answer Record */}
        <RecordAnsSec
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          setActiveQuestionIndex={setActiveQuestionIndex}
          setRecordingState={setRecordingState}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && activeQuestionIndex != null && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            disabled={recordingState}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            disabled={recordingState}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button disabled={recordingState}>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
