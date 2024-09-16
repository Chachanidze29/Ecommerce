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
                <Alert variant={error ? "destructive" : "success"}>
                    <AlertTitle className="text-center text-bold">
                        {t(success || error)}
                    </AlertTitle>
                </Alert>
            )}

            <div className="flex flex-row gap-10">
                <SideMenu />

                <main className="flex flex-grow flex-col gap-8 m-5 mt-2">
                    {children}
                </main>
            </div>
        </div>
    );
}
