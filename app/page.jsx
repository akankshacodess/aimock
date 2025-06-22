// final code

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import ChatBubble from "../components/ui/ChatBubble";
import {
  LoaderCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
  Brain,
  Mic,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggleSimple } from "../components/theme-toggle-simple";

export default function Hero() {
  const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Questions",
      description: "Tailored questions based on your role and experience",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Recognition",
      description: "Practice speaking naturally with advanced speech-to-text",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Get detailed analysis and improvement suggestions",
    },
  ];

  const stats = [
    { number: "10K+", label: "Interviews Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9", label: "Average Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      content:
        "This platform helped me land my dream job! The AI feedback was incredibly detailed and actionable.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      content:
        "The mock interviews felt so real. I went into my actual interview with complete confidence.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-200 to-indigo-200 dark:from-slate-900 dark:via-indigo-700 dark:to-gray-600 overflow-hidden ">
      {/* Theme Toggle in top right */}
      <div className="fixed top-6 right-6 z-50 ">
        <ThemeToggleSimple className=" dark:bg-slate-800 dark:text-white bg-blue-100 hover:bg-white border-none dark:hover:bg-slate-600" />
      </div>

      {/* Animated Background Elements */}
      <div className="relative inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text & CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                #1 AI Interview Platform
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Ace Your Next Interview with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                <span className="relative">
                  Mock Interviews
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30"
                  />
                </span>
                🚀
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
              >
                Get real-time AI feedback, improve your responses, and boost
                confidence before your dream job interview.
              </motion.p>

              <div className="sm:place-items-center sm:space-y-4">
                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Instant feedback</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/sign-in">
                      <Button
                        className={`px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group ${
                          loading
                            ? "cursor-not-allowed opacity-60 hover:shadow-xl"
                            : "cursor-pointer"
                        }`}
                        onClick={() => setLoading(true)}
                        disabled={loading}
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <LoaderCircle className="animate-spin mr-2 " />
                            Processing...
                          </>
                        ) : (
                          <>
                            🎯 Start Practicing Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="px-8 py-6 text-lg border-2 bg-slate-900 text-white border-gray-800 hover:bg-blue-700 hover:text-white hover:border-blue-700 dark:bg-slate-900 dark:text-white dark:border-gray-800 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-800 rounded-2xl transition-all duration-300"
                      size="lg"
                    >
                      Watch Demo
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Chat Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>

              {/* Chat Bubble with Enhanced Styling */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <ChatBubble />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-10 -right-8 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
              >
                <Target className="w-6 h-6 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-20 -left-8 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
              >
                <Brain className="w-6 h-6 text-purple-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white dark:bg-slate-900 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of interview preparation with cutting-edge
              AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 sm:text-center sm:place-items-center"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 ">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto">
              Join thousands who&apos;ve landed their dream jobs with our
              platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-100 dark:text-blue-200 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-white text-black dark:bg-slate-900 dark:text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold  mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who&apos;ve improved their
              interview skills with our AI platform
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sign-in">
                <Button
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  size="lg"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom CSS for animations */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
