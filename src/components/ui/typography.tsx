type Props = {
    children?: React.ReactNode;
};

export function TypographyP({ children }: Props) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    )
}

export function TypographyLarge({ children }: Props) {
    return (
        <div className="text-lg font-semibold">{children}</div>
    )
}

export function TypographyMuted({ children }: Props) {
    return (
        <p className="text-sm text-muted-foreground">{children}</p>
    )
}

export function TypographyH1({ children }: Props) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    )
}

export function TypographyH2({ children }: Props) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {children}
        </h2>
    )
}

export function TypographyH3({ children }: Props) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    )
}

export function TypographyHeading({ children }: Props) {
    return (
        <h1 className="font-heading text-3xl md:text-4xl">
            {children}
        </h1>
    )
}