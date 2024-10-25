import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upvoteSchema = z.object({
    userID: z.string()
})

export async function POST(req: NextRequest){
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });
    if(!user){
        return NextResponse.json({
            message: "Unauthorized"
        },{
            status: 403
        })
    }
    try{
        const data = upvoteSchema.parse(await req.json());
        await prismaClient.upvote.delete({
            where: {
                userId_profileId:{
                    userId: user.id,
                    profileId: data.userID
                }
            }
        });
    }
    catch(err){
        return NextResponse.json({
            message: "Error upvoting"
        },
    {
        status: 403
    })
    }
}