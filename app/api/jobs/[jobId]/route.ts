import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH=async(req:Request, {params}:{params:{jobId:string}   })=>{
    try {
        const authResult = await auth();
        const {userId}=authResult;

        const {jobId}=params;
        const updatedValues=await req.json();

        if(!jobId) return new NextResponse("Job ID is missing",{status:401});
        if(!userId) return new NextResponse("Unauthorized",{status:401});

        const job=await db.job.update({
            where:{
                id:jobId,
                userId
            },
            data:{...updatedValues}
        })
        return new NextResponse(JSON.stringify(job),{status:201});

    } catch (error) {
        console.log(`[JOB_PATCH]: ${error}`);
        return new NextResponse("Internal Server Error",{status:500});
    }
}