"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
// import { ChatSession } from "@google/generative-ai";
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
}) {
  const [userAnswer, setUserAnswer] = useState(0);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
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
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    // user state not updating sync
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnsInDb();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnsInDb = async () => {
    console.log(userAnswer);

    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for give interview question" +
      " please give us rating for answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("user answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
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
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex">
            <Mic className="mr-1" /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}{" "}
      </Button>

      {/* <Button onClick={()=> console.log(userAnswer)}>Show User Answer</Button> */}

      {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
    </div>
  );
}

export default RecordAnsSec;
