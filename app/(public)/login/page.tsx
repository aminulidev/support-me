"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PersonStandingIcon} from "lucide-react";

const LoginPage = () => {
    return (
        <>
            <PersonStandingIcon size={50} className="text-primary" />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to your SupportMe account</CardDescription>
                </CardHeader>
                <CardContent>
                    Login form
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Don&apos have a account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default LoginPage;