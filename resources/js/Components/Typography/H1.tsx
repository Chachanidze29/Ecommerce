import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export interface H4Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function H1({ className, children }: PropsWithChildren<H4Props>) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl",
                className
            )}
        >
            {children}
        </h4>
    );
}

export default H1;
