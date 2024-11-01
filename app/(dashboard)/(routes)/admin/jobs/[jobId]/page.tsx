import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import JobPublishAction from './_components/job-publish-action';
import Banner from '@/components/banner';
import IconBadge from '@/components/icon-badge';
import { TitleForm } from './_components/title-form';

const JobDetailPage =async({params}:{params:{jobId:string}}) => {
    //verify mongoDB ID
    const validObjectIdRegex=/^[0-9a-fA-F]{24}$/;
    if(!validObjectIdRegex.test(params.jobId)) {
        return redirect("/admin/jobs")
    }

    const authResult = await auth();
    const {userId}=authResult;

    if(!userId) {
        return redirect("/")
    }

    const job=await db.job.findUnique({
        where:{
            id: params.jobId,
            userId
        }
    });

    if(!job){
        return redirect("/admin/jobs");
    }

    const requiredFields=[job.title,job.description, job.imageUrl]
    const totalFields=requiredFields.length
    const completedFields=requiredFields.filter(Boolean).length

    const isCompleted=requiredFields.every(Boolean)
    const completionText=`${completedFields}/${totalFields}`

    return (
        <div className='p-6'>
            <Link href={"/admin/jobs"}>
                <div className='flex items-center gap-2 cursor-pointer text-neutral-500'>
                    <ArrowLeft className='w-4 h-4'/>
                    Back
                </div>
            </Link>
            <div className='flex items-center justify-between my-4'>
                <div className="flex flex-col gap-y-2">
                    <h1 className='text-2xl font-medium'>Job Setup</h1>
                    <span className='text-sm text-neutral-500'>Complete All Field {completionText}</span>
                </div>

                <JobPublishAction
                    jobId={params.jobId}
                    disabled={!isCompleted}
                    isPublished={job.isPublished}
                />
            </div>
            {!job.isPublished && (
                <Banner
                    variant="warning"
                    label="This job is not published yet"
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} variant="default"/>
                        <h2 className='text-2xl text-neutral-700'>Customize Your Jobs</h2>
                    </div>

                    <TitleForm initialData={job} jobId={job.id}/>
                </div>
            </div>
        </div>
    )
}

export default JobDetailPage