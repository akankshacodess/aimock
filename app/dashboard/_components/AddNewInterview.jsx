"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/AiGemini";
import { db } from "@/utils/db";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle, X } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [JSONResp, setJSONResp] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience, give us 10 Interview Question along with their answers in JSON Format. Give questions and answers as fields in JSON`;

    // you learnt this woohoo
    let result = null;
    try {
      result = await chatSession.sendMessage(InputPrompt);
    } catch (error) {
      toast("Sorry our server is not working at a moment. Try Later please.");
      setLoading(false);
    }
    const MockJSONResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJSONResp));
    setJSONResp(MockJSONResp);

    if (MockJSONResp) {
      try {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJSONResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
        setLoading(false);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  };

  return (
    <>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer hover:shadow-md transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center"> + Add New</h2>
      </div>
      {openDialog && (
        <Dialog open={openDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex justify-between">
                <DialogTitle className="text-2xl">
                  Tell us more about the job you want to Interview
                </DialogTitle>
                <div
                  className="hover:border-black cursor-pointer"
                  onClick={() => setOpenDialog(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
              <DialogDescription>
                <div>
                  <form onSubmit={onSubmit}>
                    <div>
                      <h2>
                        Add Details about your job position/role, Job
                        Description and years of experience.
                      </h2>
                      <div className=" my-3">
                        <label htmlFor="job_title">
                          {" "}
                          Job Role/Job Position
                        </label>
                        <Input
                          id="position"
                          name="position"
                          className="mt-2"
                          placeholder="Ex. Full Stack Developer"
                          required
                          onChange={(e) => setJobPosition(e.target.value)}
                        />
                      </div>
                      <div className="my-3">
                        <label htmlFor="job_description">
                          Job Description/ Tech Stack (In Brief)
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          className="mt-2"
                          placeholder="Ex. React JS, Tailwind CSS, Node JS, Mongo DB, etc."
                          required
                          onChange={(e) => setJobDesc(e.target.value)}
                        />
                      </div>
                      <div className="my-3">
                        <label htmlFor="years_experience">
                          Years of experience
                        </label>
                        <Input
                          id="experience"
                          name="experience"
                          className="mt-2"
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
                      <button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpenDialog(false)}
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                      <button
                        disabled={loading}
                        type="submit"
                        className="border rounded p-2 bg-blue-600 text-white hover:bg-blue-400"
                      >
                        {loading ? (
                          <>
                            <LoaderCircle className="animate-spin " /> Please
                            wait{" "}
                          </>
                        ) : (
                          "Start Interview"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default AddNewInterview;
