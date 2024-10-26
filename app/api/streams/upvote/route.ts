import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upvoteSchema = z.object({
    userId: z.string(),
    profileId: z.string() 
});

export async function POST(req: NextRequest) {
    try {
        const data = upvoteSchema.parse(await req.json());
        
        const profileExists = await prismaClient.profileView.findFirst({
            where: { userId: data.profileId },
        });
        if (!profileExists) {
            return NextResponse.json({
                message: `Profile with User ID ${data.profileId} does not exist.`
            }, { status: 404 });
        }
        const upvoteExists = await prismaClient.upvote.findFirst({
            where: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
        const downvoteExists = await prismaClient.downvote.findFirst({
            where: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
        if(downvoteExists){
            await prismaClient.downvote.deleteMany({
                where: {
                    userId: data.userId,
                    profileId: data.profileId
                }
            });
        }
        if (upvoteExists) {
            return NextResponse.json({
                message: "Upvote already exists."
            }, { status: 404 });
        }
        await prismaClient.upvote.create({
            data: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
    
        return NextResponse.json({ message: "Upvote recorded successfully" }, { status: 201 });
    } catch (err) {
        console.error("Error creating upvote:", err);
        return NextResponse.json({
            message: err instanceof Error ? err.message : "Unknown error"
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const profileId = req.nextUrl.searchParams.get("profileId");
    console.log(profileId);
    if (!profileId) {
        return NextResponse.json({
            message: "Profile ID is required"
        }, {
            status: 400
        });
    }

    const profile = await prismaClient.profileView.findFirst({
        where: {
            userId: profileId
        }
    });

    if (!profile) {
        return NextResponse.json({
            message: "Profile not found"
        }, {
            status: 404
        });
    }

    return NextResponse.json({
        profile
    }, { status: 200 });
}
