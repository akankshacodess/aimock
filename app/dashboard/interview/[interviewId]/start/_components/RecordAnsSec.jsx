// final code

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import Webcam from "react-webcam"
import useSpeechToText from "react-hook-speech-to-text"
import { Mic, Square, RotateCcw, Camera, CameraOff, Volume2, Loader2 } from "lucide-react"
import { chatSession } from "../../../../../../utils/AiGemini"
import { useUser } from "@clerk/nextjs"
import { UserAnswer } from "../../../../../../utils/schema"
import { db } from "../../../../../../utils/db"
import moment from "moment"
import { toast } from "sonner"

export default function RecordAnsSec({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  setRecordingState,
  onQuestionComplete,
}) {
  const [userAnswer, setUserAnswer] = useState("")
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [webcamEnabled, setWebcamEnabled] = useState(true)
  const [recordingTime, setRecordingTime] = useState(0)


  const { isRecording, results, startSpeechToText, stopSpeechToText, setResults } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      console.log("Speech results updated:", results);

      // Combine all transcripts into one string
      const finalAnswer = results
        .map((r) => r.transcript)
        .join(" ")
        .trim();

      if (finalAnswer) {
        setUserAnswer(finalAnswer)
      }
    }
  }, [results]);

  const StartStopRecording = async () => {
    try {
      if (isRecording) {
        stopSpeechToText();
        setRecordingState(true);
        setIsProcessing(true); // Show loading state while processing

        // Now we wait for `useEffect` to update `userAnswer`
      } else {
        setUserAnswer("")
        setResults([])
        startSpeechToText()
        setRecordingState(true)
      }
    } catch (error) {
      console.error("Error in recording:", error);
      toast("Error: Mic access issue or network problem.");
    }
  };

  // Run this function when `userAnswer` is updated
  useEffect(() => {
    if (isProcessing && userAnswer) {
      console.log("Final user answer:", userAnswer);
      updateUserAnsInDb(userAnswer);
      setIsProcessing(false); // Reset processing state
    }
  }, [userAnswer]);

  const updateUserAnsInDb = async (finalAnswer) => {
    setLoading(true);

    if (!finalAnswer) {
      toast.warning("No answer detected. Please try again.")
      setLoading(false)
      return
    }

    console.log("Final captured answer:", finalAnswer);

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${finalAnswer}, Provide rating and feedback in JSON format.`;

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
        correctAns:
          mockInterviewQuestion[activeQuestionIndex]?.answer ||
          mockInterviewQuestion[activeQuestionIndex]?.correctAnswer ||
          mockInterviewQuestion[activeQuestionIndex]?.idealAnswer ||
          "",
        userAns: finalAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      toast("User answer recorded successfully");
      setUserAnswer(""); // Clear answer
      setResults([]); // Clear results
      setRecordingState(false); // Re-enable navigation
    } catch (error) {
      toast("Failed to record answer. Please try again.");
      console.error("Error saving answer:", error);
      setRecordingState(false); // Re-enable question navigation
    }

    setLoading(false);
  };

  if (error) return console.log(error);
  return (
    <div className="space-y-6">
      {/* Webcam Card */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Camera Preview</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWebcamEnabled(!webcamEnabled)}
              className="flex items-center gap-2"
            >
              {webcamEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              {webcamEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden mx-6 mb-6">
            {webcamEnabled ? (
              <div className="relative">
                <Webcam
                  mirrored={true}
                  className="w-full h-64 object-cover rounded-lg"
                  onUserMediaError={() => {
                    setWebcamEnabled(false)
                    toast.error("Camera access denied")
                  }}
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">Live</span>
                </div>
                {isRecording && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    REC {formatTime(recordingTime)}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <CameraOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Camera disabled</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recording Controls */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Record Your Answer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Status */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              {isRecording ? (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-red-300 rounded-full animate-ping mx-auto"></div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-red-600">Recording...</p>
                    <p className="text-sm text-gray-600">{formatTime(recordingTime)}</p>
                  </div>
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-blue-600">Processing...</p>
                    <p className="text-sm text-gray-600">Analyzing your response</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto border-2 border-gray-200">
                    <Mic className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">Ready to Record</p>
                    <p className="text-sm text-gray-600">Click the button below to start</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current Answer Preview */}
          {userAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div className="flex items-start space-x-2">
                <Volume2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">Your Response:</p>
                  <p className="text-sm text-blue-700">{userAnswer}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={StartStopRecording}
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isRecording ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </>
              )}
            </Button>

            {userAnswer && !isRecording && !loading && (
              <Button
                variant="outline"
                onClick={() => {
                  setUserAnswer("")
                  setResults([])
                }}
                className="px-6 py-3 rounded-xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Speak clearly and naturally. Your response will be automatically transcribed and analyzed by AI."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
