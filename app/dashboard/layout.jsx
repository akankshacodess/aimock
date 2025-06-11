import Header from "./_components/Header"
import { Toaster } from "../../components/ui/sonner"

function DashboardLayout({ children }) {
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <main className="relative">
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
            }}
          />
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error("Error in dashboard&apos;s layout: ", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }
}

export default DashboardLayout
