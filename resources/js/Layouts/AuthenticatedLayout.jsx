import { usePage } from "@inertiajs/react";
import Header from "@/Layouts/Partials/Header";

export default function Authenticated({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="max-w-7xl mx-auto flex min-h-screen flex-col">
            <Header />

            <main>{children}</main>
        </div>
    );
}
