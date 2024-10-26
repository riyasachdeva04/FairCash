import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const downvoteSchema = z.object({
    userId: z.string(),
    profileId: z.string() // This is the user's true ID you want to downvote
});

export async function POST(req: NextRequest) {
    // const session = await getServerSession();
    // const user = await prismaClient.user.findFirst({
    //     where: {
    //         email: session?.user?.email ?? ""
    //     }
    // });
    // if (!user) {
    //     return NextResponse.json({
    //         message: "Unauthorized"
    //     }, {
    //         status: 403
    //     });
    // }
    try {
        const data = downvoteSchema.parse(await req.json());
        
        // Check if a profile exists with the specified userId (profileId)
        const profileExists = await prismaClient.profileView.findFirst({
            where: { userId: data.profileId }, // Check if userId matches profileId
        });
        if (!profileExists) {
            return NextResponse.json({
                message: `Profile with User ID ${data.profileId} does not exist.`
            }, { status: 404 });
        }
        const downvoteExists = await prismaClient.downvote.findFirst({
            where: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
        if (downvoteExists) {
            return NextResponse.json({
                message: "downvote already exists."
            }, { status: 404 });
        }
        await prismaClient.downvote.create({
            data: {
                userId: data.userId,
                profileId: data.profileId
            }
        });
    
        return NextResponse.json({ message: "downvote recorded successfully" }, { status: 201 });
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
