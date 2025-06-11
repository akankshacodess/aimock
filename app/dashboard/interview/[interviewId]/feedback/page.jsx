"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent } from "../../../../../components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../components/ui/collapsible"
import { Progress } from "../../../../../components/ui/progress"
import { Badge } from "../../../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import {
  ChevronsUpDown,
  Star,
  Download,
  Share2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Brain,
  Award,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react"
import { db } from "../../../../../utils/db"
import { UserAnswer } from "../../../../../utils/schema"
import { eq } from "drizzle-orm"

export default function Feedback() {
  const params = useParams()
  const { interviewId } = params || {}
  const [feedbackList, setFeedbackList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview");
  const tabContext = { active: activeTab, setActive: setActiveTab };

  useEffect(() => {
    const fetchData = async () => {
      if (!interviewId) {
        setError("No interview ID provided")
        setLoading(false)
        return
      }

      try {
        // console.log("Fetching feedback for interview:", interviewId)
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId))
          .orderBy(UserAnswer.id)

        // console.log("Fetched feedback data:", result)
        // if (result && result.length > 0) {
        //   result.forEach((item, idx) => {
        //     console.log(`Feedback[${idx}]:`, {
        //       userAns: item.userAns,
        //       correctAns: item.correctAns,
        //       feedback: item.feedback,
        //       full: item
        //     });
        //   });
        // }
        setFeedbackList(result)

        if (result.length === 0) {
          setError("No feedback found for this interview. Please complete the interview first.")
        }
      } catch (error) {
        console.error("Error fetching feedback:", error)
        setError("Failed to load feedback. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [interviewId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your feedback...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Feedback</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalRating = feedbackList.reduce((sum, item) => sum + (Number(item.rating) || 0), 0)
  const averageRating = feedbackList.length > 0 ? (totalRating / feedbackList.length).toFixed(1) : "0"

  const getPerformanceData = () => {
    const excellent = feedbackList.filter((item) => Number(item.rating) >= 4).length
    const good = feedbackList.filter((item) => Number(item.rating) >= 3 && Number(item.rating) < 4).length
    const needsWork = feedbackList.filter((item) => Number(item.rating) < 3).length

    return { excellent, good, needsWork }
  }

  const { excellent, good, needsWork } = getPerformanceData()

  const getRemarkData = () => {
    if (averageRating === "0" || Number(averageRating) <= 2.0) {
      return {
        title: "Keep Practicing",
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: <RefreshCw className="w-6 h-6" />,
        message:
          "Don&apos;t worry! Every expert was once a beginner. Focus on providing more detailed answers with specific examples.",
      }
    } else if (Number(averageRating) <= 4.0) {
      return {
        title: "Good Progress",
        color: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: <TrendingUp className="w-6 h-6" />,
        message:
          "You&apos;re on the right track! Work on adding more specific examples and technical details to your answers.",
      }
    } else {
      return {
        title: "Excellent Work!",
        color: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <Award className="w-6 h-6" />,
        message: "Outstanding performance! Your answers were well-structured and detailed. You&apos;re interview-ready!",
      }
    }
  }

  const remarkData = getRemarkData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Interview Feedback</h1>
                <p className="text-gray-600">Detailed analysis of your performance</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className={`border-0 shadow-xl ${remarkData.bgColor} ${remarkData.borderColor} border-2`}>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1 text-center">
                  <div
                    className={`w-20 h-20 ${remarkData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${remarkData.borderColor} border-2`}
                  >
                    <div className={remarkData.color}>{remarkData.icon}</div>
                  </div>
                  <h2 className={`text-2xl font-bold ${remarkData.color} mb-2`}>{remarkData.title}</h2>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(Number(averageRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{averageRating}/5.0</div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{remarkData.message}</p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{excellent}</div>
                      <div className="text-sm text-gray-600">Excellent (4-5)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${feedbackList.length > 0 ? (excellent / feedbackList.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{good}</div>
                      <div className="text-sm text-gray-600">Good (3-4)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${feedbackList.length > 0 ? (good / feedbackList.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">{needsWork}</div>
                      <div className="text-sm text-gray-600">Needs Work (1-3)</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${feedbackList.length > 0 ? (needsWork / feedbackList.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Question-by-Question Analysis</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {feedbackList.length} Questions Completed
            </Badge>
          </div>

          <div className="space-y-6">
            {feedbackList.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Collapsible className="border-0 shadow-lg rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm">
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-6 hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          Number(item.rating) >= 4
                            ? "bg-green-500"
                            : Number(item.rating) >= 3
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }`}
                      >
                        {item.rating}/5
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Question {index + 1}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.question}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          Number(item.rating) >= 4
                            ? "bg-green-100 text-green-700 border-green-200"
                            : Number(item.rating) >= 3
                              ? "bg-orange-100 text-orange-700 border-orange-200"
                              : "bg-red-100 text-red-700 border-red-200"
                        }
                      >
                        {Number(item.rating) >= 4 ? "Excellent" : Number(item.rating) >= 3 ? "Good" : "Needs Work"}
                      </Badge>
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-gray-100">
                      <Tabs defaultValue="overview" className="w-full" key={`tabs-${index}`}>
                        <TabsList>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="your-answer">Your Answer</TabsTrigger>
                          <TabsTrigger value="ideal-answer">Ideal Answer</TabsTrigger>
                          <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                          <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-5 mb-2">
                            <div className="mb-2 flex items-center gap-2">
                              <Target className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-blue-900">Question:</span>
                              <span className="text-gray-800">{item.question}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <span className="font-semibold text-blue-900">Score:</span>
                              <span className="text-gray-800">{item.rating}/5</span>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="your-answer">
                          <div className="bg-white border border-blue-100 rounded-lg p-5 mb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageSquare className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-blue-900">Your Answer:</span>
                            </div>
                            <p className="text-gray-800">{item.userAns || "No answer recorded"}</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="ideal-answer">
                          <div className="bg-green-50 border border-green-100 rounded-lg p-5 mb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-5 h-5 text-green-600" />
                              <span className="font-semibold text-green-900">Ideal Answer:</span>
                            </div>
                            <p className="text-gray-800">{item.correctAns || "No ideal answer available"}</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="feedback">
                          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5 mb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <ThumbsUp className="w-5 h-5 text-yellow-600" />
                              <span className="font-semibold text-yellow-900">AI Feedback:</span>
                            </div>
                            <p className="text-gray-800">
                              {item.feedback
                                ? (() => {
                                    try {
                                      const parsed = JSON.parse(item.feedback);
                                      return parsed.overall || item.feedback;
                                    } catch {
                                      return item.feedback;
                                    }
                                  })()
                                : "No feedback available"}
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">Back to Dashboard</Button>
          </Link>
          <Button variant="outline" className="px-8 py-3 rounded-xl">
            Practice Again
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
