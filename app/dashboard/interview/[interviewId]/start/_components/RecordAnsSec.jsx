"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, LoaderCircle } from "lucide-react";

import { chatSession } from "@/utils/AiGemini";
import { useUser } from "@clerk/nextjs";
import { UserAnswer } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";
import { toast } from "sonner";

function RecordAnsSec({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setActiveQuestionIndex,
  setRecordingState,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(
        (prev) => prev + " " + results.map((r) => r.transcript).join(" ")
      );
    }
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setRecordingState(true); // Disable question navigation
      await updateUserAnsInDb();
    } else {
      setUserAnswer("");

      startSpeechToText();
      setRecordingState(true);
    }
  };

  const updateUserAnsInDb = async () => {
    setLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Provide rating and feedback in JSON format.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      toast("User answer recorded successfully");

      setUserAnswer("");
      setResults([]);
      setRecordingState(false); // Re-enable question navigation
    } catch (error) {
      toast("Failed to record answer. Please try again.");
      console.error("Error saving answer:", error);
      setRecordingState(false); // Re-enable question navigation
    }

    setLoading(false);
  };

  if (error) return console.log(error);
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col md:mt-20 sm:mt-5 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.jpg"}
          width={400}
          height={400}
          alt="webcam"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      <Button
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" /> Processing...
          </>
        ) : isRecording ? (
          <h2 className="text-red-600 flex">
            <Mic className="mr-1" /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSec;
