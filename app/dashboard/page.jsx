// final code


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import {
  PlusCircle,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Briefcase,
  ArrowRight,
  Star,
  Brain,
  CheckCircle2,
  PlayCircle,
  LoaderCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import moment from "moment"
import { chatSession } from "../../utils/AiGemini"
import { db } from "../../utils/db"
import { MockInterview } from "../../utils/schema"

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  // Original form submission logic restored
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Generate 10 Interview Questions along with their answers in JSON format.`

    let result = null
    try {
      result = await chatSession.sendMessage(InputPrompt)
    } catch (error) {
      console.error("there is some issues, Please try again later", error)
      toast("Server error. Please try again later.")
      setLoading(false)
      return
    }

    const MockJSONResp = result.response.text().replace("```json", "").replace("```", "")

    if (!MockJSONResp) {
      toast("Failed to generate questions. Try again.")
      setLoading(false)
      return
    }

    try {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJSONResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId })

      if (resp) {
        setOpenDialog(false)
        router.push(`/dashboard/interview/${resp[0]?.mockId}`)
      }
    } catch (error) {
      console.error("DB Insert Error:", error)
      toast("Failed to create interview. Please try again.")
    }

    setLoading(false)
  }

  // Mock data for dashboard
  const recentInterviews = [
    {
      id: "1",
      position: "Frontend Developer",
      company: "Tech Solutions Inc.",
      date: "June 5, 2025",
      rating: 4.2,
      questions: 10,
      status: "completed",
      duration: "25 mins",
    },
    {
      id: "2",
      position: "UX Designer",
      company: "Creative Studio",
      date: "June 3, 2025",
      rating: 3.8,
      questions: 8,
      status: "completed",
      duration: "20 mins",
    },
    {
      id: "3",
      position: "Full Stack Developer",
      company: "StartupXYZ",
      date: "June 1, 2025",
      rating: 4.5,
      questions: 12,
      status: "completed",
      duration: "30 mins",
    },
  ]

  const stats = [
    {
      title: "Total Interviews",
      value: "12",
      change: "+3 this week",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Practice Time",
      value: "4.2h",
      change: "+45m today",
      icon: <Clock className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Average Score",
      value: "4.2/5",
      change: "+0.3 improvement",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+12% this month",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ]

  const quickActions = [
    {
      title: "Start Quick Interview",
      description: "5-minute practice session",
      icon: <PlayCircle className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
      action: () => setOpenDialog(true),
    },
    {
      title: "Review Feedback",
      description: "Check your latest results",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      action: () => {},
    },
    {
      title: "Practice Skills",
      description: "Focus on weak areas",
      icon: <Target className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      action: () => {},
    },
  ]

  const achievements = [
    { title: "First Interview", icon: <Award className="w-5 h-5" />, unlocked: true },
    { title: "5 Interviews", icon: <Star className="w-5 h-5" />, unlocked: true },
    { title: "Perfect Score", icon: <Target className="w-5 h-5" />, unlocked: false },
    { title: "10 Hours Practice", icon: <Clock className="w-5 h-5" />, unlocked: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 mt-1">Ready to ace your next interview?</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={() => setOpenDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                New Interview
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <div className={stat.textColor}>{stat.icon}</div>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <motion.div key={action.title} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className="cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group"
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Interviews */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Interviews</h2>
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {interview.position.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{interview.position}</h3>
                            <p className="text-gray-600 text-sm flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              {interview.company}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {interview.date} • {interview.duration}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-semibold text-gray-900">{interview.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">{interview.questions} questions</p>
                          <Link href={`/dashboard/interview/${interview.id}/feedback`}>
                            <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:bg-blue-50">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Create New Interview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className="border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setOpenDialog(true)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <PlusCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Create New Interview</h3>
                    <p className="text-gray-600 text-sm">Start a new AI-powered mock interview session</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">This Week&apos;s Progress</h3>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Interviews Completed</span>
                      <span>3/5</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Practice Time</span>
                      <span>4.2/6h</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${achievement.unlocked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}`}
                    >
                      {achievement.icon}
                    </div>
                    <span className={`text-sm font-medium ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                      {achievement.title}
                    </span>
                    {achievement.unlocked && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Brain className="w-5 h-5 mr-2 text-blue-500" />
                  Today&apos;s Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use the STAR method (Situation, Task, Action, Result) to structure your behavioral interview answers
                  effectively.
                </p>
                <Button variant="ghost" size="sm" className="mt-3 text-blue-600 hover:bg-blue-50 p-0">
                  Learn more →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Dialog with ORIGINAL FUNCTIONALITY RESTORED */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px] border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Interview
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="job_position" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Position
                  </label>
                  <Input
                    id="job_position"
                    placeholder="e.g. Frontend Developer"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="job_description" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    id="job_description"
                    placeholder="e.g. React, TypeScript, Tailwind CSS, Node.js"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="job_experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <Input
                    id="job_experience"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="e.g. 3"
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpenDialog(false)} className="px-6">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                        Creating...
                      </>
                    ) : (
                      "Create Interview"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
