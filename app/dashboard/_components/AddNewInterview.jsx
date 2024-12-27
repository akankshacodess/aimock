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

import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
 

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [JSONResp, setJSONResp] = useState([]);
  const {user} = useUser();
  const router = useRouter();


  const onSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();

    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience, give us 10 Interview Question along with their answers in JSON Format. Give questions and answers as fields in JSON`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJSONResp = (result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJSONResp));
    setJSONResp(MockJSONResp);

    if(MockJSONResp){
    const resp=await db.insert(MockInterview)
    .values({
      mockId: uuidv4(),
      jsonMockResp: MockJSONResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperiene:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')

    }).returning({mockId:MockInterview.mockId});

    console.log("Inserted ID:", resp)
  }

  else{
    console.log("ERROR");
    
  }
    setLoading(false);

  //   let parsedResponse;
  //     try {
  //       parsedResponse = JSON.parse(MockJSONResp);
  //       setJSONResp(parsedResponse);
  //     } catch (error) {
  //       console.error("Error parsing JSON response:", error);
  //       setLoading(false);
  //       return;
  //     }

  //   if(MockJSONResp){
  //   const resp = await db.insert(MockInterview).values({ 
  //     mockId:uuidv4(),
  //     JSONResp:MockJSONResp,
  //     jobPosition:jobPosition,
  //     jobDesc:jobDesc,
  //     jobExperience:jobExperience,
  //     createdBy: user?.primaryEmailAddress?.emailAddress,
  //     createdAt: moment().format('DD-MM-yyyy')
  //   }).returning({mockId:MockInterview.mockId})  //to return id whenever value inserted in db

  //   console.log("Inserted ID: ", resp);
  // }
  // else{
  //   console.log("Error");
    
  // }

  // setLoading(false)
}
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
            <DialogTitle className="text-2xl">
              Tell us more about the job you want to Interview
            </DialogTitle>
            <DialogDescription>
              
              <form onSubmit={ onSubmit }>
                <div>
                  <h2>
                    Add Details about your job position/role, Job Description
                    and years of experience.
                  </h2>
                  <div className="mt-7 my-3">
                    <label htmlFor="job_title"> Job Role/Job Position</label>
                    <Input
                      id="position"
                      name="position"
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
                    className="border rounded  p-2 bg-blue-600 text-white hover:bg-blue-400 "
                  >
                    {loading? 
                    <>
                    <LoaderCircle className="animate-spin"/> Generating </> : 'Start Interview'
                    }
                  </button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      )}
    </>
  );
}

export default AddNewInterview;
