import React from 'react';

type Props = {
    children: React.ReactNode;
}

const PublicLayout = ({children}: Props) => {
    return (
        <main className="flex flex-col gap-4 min-h-screen items-center justify-center p-24">
            {children}
        </main>
    );
};

export default PublicLayout;