// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Footer from "@/components/footer";

// export default function Home() {
//   return (
//     <div className=" min-h-screen bg-base-200">
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold text-white">
//               Welcome to our Ai Mock Interview Site
//             </h1>
//             <p className="py-6 text-white">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
//               et a id nisi.
//             </p>
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <span>
//               <Link className="flex justify-center" href={"/dashboard"}>
//                 <Button>Let's Do This </Button>
//               </Link>
//             </span>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div>
      <div className="hero min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 transform -translate-x-1/2 w-full max-w-lg md:max-w-2xl"
          >
            <img
              src="/hero.webp" // Replace with actual image path
              alt="AI Mock Interview"
              className="w-full"
            />
          </motion.div>
        </div>
        <div className="hero-content text-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-2xl mt-48 md:mt-64"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              🚀 Ace Your Next Interview with AI-Powered Mock Interviews
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Practice real-world interview scenarios, get instant AI-driven
              feedback, and **boost your confidence** before stepping into the
              real world!
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link href="/dashboard">
                <Button className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-full shadow-lg">
                  🎯 Start Practicing Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
