import { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type Props = {
    children?: React.ReactNode;
};

export function TypographyP({ children, ...props }: Props & HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}>{children}</p>
    )
}

export function TypographyLarge({ children, ...props }: Props & HTMLAttributes<HTMLParagraphElement>) {
    return (
        <div {...props} className={cn("text-lg font-semibold", props.className)}>{children}</div>
    )
}

export function TypographyMuted({ children, ...props }: Props & HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p {...props} className={cn("text-sm text-muted-foreground", props.className)}>{children}</p>
    )
}

export function TypographyH1({ children, ...props }: Props & HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 {...props} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", props.className)}>
            {children}
        </h1>
    )
}

export function TypographyH2({ children, ...props }: Props & HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 {...props} className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", props.className)}>
            {children}
        </h2>
    )
}

export function TypographyH3({ children, ...props }: Props & HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", props.className)}>
            {children}
        </h3>
    )
}

export function TypographyHeading({ children, ...props }: Props & HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 {...props} className={cn("font-heading text-3xl md:text-4xl", props.className)}>
            {children}
        </h1>
    )
}