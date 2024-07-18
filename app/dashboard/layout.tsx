import React from 'react';
import Sidebar from "@/app/dashboard/components/sidebar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <Sidebar />
            <div className="overflow-auto py-2 px-4">
                <h1 className="pb-4">Welcome back, Aminul</h1>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;