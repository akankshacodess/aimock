'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from "lucide-react";
// import { ChatSession } from "@google/generative-ai";
import { chatSession } from "@/utils/AiGemini";
import { useUser } from "@clerk/nextjs";

function RecordAnsSec({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
    const [userAnswer,setUserAnswer] = useState()
    const {user} = useUser();
    const [loading,setLoading] = useState();

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
      },[results])

      const SaveUserAns = async () =>{
        if(isRecording){
          stopSpeechToText()
          if(userAnswer?.length<10){
            toast('Error while saving your answer, Please try again')
            return ;
          }

          const feedbackPrompt = "Question:"+ mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"+userAnswer+", Depends on question and user answer for give interview question"+" please give us rating for answer and feedback as area of improvement if any"+" in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"

          const result = await chatSession.sendMessage(feedbackPrompt);

          const mockJsonResp = (result.response.text()).replace('```json','').replace('```','')
          console.log(mockJsonResp);
          const JsonFeedbackResp = JSON.parse(mockJsonResp);

          const resp = await db.insert(userAnswer)
          .values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns:mockInterviewQuestion[activeQQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
          })

          if(response){
            toast('user answer recorded successfully')
          }

        }
        else{
          startSpeechToText();
        }
      }

      if(error) return (console.log(error))
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

      <Button variant="outline" className="my-10" onClick={SaveUserAns}> 
        {isRecording?
        <h2 className="text-red-600 flex">
            <Mic className="mr-1"/> Stop Recording
        </h2> : 'Record Answer'} </Button>

        <Button onClick={()=> console.log(userAnswer)}>Show User Answer</Button>

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
