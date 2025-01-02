'use client'
import {db} from '@/utils/db'
import { userAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React,{useEffect, useState} from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback = async()=>{
        const result = await db.select()
        .from(userAnswer)
        .where(eq(userAnswer.mockIdRef, params.interviewId))
        .orderBy(userAnswer.id);

        console.log(result);
        setFeedbackList(result);

    }
  return (
    <div className='p-10'>
        <h2 className='text-3xl font-bold text-green-500 '>Congratulations</h2>
        <h2 className='font-bold text-2xl'>here is your interview feedback</h2>
        <h2 className='text-primary text-lg my-3'>your overall interview rating </h2>
    
        <h2 className='text-sm text-gray-500'>find below queston and corrected answer </h2>
        {feedbackList&&feedbackList.map((item, index)=>{
<Collapsible key = {index} className='mt-7'>
<CollapsibleTrigger className = 'p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
    {item.question}<ChevronsUpDown></ChevronsUpDown>
</CollapsibleTrigger>
<CollapsibleContent>
<div>
    <h2>
        <strong className='text-red-500 p-2 border rounded-lg'>Rating:</strong>
        {item.rating}
    </h2>
    <h2 className='p-2 border rounded-lg bg-red-50 text-sm  text-red-100'><strong>Your Answer </strong>{item.userAns}</h2>
    <h2 className='p-2 border rounded-lg bg-green-50 text-sm  text-green-100'><strong>Correct Answer </strong>{item.correctAns}</h2>
    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm  text-red-100'><strong>Feedback: </strong>{item.feedback}</h2>

</div>
</CollapsibleContent>
</Collapsible>

        })}
        
        <Button>go home</Button>
    </div>

  )
}
