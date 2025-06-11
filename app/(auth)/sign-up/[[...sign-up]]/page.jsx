"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Brain, Target, CheckCircle, Users, Award, TrendingUp } from "lucide-react"

export default function SignUpPage() {
  const benefits = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Practice",
      description: "Get personalized interview questions tailored to your industry and experience level",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Receive detailed analysis of your answers with actionable improvement suggestions",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your improvement over time with detailed analytics and performance metrics",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Industry Standards",
      description: "Practice with questions used by top companies like Google, Microsoft, and Amazon",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Proven Results",
      description: "Join thousands who&apos;ve successfully landed their dream jobs using our platform",
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Create Account",
      description: "Sign up in seconds with your email or social account",
    },
    {
      number: "2",
      title: "Set Your Goals",
      description: "Tell us about your target role and experience level",
    },
    {
      number: "3",
      title: "Start Practicing",
      description: "Begin your first AI-powered mock interview immediately",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Benefits & Process */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Interview</h1>
                <p className="text-purple-100">Mock Interview Platform</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-4">Start Your Interview Success Journey Today</h2>
                <p className="text-xl text-purple-100 leading-relaxed">
                  Join thousands of professionals who&apos;ve improved their interview skills and landed their dream jobs.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h3>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-purple-100 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* How it Works */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">How It Works</h3>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-purple-100 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-white/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md mx-auto w-full"
          >
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Start your interview preparation journey today!</p>
            </div>

            {/* Clerk Sign Up Component */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <SignUp
                afterSignUpUrl="/dashboard"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl",
                    card: "shadow-none border-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 rounded-xl",
                    formFieldInput: "border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg",
                    footerActionLink: "text-purple-600 hover:text-purple-700 font-semibold",
                  },
                }}
              />
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>100% Free to start</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>No credit card required</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
