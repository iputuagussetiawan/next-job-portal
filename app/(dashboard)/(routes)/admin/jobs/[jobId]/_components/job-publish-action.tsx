'use client'

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React, { useState } from 'react'
interface JobPublishActionProps {
    disabled: boolean;
    jobId: string;
    isPublished: boolean;

}

const JobPublishAction = ({disabled,jobId,isPublished}:JobPublishActionProps) => {
    const[isLoading, setIsLoading]=useState(false)
    const onClick=()=>{
        
    }

    const onDelete=async()=>{
        
    }
  return (
    <div className='flex flex-items-center gap-3'>
        <Button 
            variant={'outline'} 
            size={"sm"} 
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {isPublished ? "Unpublished" : "Publish"}
        </Button>
        <Button
            variant={"destructive"}
            size={"sm"}
            disabled={isLoading}
            onClick={onDelete}
        >
            <Trash className='w-4 h-4'/>
        </Button>
    </div>
  )
}

export default JobPublishAction