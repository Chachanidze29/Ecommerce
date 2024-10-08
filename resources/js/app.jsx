import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LaravelReactI18nProvider } from "laravel-react-i18n";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const appLocale = import.meta.env.VITE_APP_LOCALE || "en";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                locale={localStorage.getItem("locale") || appLocale}
                files={import.meta.glob("/lang/*.json")}
            >
                <App {...props} />
            </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
