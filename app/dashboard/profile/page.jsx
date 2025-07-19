"use client"

import { useUser, useAuth } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Moon,
  Sun,
  User,
  Mail,
  Calendar,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Star,
  Zap,
  Edit3,
  Save,
  X,
  Sparkles,
  Award,
  Activity,
  BarChart3,
} from "lucide-react"

// Use absolute API URL for deployment compatibility
const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function ProfilePage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { theme, setTheme } = useTheme()
  const [stats, setStats] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [bio, setBio] = useState("")
  const [bioEdit, setBioEdit] = useState(false)
  const [bioLoading, setBioLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Fetch user stats from dashboard API
    async function fetchStats() {
      const token = await getToken({ template: "aimock" })
      const res = await fetch(`${baseURL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
      }
    }
    fetchStats()
  }, [getToken])

  useEffect(() => {
    // Fetch bio on mount
    async function fetchBio() {
      const token = await getToken({ template: "aimock" })
      const res = await fetch(`${baseURL}/api/user/bio`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setBio(data.bio || "")
      }
    }
    fetchBio()
  }, [getToken])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 py-10 px-4 relative overflow-hidden">
      {/* Enhanced Galaxy background effects */}
      <div className="absolute inset-0 dark:opacity-40 opacity-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 dark:opacity-20 opacity-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-cyan-400" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Profile Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
              Master your AI interview journey with style
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-cyan-500/20">
              <Activity className="h-4 w-4 text-green-500 dark:text-cyan-400" />
              <span className="text-sm font-medium dark:text-white">Online</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-12 w-12 border-2 dark:border-cyan-500/50 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              {theme === "dark" ? <Sun className="h-6 w-6 text-cyan-400" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Profile Card */}
          <div className="xl:col-span-3">
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 dark:border dark:border-cyan-500/30 shadow-2xl dark:shadow-cyan-500/20 hover:shadow-3xl transition-all duration-300">
              <CardHeader className="pb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold dark:text-white flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-cyan-400/20 dark:to-blue-400/20">
                      <User className="h-7 w-7 text-blue-600 dark:text-cyan-400" />
                    </div>
                    Profile Information
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 bg-green-100 text-green-700 border-green-200"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Premium Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Enhanced Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-400 dark:to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white dark:ring-slate-800">
                      {user?.firstName?.[0] || user?.username?.[0] || "U"}
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-green-500 dark:bg-cyan-400 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                      <div className="h-4 w-4 bg-white dark:bg-slate-800 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-3">
                    <h2 className="text-3xl font-bold dark:text-white bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {user?.fullName || user?.username || "User"}
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 dark:text-gray-300">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                          <Mail className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                        </div>
                        <span className="font-medium">{user?.primaryEmailAddress?.emailAddress}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 dark:text-gray-300">
                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                          <Calendar className="h-4 w-4 text-purple-600 dark:text-cyan-400" />
                        </div>
                        <span className="font-medium">
                          Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent"></div>

                {/* Enhanced Bio Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Edit3 className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                      Bio
                    </label>
                    {!bioEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setBioEdit(true)}
                        className="dark:border-cyan-500/50 dark:hover:bg-cyan-500/10"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <textarea
                      className="w-full border-2 rounded-2xl p-6 bg-gray-50/80 dark:bg-slate-800/80 dark:border-slate-600 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 transition-all duration-300 resize-none backdrop-blur-sm text-lg leading-relaxed"
                      rows={4}
                      placeholder="Share your story, goals, and what drives you in your interview journey..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={!bioEdit || bioLoading}
                    />
                    {bioEdit && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                          disabled={bioLoading}
                          onClick={async () => {
                            setBioLoading(true)
                            const token = await getToken({ template: "aimock" })
                            await fetch(`${baseURL}/api/user/bio`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ bio }),
                            })
                            setBioEdit(false)
                            setBioLoading(false)
                          }}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setBioEdit(false)}
                          disabled={bioLoading}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  disabled
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl text-lg"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Advanced Profile Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Stats & Achievement Column */}
          <div className="space-y-6">
            {/* Enhanced Stats Card */}
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 dark:border dark:border-cyan-500/30 shadow-2xl dark:shadow-cyan-500/20 hover:shadow-3xl transition-all duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-t-lg">
                <CardTitle className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-cyan-400/20 dark:to-blue-400/20">
                    <BarChart3 className="h-5 w-5 text-yellow-600 dark:text-cyan-400" />
                  </div>
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {stats ? (
                  <div className="space-y-4">
                    <div className="group p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border dark:border-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 group-hover:bg-blue-500/30 transition-colors">
                            <Target className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <span className="font-semibold dark:text-white block">Total Interviews</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Completed sessions</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-bold text-lg px-3 py-1 dark:bg-cyan-500/20 dark:text-cyan-300"
                        >
                          {stats.total}
                        </Badge>
                      </div>
                    </div>

                    <div className="group p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 border dark:border-green-500/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-green-500/20 dark:bg-green-500/30 group-hover:bg-green-500/30 transition-colors">
                            <Star className="h-5 w-5 text-green-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <span className="font-semibold dark:text-white block">Average Score</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Performance rating</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-bold text-lg px-3 py-1 dark:bg-cyan-500/20 dark:text-cyan-300"
                        >
                          {stats.avgScore}/5
                        </Badge>
                      </div>
                    </div>

                    <div className="group p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/30 border dark:border-purple-500/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-purple-500/20 dark:bg-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                            <Clock className="h-5 w-5 text-purple-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <span className="font-semibold dark:text-white block">Practice Time</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Hours invested</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-bold text-lg px-3 py-1 dark:bg-cyan-500/20 dark:text-cyan-300"
                        >
                          {stats.practiceTime}h
                        </Badge>
                      </div>
                    </div>

                    <div className="group p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950/30 dark:to-red-900/30 border dark:border-orange-500/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-orange-500/20 dark:bg-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                            <TrendingUp className="h-5 w-5 text-orange-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <span className="font-semibold dark:text-white block">Success Rate</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Win percentage</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="font-bold text-lg px-3 py-1 dark:bg-cyan-500/20 dark:text-cyan-300"
                        >
                          {stats.successRate}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-slate-700"></div>
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 dark:border-cyan-400 border-t-transparent absolute top-0"></div>
                    </div>
                    <span className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading your stats...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Achievement Card */}
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 dark:border dark:border-cyan-500/30 shadow-2xl dark:shadow-cyan-500/20 hover:shadow-3xl transition-all duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-t-lg">
                <CardTitle className="text-xl font-bold dark:text-white flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-cyan-400/20 dark:to-blue-400/20">
                    <Award className="h-5 w-5 text-yellow-600 dark:text-cyan-400" />
                  </div>
                  Latest Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                    <div className="relative h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-cyan-400 dark:to-blue-500 flex items-center justify-center shadow-2xl">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl dark:text-white bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Interview Master
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Completed 10+ practice interviews with excellence
                    </p>
                    <Badge className="mt-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-cyan-500/20 dark:to-blue-500/20 text-yellow-800 dark:text-cyan-300 border-yellow-200 dark:border-cyan-500/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Earned 2 days ago
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 dark:border dark:border-cyan-500/30 shadow-2xl dark:shadow-cyan-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold dark:text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <Target className="h-4 w-4 mr-2" />
                  Start New Interview
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start dark:border-cyan-500/50 dark:hover:bg-cyan-500/10"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start dark:border-cyan-500/50 dark:hover:bg-cyan-500/10"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Browse Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
