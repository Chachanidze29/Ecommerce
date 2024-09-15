import Header from "@/Layouts/Partials/Header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="max-w-7xl mx-auto flex min-h-screen flex-col">
            <Header />

            <main className="flex flex-grow flex-col gap-8 py-8">
                {children}
            </main>
        </div>
    );
}
