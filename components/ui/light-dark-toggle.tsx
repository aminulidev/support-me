"use client";
import React, {useState} from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {MoonIcon, SunIcon} from "lucide-react";

type Props = {
    className?: string;
}

const LightDarkToggle = ({className}: Props) => {
    const [isDark, setIsDark] = useState(true);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    className={className}
                    onClick={() => {
                    setIsDark(prevState => !prevState);
                    document.body.classList.toggle("dark");
                }}>
                    {isDark ? <MoonIcon /> : <SunIcon />}
                </TooltipTrigger>
                <TooltipContent>
                    {isDark ? "Enable light mode" : "Enable dark mode"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default LightDarkToggle;