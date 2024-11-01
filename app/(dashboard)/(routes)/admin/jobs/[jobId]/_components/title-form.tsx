'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface TitleFormProps {
    initialData: {
        title: string
    };
    jobId: string
}

const formSchema = z.object({
    title: z.string().min(1,{message: "Job title is required"}).max(50),
})

export const TitleForm = ({initialData, jobId}:TitleFormProps) => {
    const [isEditing, setIsEditing]=useState(false);
    const router=useRouter();

    const form=useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const {isSubmitting, isValid}=form.formState

    const onSubmit=async(data: z.infer<typeof formSchema>)=>{
        console.log(data)
        try {
            const response=await axios.patch(`/api/jobs/${jobId}`,data);
            toast.success("Job updated successfully")
            toggleEditing();
            router.refresh()
            console.log(response)
        } catch (error) {
            toast.error("Something went wrong")
            console.log(`[JOB_POST]: ${error}`)
        }
    }
    const toggleEditing=()=>{
        setIsEditing(!isEditing)
    }
  return (
    <div className='mt-6 border bg-neutral-100 rounded-md p-4'>
        <div className='font-medium items-center justify-between flex'>
            Job Title
            <Button onClick={toggleEditing} variant={'ghost'}>
                {isEditing ? (<>Cancel</>) : <><Pencil className='w-4 h-4'/> Edit Title</>}
            </Button>
        </div>
        {!isEditing && (
            <p className='text-sm mt-2'>{initialData.title}</p>
        )}

        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder='e.g Full Stack Developer' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Button disabled={!isValid || isSubmitting} type='submit'>Save</Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
  )
}
