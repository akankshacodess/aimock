// final code

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";
import { Button } from "../../../../../../components/ui/button";
import { Badge } from "../../../../../../components/ui/badge";
import { Volume2, VolumeX, Lightbulb, CheckCircle, Clock } from "lucide-react";

export default function QuestionsSec({
  mockInterviewQuestion = [],
  activeQuestionIndex,
  completedQuestions,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      try {
        if (text) {
          window.speechSynthesis.cancel();
          const speech = new SpeechSynthesisUtterance(text);
          speech.onstart = () => setIsSpeaking(true);
          speech.onend = () => setIsSpeaking(false);
          window.speechSynthesis.speak(speech);
        }
      } catch (error) {
        console.error("Text-to-speech failed:", error);
      }
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Question Display */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-900/95">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-300">
              Question {activeQuestionIndex + 1}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {completedQuestions.has(activeQuestionIndex) && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1 inline" />
                  Completed
                </Badge>
              )}
              <Badge
                variant="outline"
                className=" p-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100"
              >
                <Clock className="w-3 h-3 mr-1 inline" />
                Active
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border dark:bg-gray-800/80">
                <p className="text-lg leading-relaxed text-gray-800 font-medium dark:text-gray-800">
                  {currentQuestion?.question}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      isSpeaking
                        ? stopSpeech()
                        : textToSpeech(currentQuestion?.question)
                    }
                    className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 text-black dark:text-white hover:text-blue-600  border-blue-200 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-800"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        Listen
                      </>
                    )}
                  </Button>

                  {isSpeaking && (
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-blue-500 rounded-full animate-pulse animation-delay-100"></div>
                      <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                      <span className="text-sm text-blue-600 ml-2">
                        Speaking...
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 ">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-700  mb-2">Pro Tip</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
                  "Take your time to think through your answer. Click &apos;Record Answer&apos; when you&apos;re ready to respond. You can review your answer before moving to the next question."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
