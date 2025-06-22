import Header from "./_components/Header";
import { Toaster } from "../../components/ui/sonner";
import { ThemeProvider } from "../../components/theme-provider";

function DashboardLayout({ children }) {
  try {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground">
          <div className="max-w-screen sm:mx-auto">
            <Header />
            <main className="relative ">
              <Toaster position="bottom " />
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Error in dashboard's layout: ", error);
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p>Please try refreshing the page</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default DashboardLayout;
