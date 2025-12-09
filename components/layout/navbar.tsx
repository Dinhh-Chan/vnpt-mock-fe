"use client"

import { Button } from "@/components/ui/button"
import { Heading4 } from "@/components/typography"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo: string
  links: NavLink[]
}

export function Navbar({ logo, links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#64b5f6]/20 bg-[rgba(10,25,41,0.9)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(10,25,41,0.8)] smooth-hover">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Heading4>{logo}</Heading4>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1">
          {links.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-2 space-y-2">
            {links.map((link) => (
              <Button key={link.href} variant="ghost" className="w-full justify-start" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
