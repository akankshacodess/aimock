"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import moment from "moment";
import { chatSession } from "@/utils/AiGemini";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { motion } from "framer-motion";

export default function JobForm({ setOpenDialog }) {
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Generate 10 Interview Questions along with their answers in JSON format.`;

    let result = null;
    try {
      result = await chatSession.sendMessage(InputPrompt);
    } catch (error) {
      console.error("there is some issues, Please try again later", error)
      toast("Server error. Please try again later.");
      setLoading(false);
      return;
    }

    const MockJSONResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    if (!MockJSONResp) {
      toast("Failed to generate questions. Try again.");
      setLoading(false);
      return;
    }

    try {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJSONResp,
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      }
    } catch (error) {
      console.error("DB Insert Error:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>Add details about your job position/role, description, and experience.</div>

        <div className="mt-7 my-3">
          <label htmlFor="job_title">Job Role/Job Position</label>
          <Input
            id="position"
            name="position"
            placeholder="Ex. Full Stack Developer"
            required
            onChange={(e) => setJobPosition(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label htmlFor="job_description">Job Description/ Tech Stack</label>
          <Textarea
            id="description"
            name="description"
            placeholder="Ex. React JS, Tailwind CSS, Node JS, Mongo DB, etc."
            required
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label htmlFor="years_experience">Years of experience</label>
          <Input
            id="experience"
            name="experience"
            placeholder="Ex. 1"
            type="number"
            min="0"
            max="50"
            required
            onChange={(e) => setJobExperience(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-5 justify-end">
        <button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="border rounded p-2 bg-blue-600 text-white hover:bg-blue-400"
        >
          {loading ? (
            <>
            <motion.div 
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  > 
    <LoaderCircle className="h-16 w-16 text-white" />
  </motion.div>
  <motion.div>
    <p>
      wait result will be there 
    </p>
  </motion.div>
</motion.div> Please wait
            </>
          ) : (
            "Start Interview"
          )}
        </button>
      </div>
    </form>
  );
}
