import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this import based on your file structure

const CreateProfileViewSchema = z.object({
    employeeID: z.string(),
    type: z.enum(['HR', 'Android', 'IOS', 'ML', 'Devops', 'Backend', 'Frontend', 'Management']),
});

export async function POST(req: NextRequest) {
    // const session = await getServerSession(authOptions);

    // if (!session?.user) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const data = CreateProfileViewSchema.parse(await req.json());

        const newProfileView = await prismaClient.profileView.create({
            data: {
                userId: data.employeeID,
                type: data.type,
                bookmark: false,
                url: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
            },
        });

        return NextResponse.json(
            { message: "Profile view created successfully!", profileView: newProfileView },
            { status: 201 }
        );
    } catch (e) {
        console.error(e);
        if (e instanceof z.ZodError) {
            return NextResponse.json({ message: "Validation error", issues: e.errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    // const session = await getServerSession(authOptions);

    // if (!session?.user) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        const profileViews = await prismaClient.profileView.findMany({
            where: { userId },
        });

        return NextResponse.json({ profileViews }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error retrieving profile views" }, { status: 500 });
    }
}