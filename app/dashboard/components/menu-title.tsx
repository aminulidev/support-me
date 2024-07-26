import React from 'react';
import {PersonStandingIcon, PresentationIcon} from "lucide-react";
import Link from "next/link";

const MenuTitle = () => {
    return (
        <Link href="/">
            <h4 className="flex items-center gap-2 justify-center">
                <PersonStandingIcon size={40} className="text-primary"/>
                SupportMe
            </h4>
        </Link>
    );
};

export default MenuTitle;