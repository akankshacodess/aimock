"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import JobForm from "./JobForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 cursor-pointer hover:shadow-md transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
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

              <JobForm setOpenDialog={setOpenDialog} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
