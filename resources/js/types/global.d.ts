import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
