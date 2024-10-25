import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upvoteSchema = z.object({
    userID: z.string() // This is the profile ID you want to upvote
});

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });
    if (!user) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 403
        });
    }
    try {
        const data = upvoteSchema.parse(await req.json());

        // Ensure you're referencing the correct IDs based on your schema
        await prismaClient.upvote.create({
            data: {
                userId: user.id, // This is the ID of the user who is voting
                profileId: data.userID // This is the profile ID being upvoted
            }
        });

        return NextResponse.json({ message: "Upvote recorded successfully" }, { status: 201 });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return NextResponse.json({
            message: "Error upvoting"
        }, {
            status: 500 // Use a 500 status code for internal server errors
        });
    }
}

export async function GET(req: NextRequest) {
    const profileId = req.nextUrl.searchParams.get("profileId");
    if (!profileId) {
        return NextResponse.json({
            message: "Profile ID is required"
        }, {
            status: 400
        });
    }

    const profile = await prismaClient.profileView.findFirst({
        where: {
            id: profileId // Fetching by profile ID instead of userId
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
