import { cn } from "@/lib/utils"
import type React from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "muted" | "primary"
}

export function Section({ children, className, variant = "default" }: SectionProps) {
  const variants = {
    default: "bg-background",
    muted: "bg-muted/50",
    primary: "bg-primary/5",
  }

  return <section className={cn("w-full py-12 md:py-16 lg:py-20", variants[variant], className)}>{children}</section>
}
