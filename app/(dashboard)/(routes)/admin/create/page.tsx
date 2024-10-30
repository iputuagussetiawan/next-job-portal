"use client"
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
const formSchema = z.object({
    title: z.string().min(1,{message: "Job title is required"}).max(50),
})

const JobCreatePage=()=> {
    const [isLoading, setIsLoading] = useState(false)
    const form=useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid}=form.formState

    const onSubmit=async(data: z.infer<typeof formSchema>)=>{
        console.log(data)
    }
    return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
        <div>
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
                                <Input 
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
                        <Link href="/">
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