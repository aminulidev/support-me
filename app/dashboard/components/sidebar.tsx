import React from 'react';
import MenuTitle from "@/app/dashboard/components/menu-title";
import MenuItem from "@/app/dashboard/components/menu-item";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";
import LightDarkToggle from "@/components/ui/light-dark-toggle";

const Sidebar = () => {
    return (
        <nav className="bg-muted overflow-auto p-4 flex flex-col">
            <header className="border-b dark:border-b-black border-b-zinc-300 pb-4">
                <MenuTitle />
            </header>
            <ul className="py-4 grow">
                <MenuItem href="/dashboard">My Dashboard</MenuItem>
                <MenuItem href="/dashboard/teams">Teams</MenuItem>
                <MenuItem href="/dashboard/employees">Employees</MenuItem>
                <MenuItem href="/dashboard/account">Account</MenuItem>
                <MenuItem href="/dashboard/settings">Settings</MenuItem>
            </ul>
            <footer className="flex gap-2 items-center">
                <Avatar>
                    <AvatarFallback className="bg-primary">AP</AvatarFallback>
                </Avatar>
                <Link href="/" className="hover:underline">Logout</Link>
                <LightDarkToggle className="ml-auto rounded-full" />
            </footer>
        </nav>
    );
};

export default Sidebar;