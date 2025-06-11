import React from "react"

export function Progress({ value = 0, max = 100, className = "", ...props }) {
  const percent = Math.min(Math.max(value, 0), max) / max * 100
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`} {...props}>
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default Progress
