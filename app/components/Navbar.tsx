"use client";

import Link from "next/link"; // Import Next.js Link
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 bg-black">
            <div className="text-xl font-bold ">
                Coworker Feed
            </div>
            <div>
                <Link href={{ pathname: `/myprofile` }} passHref>
                    <Button>Your Profile</Button>
                </Link>
            </div>
        </div>
    );
}
