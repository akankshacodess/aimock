import React from "react"

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={
        `inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ${className}`.trim()
      }
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
