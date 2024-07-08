import React from 'react';
import LightDarkToggle from "@/components/ui/light-dark-toggle";

type Props = {
    children: React.ReactNode;
}

const PublicLayout = ({children}: Props) => {
    return (
        <main className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
            {children}
            <LightDarkToggle
                className="fixed top-[calc(50%-12px)] right-2"
            />
        </main>
    );
};

export default PublicLayout;