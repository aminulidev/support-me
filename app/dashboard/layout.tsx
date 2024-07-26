"use client";
import React, {useState} from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Sidebar from "@/app/dashboard/components/sidebar";
import {useMediaQuery} from "@/hooks/use-media-query";
import MenuTitle from "@/app/dashboard/components/menu-title";
import {MenuIcon} from "lucide-react";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onCloseDrawer = () => {
        setMobileMenuOpen(false);
    }

    return (
        <div className="grid md:grid-cols-[250px_1fr] h-screen">
            <Sidebar className="hidden md:flex"/>
            {/* mobile menu */}
            {!isDesktop && (
                <div className="p-4 flex justify-between md:hidden sticky top-0 right-0 bg-background border-b border-border h-fit">
                    <MenuTitle />
                    <Drawer
                        direction="right"
                        open={mobileMenuOpen}
                        onClose={onCloseDrawer}
                        onOpenChange={(open) => setMobileMenuOpen(open)}
                    >
                        <DrawerTrigger>
                            <MenuIcon />
                        </DrawerTrigger>
                        <DrawerContent className="w-[320px] left-auto mt-0">
                            <Sidebar />
                        </DrawerContent>
                    </Drawer>
                </div>
            )}

            <div className="overflow-auto py-2 px-4">
                <h1 className="pb-4">Welcome back, Aminul</h1>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;