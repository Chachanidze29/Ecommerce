import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { MdAccountCircle } from "react-icons/md";

import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { User } from "@/types/models";

const AccountIcon = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useLaravelReactI18n();

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2">
                    <MdAccountCircle className="h-6 w-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
                <div className="flex flex-col  space-y-2">
                    {!user ? (
                        <>
                            <Button variant="outline" asChild>
                                <Link href={route("login")}>{t("Log in")}</Link>
                            </Button>
                            <Button asChild>
                                <Link href={route("register")}>
                                    {t("Register")}
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" asChild>
                                <Link href={route("profile.edit")}>
                                    {t("Profile")}
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={route("logout")}>
                                    {t("Log out")}
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AccountIcon;
