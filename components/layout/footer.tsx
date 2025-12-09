import { Heading5, SmallText } from "@/components/typography"

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  columns: FooterColumn[]
  copyright?: string
}

export function Footer({ columns, copyright }: FooterProps) {
  return (
    <footer className="w-full border-t border-border bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <Heading5>{column.title}</Heading5>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {copyright && (
          <div className="border-t border-border pt-8">
            <SmallText className="text-center">{copyright}</SmallText>
          </div>
        )}
      </div>
    </footer>
  )
}
