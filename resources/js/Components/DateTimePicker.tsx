import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
    DateValue,
    useButton,
    useDatePicker,
    useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";

import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/DateTimePicker/Calendar";
import { DateField } from "@/Components/DateTimePicker/DateField";
import { TimeField } from "@/Components/DateTimePicker/TimeField";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "./hooks/useForwardRef";

const DateTimePicker = React.forwardRef<
    HTMLDivElement,
    DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    const state = useDatePickerState(props);
    const {
        groupProps,
        fieldProps,
        buttonProps: _buttonProps,
        dialogProps,
        calendarProps,
    } = useDatePicker(props, state, ref);
    const { buttonProps } = useButton(_buttonProps, buttonRef);
    useInteractOutside({
        ref: contentRef,
        onInteractOutside: (e) => {
            setOpen(false);
        },
    });

    return (
        <div
            {...groupProps}
            ref={ref}
            className={cn(
                groupProps.className,
                "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            )}
        >
            <DateField {...fieldProps} />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        {...buttonProps}
                        variant="outline"
                        className="rounded-l-none"
                        disabled={props.isDisabled}
                        onClick={() => setOpen(true)}
                    >
                        <CalendarIcon className="h-5 w-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent ref={contentRef} className="w-full">
                    <div {...dialogProps} className="space-y-3">
                        <Calendar {...calendarProps} />
                        {!!state.hasTime && (
                            <TimeField
                                value={state.timeValue}
                                onChange={state.setTimeValue}
                            />
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
