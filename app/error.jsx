"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { RefreshCw, Home, AlertTriangle, Bug } from "lucide-react"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto"
            >
              <AlertTriangle className="w-12 h-12 text-white" />
            </motion.div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-red-300 rounded-full animate-ping mx-auto opacity-20"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Something Went Wrong</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We encountered an unexpected error. Our AI is working to fix this issue!
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6"
          >
            <div className="flex items-center justify-center mb-4">
              <Bug className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-lg font-semibold text-red-800">Error Details</h2>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-100">
              <code className="text-sm text-red-700 break-all">{error?.message || "An unexpected error occurred"}</code>
              {error?.digest && <div className="mt-2 text-xs text-red-600">Error ID: {error.digest}</div>}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-gray-500"
          >
            If this problem persists, please contact our support team with the error ID above.
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
