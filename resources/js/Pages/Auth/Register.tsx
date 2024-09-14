import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FormEventHandler, useEffect } from "react";

import { GoogleIcon } from "@/icons/GoogleIcon";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import FormInputText from "@/Components/FormInputs/FormInputText";
import MainLayout from "@/Layouts/MainLayout";

export default function Register() {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <MainLayout>
            <Head title={t("Register")} />

            <div className="flex grow items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t("Register")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <FormInputText
                                    id="name"
                                    type="text"
                                    label={t("Name")}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    autoComplete="name"
                                    error={errors.name}
                                />

                                <FormInputText
                                    id="email"
                                    type="email"
                                    label={t("Email")}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    autoComplete="email"
                                    error={errors.email}
                                />

                                <FormInputText
                                    id="password"
                                    type="password"
                                    label={t("Password")}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="new-password"
                                    error={errors.password}
                                />

                                <FormInputText
                                    id="password_confirmation"
                                    type="password"
                                    label={t("Confirm Password")}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    error={errors.password_confirmation}
                                />

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {t("Register")}
                                </Button>

                                <Link
                                    href=""
                                    // href={route("google.auth")}
                                    className="mt-2 w-full"
                                >
                                    <Button
                                        type="button"
                                        className="flex w-full items-center justify-center border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100"
                                        disabled={processing}
                                    >
                                        <GoogleIcon className="mr-3 h-6 w-6" />{" "}
                                        <span className="text-lg">
                                            {t("Sign up with Google")}
                                        </span>{" "}
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                {t("Already have an account?")}{" "}
                                <Link
                                    href={route("login")}
                                    className="underline"
                                >
                                    {t("Log in")}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
