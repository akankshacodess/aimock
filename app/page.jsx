// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import Footer from "@/components/footer";

// // export default function Home() {
// //   return (
// //     <div className=" min-h-screen bg-base-200">
// //       <div className="hero bg-base-200 min-h-screen">
// //         <div className="hero-content flex-col lg:flex-row">
// //           <div className="text-center lg:text-left">
// //             <h1 className="text-5xl font-bold text-white">
// //               Welcome to our Ai Mock Interview Site
// //             </h1>
// //             <p className="py-6 text-white">
// //               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
// //               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
// //               et a id nisi.
// //             </p>
// //           </div>
// //           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
// //             <span>
// //               <Link className="flex justify-center" href={"/dashboard"}>
// //                 <Button>Let's Do This </Button>
// //               </Link>
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }

// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import ChatBubble from "@/components/ui/ChatBubble";

// export default function Hero() {
//   return (
//     <div>
//       {/* hero section from daisy ui */}
//       <div className="hero min-h-screen bg-gradient-to-br from-gray-800 via-gray-500 to-gray-900 text-white px-6">
//         <div className="px-5 flex flex-row-reverse gap-3">
//           <div className="basis-5/12">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               className=" top-0 transform -translate-x-1/2 w-full max-w-lg md:max-w-2xl "
//             >
//               <ChatBubble />
//             </motion.div>
//           </div>
//           <div className="basis-1/12"></div>

//           <div className="basis-7/12">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="text-center "
//             >
//               <div>
//                 <h1 className="text-3xl font-bold text-white">
//                   🚀 Ace Your Next Interview with AI-Powered Mock Interviews
//                 </h1>
//                 <p className="py-3 text-white">
//                   Practice real-world interview scenarios, get instant AI-driven
//                   feedback, and boost your confidence before stepping into the
//                   real world!
//                 </p>
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="mt-6"
//                 >
//                   <Link href="/dashboard">
//                     <Button className="px-6 py-3 text-lg bg-blue-900 hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg">
//                       🎯 Start Practicing Now
//                     </Button>
//                   </Link>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ChatBubble from "@/components/ui/ChatBubble";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [loading, setLoading] = useState(false);
  return (
<<<<<<< HEAD
    <div className="hero min-h-screen bg-[rgb(255,255,255)] text-black px-6 flex flex-col-reverse md:flex-row-reverse items-center justify-between">
      {/* Chat Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-5/12"
      >
        <ChatBubble />
      </motion.div>

      {/* Text & CTA Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center md:text-left w-full md:w-6/12 pl-5"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Ace Your Next Interview with{" "}
          <span className="text-blue-700">AI-Powered Mock Interviews</span>🚀
        </h1>
        <p className="text-lg md:text-xl opacity-90 pt-5">
          Get real-time AI feedback, improve your responses, and boost
          confidence before your dream job interview.
        </p>
        <div className="flex justify-start">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="my-7"
          >
            <Link href="/dashboard">
              <Button
                className="px-6 py-4 text-lg bg-blue-600 text-white hover:bg-blue-400 transition-all duration-300 rounded-full shadow-lg"
                onClick={() => {
                  setLoading(true);
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Processing...
                  </>
                ) : (
                  "🎯 Start Practicing Now"
                )}
              </Button>
            </Link>
          </motion.div>
=======
    <div className="min-h-screen">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white">
              Welcome to our Ai Mock Interview Site
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <span>
              <Link className="flex justify-center" href={"/dashboard"}>
                <Button>Let's Do This </Button>
              </Link>
            </span>
          </div>
>>>>>>> 99d3881 (done changes)
        </div>
      </motion.div>
    </div>
  );
}
