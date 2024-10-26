import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookmarkSchema = z.object({
    userId: z.string(),
    profileId: z.string()
});

export async function POST(req: NextRequest) {
    try {
        const data = bookmarkSchema.parse(await req.json());
        
        const profileExists = await prismaClient.profileView.findFirst({
            where: { userId: data.profileId }, 
        });
        if (!profileExists) {
            return NextResponse.json({
                message: `Profile with User ID ${data.profileId} does not exist.`
            }, { status: 404 });
        }
        const bookmarkExists = await prismaClient.bookmark.findFirst({
            where: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
        if(bookmarkExists){
            await prismaClient.bookmark.deleteMany({
                where: {
                    userId: data.userId,
                    profileId: data.profileId
                }
            });
            return NextResponse.json({ message: "bookmark removed successfully" }, { status: 201 });
        }

        await prismaClient.bookmark.create({
            data: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
    
        return NextResponse.json({ message: "bookmark recorded successfully" }, { status: 201 });
    } catch (err) {
        console.error("Error creating downvote:", err);
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
