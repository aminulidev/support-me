"use client";
import * as React from "react"

import { cn } from "@/lib/utils"
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div className="relative">
                <Input type={showPassword ? "text" : "password"} {...props} ref={ref} className={cn("pr-10")} />
                <span
                    onClick={() => {
                        setShowPassword(prevState => !prevState)
                    }}
                    className="absolute top-2 right-3 cursor-pointer select-none">
                    {showPassword ? <EyeIcon/> : <EyeOffIcon/> }
                </span>
            </div>
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
