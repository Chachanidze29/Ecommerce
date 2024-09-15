import { usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Alert, AlertTitle } from "@/Components/ui/alert";
import SideMenu from "./Partials/SideMenu";

export default function AdminLayout({ children }: PropsWithChildren) {
    const {
        flash: { success, error },
    } = usePage<PageProps>().props;

    const { t } = useLaravelReactI18n();

    return (
        <div className="mx-auto flex min-h-screen flex-col h-full">
            {(success || error) && (
                <div className="container">
                    <Alert variant={error ? "destructive" : "success"}>
                        <AlertTitle>{t(success || error)}</AlertTitle>
                    </Alert>
                </div>
            )}

            <div className="flex flex-row gap-10 m-10">
                <SideMenu />

                <main className="flex flex-grow flex-col gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
