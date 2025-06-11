"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const unwrappedParams = React.use(params);
  const { interviewId } = unwrappedParams || {};
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) {
      setError("Missing interview ID. Please check the URL.");
      return;
    }
    // console.log(interviewId);
    GetInterviewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  // Fetch interview details by mock ID
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      // console.log("Fetched interview data:", result);
      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        setError("No interview found. It may have been removed.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setError("An error occurred while fetching interview details. Please try again later.");
    }
  };

  return (
    <div className="p-10 ">
      <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>

      {error ? (
        <div className="p-5 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error: </strong>{error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col my-5 gap-5 ">
            <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
              {interviewData ? (
                <>
                  <h2 className="text-lg">
                    <strong>Job Role/Job Position:</strong>{" "}
                    {interviewData.jobPosition}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Job Description/Tech Stack: </strong>{" "}
                    {interviewData.jobDesc}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Years of Experience: </strong>{" "}
                    {interviewData.jobExperience}
                  </h2>
                </>
              ) : (
                <h2>Loading interview details...</h2>
              )}
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-500">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-600">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </h2>
            </div>
          </div>
          <div>
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => {
                  try {
                    setWebCamEnabled(true);
                  } catch (error) {
                    console.error("Error enabling webcam:", error);
                    setError("Failed to enable webcam.");
                  }
                }}
                onUserMediaError={(error) => {
                  console.error("Webcam error:", error);
                  setWebCamEnabled(false);
                  setError("Webcam access denied or not supported.");
                }}
                mirrored={true}
                style={{
                  height: 300,
                  width: 300,
                }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + interviewId + "/start"}>
          <Button disabled={!!error}>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
