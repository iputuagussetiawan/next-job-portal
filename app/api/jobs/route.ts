import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST=async(req:Request)=>{
    try {
        const authResult = await auth();
        const {userId}=authResult;
        const {title}=await req.json();
        if(!userId) return new NextResponse("Unauthorized",{status:401});
        if(!title) return new NextResponse("Title is required",{status:400});

        const job=await db.job.create({
            data:{
                title,
                userId
            }
        })
        return new NextResponse(JSON.stringify(job),{status:201});

    } catch (error) {
        console.log(`[JOB_POST]: ${error}`);
        return new NextResponse("Internal Server Error",{status:500});
    }
}