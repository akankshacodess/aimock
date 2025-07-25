// final code

"use client";

import React from "react";

import { useState, useEffect } from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Progress } from "../../../../../components/ui/progress";
import { Badge } from "../../../../../components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Mic,
  CheckCircle,
  Lightbulb,
  Target,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";

import QuestionsSec from "./_components/QuestionsSec";
import RecordAnsSec from "./_components/RecordAnsSec";

// Local formatTime function
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

//final change
export default function StartInterview({ params }) {
  const unwrappedParams = React.use(params);
  const { interviewId } = unwrappedParams;
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [recordingState, setRecordingState] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    GetInterviewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Date.now() - questionStartTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [questionStartTime, activeQuestionIndex]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setTimeElapsed(0);
  }, [activeQuestionIndex]);
  // Mark a question as complete
  const handleQuestionComplete = (questionIndex) => {
    setCompletedQuestions((prev) => new Set(prev).add(questionIndex));
  };

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
      let parsed;
      try {
        parsed = JSON.parse(result[0].jsonMockResp);
      } catch {
        parsed = result[0].jsonMockResp;
      }
      let questionsArr = [];
      if (Array.isArray(parsed)) {
        questionsArr = parsed;
      } else if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.questions)
      ) {
        questionsArr = parsed.questions;
      } else if (typeof parsed === "string") {
        try {
          const tryParse = JSON.parse(parsed);
          if (Array.isArray(tryParse)) questionsArr = tryParse;
          else if (
            tryParse &&
            typeof tryParse === "object" &&
            Array.isArray(tryParse.questions)
          )
            questionsArr = tryParse.questions;
        } catch {}
      }
      setMockInterviewQuestion(questionsArr);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setError(
        error.message ||
          "An error occurred while fetching interview details. Please try again later."
      );
    }
  };

  // Calculate progress percentage
  const totalQuestions = mockInterviewQuestion.length || 1;
  const completedCount = completedQuestions.size || 0;
  const progressPercentage = (completedCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      {/* Header with Progress */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href={`/dashboard/interview/${interviewId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Mock Interview
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {interviewData?.jobPosition}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-700"
              >
                Question {activeQuestionIndex + 1} of{" "}
                {mockInterviewQuestion.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2 bg-gray-200 dark:bg-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Questions Panel */}
          <div className="lg:col-span-2 space-y-6 ">
            <QuestionsSec
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
              recordingState={recordingState}
              completedQuestions={completedQuestions}
            />

            {/* Navigation Controls */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setActiveQuestionIndex(
                        Math.max(0, activeQuestionIndex - 1)
                      )
                    }
                    disabled={activeQuestionIndex === 0 || recordingState}
                    className="flex items-center gap-2 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    {mockInterviewQuestion.map((_, index) => (
                      <button
                        key={index}
                        disabled
                        className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 cursor-not-allowed opacity-60 ${
                          index === activeQuestionIndex
                            ? "bg-blue-600 text-white shadow-lg"
                            : completedQuestions.has(index)
                            ? "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {completedQuestions.has(index) ? (
                          <CheckCircle className="w-4 h-4 mx-auto" />
                        ) : (
                          index + 1
                        )}
                      </button>
                    ))}
                  </div>

                  {activeQuestionIndex < mockInterviewQuestion.length - 1 ? (
                    <Button
                      onClick={() =>
                        setActiveQuestionIndex(
                          Math.min(
                            mockInterviewQuestion.length - 1,
                            activeQuestionIndex + 1
                          )
                        )
                      }
                      disabled={recordingState}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Link
                      href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
                    >
                      <Button
                        disabled={recordingState}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 dark:text-white"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Finish Interview
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recording Panel */}
          <div className="space-y-6 ">
            <RecordAnsSec
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
              setActiveQuestionIndex={setActiveQuestionIndex}
              setRecordingState={setRecordingState}
              onQuestionComplete={handleQuestionComplete}
            />

            {/* Tips Panel */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white dark:from-blue-900 dark:to-purple-900 dark:text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold">Interview Tips</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <Target className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Use the STAR method: Situation, Task, Action, Result</p>
                  </div>
                  <div className="flex items-start">
                    <Brain className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Take a moment to think before answering</p>
                  </div>
                  <div className="flex items-start">
                    <Mic className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Speak clearly and at a moderate pace</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
