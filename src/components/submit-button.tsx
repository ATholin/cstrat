"use client"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./ui/button"
import { PropsWithChildren } from "react"
import Spinner from "./spinner"
import { cn } from "~/lib/utils"

export default function SubmitButton({ className, disabled, ...props }: PropsWithChildren<ButtonProps>) {
    const { pending } = useFormStatus()

    const { variant = 'default' } = props

    return (
        <Button disabled={disabled ?? pending} className={cn(className, "space-x-2")} {...props}>
            <p>{props.children ?? "Submit"}</p>
            {pending && <Spinner className={cn({
                ['text-secondary']: true,
                ['text-primary']: variant === 'outline',
            })} />}
        </Button>
    )
}