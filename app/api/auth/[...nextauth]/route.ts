import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        async signIn(params) {
            if (!params.user.email) return false;
            try {
                localStorage.setItem('user.email', params.user.email);
                await prismaClient.user.create({
                    data: {
                        email: params.user.email,
                        provider: "Google",
                        role: "EndUser"
                    }
                });
            } catch (e) {
                console.error("Error creating user:", e);
            }
            return true;
        }
    }
});

export const GET = handler;
export const POST = handler;
