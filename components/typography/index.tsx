import type React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function Heading1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight", "text-foreground", className)}>{children}</h1>
  )
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight", "text-foreground", className)}>{children}</h2>
  )
}

export function Heading3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("text-2xl md:text-3xl font-semibold tracking-tight", "text-foreground", className)}>
      {children}
    </h3>
  )
}

export function Heading4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn("text-xl md:text-2xl font-semibold tracking-tight", "text-foreground", className)}>{children}</h4>
  )
}

export function Heading5({ children, className }: TypographyProps) {
  return <h5 className={cn("text-lg font-semibold tracking-tight", "text-foreground", className)}>{children}</h5>
}

export function Heading6({ children, className }: TypographyProps) {
  return <h6 className={cn("text-base font-semibold tracking-tight", "text-foreground", className)}>{children}</h6>
}

export function Body({ children, className }: TypographyProps) {
  return <p className={cn("text-base leading-relaxed", "text-foreground", className)}>{children}</p>
}

export function SmallText({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}

export function Label({ children, className }: TypographyProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "text-foreground",
        className,
      )}
    >
      {children}
    </label>
  )
}
