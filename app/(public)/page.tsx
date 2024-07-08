import React from 'react';
import {Button} from "@/components/ui/button";
import {PersonStandingIcon} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
    return (
        <>
            <h1 className="flex items-center gap-2">
                <PersonStandingIcon size={50} className="text-primary" />
                Support me
            </h1>
            <p>The best dashboard to manage customer support</p>
            <div className="flex items-center gap-2">
                <Button asChild>
                    <Link href="/login">Log in</Link>
                </Button>
                <small>or</small>
                <Button variant="outline" asChild>
                    <Link href="/sign-up">Sign up</Link>
                </Button>
            </div>
        </>
    );
};

export default HomePage;