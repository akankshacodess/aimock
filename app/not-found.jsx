"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Home, Search, ArrowLeft, Brain, HelpCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-8xl md:text-9xl font-bold text-gray-200 select-none">404</div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, even our AI gets lost sometimes!
            </p>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Here&apos;s what you can do:</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Go Home</h3>
                <p className="text-sm text-gray-600">Return to the homepage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-100">
                <Search className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Search</h3>
                <p className="text-sm text-gray-600">Look for what you need</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-100">
                <HelpCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">Get Help</h3>
                <p className="text-sm text-gray-600">Contact our support</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/" passHref legacyBehavior>
              <a>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </a>
            </Link>
            <Link href="/dashboard" passHref legacyBehavior>
              <a>
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </a>
            </Link>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-gray-500"
          >
            💡 Fun fact: 404 errors are named after room 404 at CERN where the first web server was located!
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
