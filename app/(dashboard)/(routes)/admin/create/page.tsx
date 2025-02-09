"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
const formSchema = z.object({
    title: z.string().min(1,{message: "Job title is required"}).max(50),
})

const JobCreatePage=()=> {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid}=form.formState

    const onSubmit=async(data: z.infer<typeof formSchema>)=>{
        try {
            const response=await axios.post("/api/jobs",data)
            console.log(response)
            router.push(`/admin/jobs/${response.data.id}`);
            toast.success("Job created successfully");
        } catch (error) {
            console.log(`[JOB_POST]: ${error}`);
        }
    }
    return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
        <div className='w-full'>
            <h1 className='text-2xl'>Name your job</h1>
            <p className='text-sm text-neutral-500 mb-5'>What is your job title? to describe your job, Dont worry, you can change it anytime</p>
            {/* Form Here */}
            <FormProvider  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input className='h-20 text-2xl'
                                    disabled={isSubmitting} 
                                    placeholder="Full Stack Developer" {...field} />
                            </FormControl>
                            <FormDescription>
                                Role of this job
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-2">
                        <Link href="/admin/jobs">
                            <Button type="button" variant={'outline'}>Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={!isValid || isSubmitting}>Continue</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </div>
    )
}

export default JobCreatePage