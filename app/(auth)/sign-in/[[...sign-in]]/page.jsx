"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Brain, Target, Zap, CheckCircle, Star } from "lucide-react";

export default function SignInPage() {
  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI-Powered Questions",
      description: "Get personalized interview questions based on your role",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Real-time Feedback",
      description: "Receive instant analysis and improvement suggestions",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Practice Anywhere",
      description: "Take mock interviews anytime, anywhere",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content:
        "This platform helped me land my dream job! The AI feedback was incredibly detailed.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Microsoft",
      content:
        "The mock interviews felt so real. I went into my actual interview with complete confidence.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Branding & Features */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
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
                <p className="text-blue-100">Mock Interview Platform</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  Welcome Back to Your Interview Success Journey
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Continue practicing with AI-powered mock interviews and get
                  the job you deserve.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-blue-100 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-blue-200 text-sm">Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-blue-200 text-sm">Rating</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 space-y-4"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm italic mb-2">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="text-xs text-blue-200">
                  <span className="font-semibold">{testimonial.name}</span> -{" "}
                  {testimonial.role}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Sign In Form */}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">
                Welcome back! Please sign in to your account.
              </p>
            </div>

            {/* Clerk Sign In Component */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <SignIn
                fallbackRedirectUrl="/dashboard"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl",
                    card: "shadow-none border-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 rounded-xl",
                    formFieldInput:
                      "border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                    footerActionLink:
                      "text-blue-600 hover:text-blue-700 font-semibold",
                  },
                }}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
