"use client";
import { useParams } from "next/navigation";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  //param changes
  const paramsPromise = useParams();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const params = await paramsPromise; // Wait for params to resolve
      if (!params?.interviewId) return; // Ensure interviewId exists

      try {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, params.interviewId))
          .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, [paramsPromise]); // Runs when params are resolved
  // useEffect(()=>{
  //     GetFeedback();
  // },[])
  // const GetFeedback = async()=>{
  //     const result = await db.select()
  //     .from(UserAnswer)
  //     .where(eq(UserAnswer.mockIdRef, params.interviewId))
  //     .orderBy(UserAnswer.id);

  //     console.log(result);
  //     setFeedbackList(result);

  // }

  const totalRating = feedbackList.reduce(
    (sum, item) => sum + (Number(item.rating) || 0),
    0
  );
  const averageRating =
    feedbackList.length > 0
      ? (totalRating / feedbackList.length).toFixed(1)
      : "N/A";

  return (
    <div className="p-10 min-h-screen">
      <h2 className="text-3xl font-bold text-green-500 ">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2>
        Your overall interview rating: <strong>{averageRating}/5.0</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        find below queston and corrected answer{" "}
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
              {item.question}
              <ChevronsUpDown></ChevronsUpDown>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div>
                <h2>
                  <strong className="text-red-500 p-2 rounded-lg">
                    Rating:{" "}
                  </strong>
                  {item.rating ?? "N/A"}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-500 text-sm  text-red-100">
                  <strong>Your Answer </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-500 text-sm  text-green-100">
                  <strong>Correct Answer </strong>
                  {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-500 text-sm  text-red-100">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <Button onClick={() => router.push("/dashboard")}>Go Home</Button>
    </div>
  );
}
