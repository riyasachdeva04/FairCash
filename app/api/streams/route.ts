import { prismaClient } from "@/app/lib/db";
import { Department } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateProfileViewSchema = z.object({
    employeeID: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const data = CreateProfileViewSchema.parse(await req.json());

        // Create a new profile view in the database
        await prismaClient.profileView.create({ // Fixed: Added parentheses around the create method
                data: {
                    userId: data.employeeID,
                    type: Department.Android,
                    bookmark: false
                }
        })

        return NextResponse.json({ message: "Profile view created successfully!" }, { status: 201 });
    } catch (e) {
        console.error(e); // Log the error for debugging
        return NextResponse.json(
            { message: "Error creating profile" },
            { status: 400 } // Changed: 411 to 400 for a more appropriate response status
        );
    }
}
