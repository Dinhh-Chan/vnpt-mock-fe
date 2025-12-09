"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info, Search, ArrowRight, Plus, Settings } from "lucide-react"

export function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading1>Frontend Base Components</Heading1>
          <p className="text-muted-foreground text-lg">Bộ components tái sử dụng được - từ buttons đến tiêu đề</p>
        </div>

        {/* Typography Section */}
        <section className="space-y-6">
          <Heading2>Typography</Heading2>
          <div className="grid gap-4">
            <div>
              <Heading1>Heading 1 - H1</Heading1>
              <p className="text-sm text-muted-foreground">32px - Bold Title</p>
            </div>
            <div>
              <Heading2>Heading 2 - H2</Heading2>
              <p className="text-sm text-muted-foreground">28px - Section Title</p>
            </div>
            <div>
              <Heading3>Heading 3 - H3</Heading3>
              <p className="text-sm text-muted-foreground">24px - Subsection</p>
            </div>
            <div>
              <Heading4>Heading 4 - H4</Heading4>
              <p className="text-sm text-muted-foreground">20px - Small Title</p>
            </div>
            <div>
              <Heading5>Heading 5 - H5</Heading5>
              <p className="text-sm text-muted-foreground">16px - Label</p>
            </div>
            <div>
              <Heading6>Heading 6 - H6</Heading6>
              <p className="text-sm text-muted-foreground">14px - Small Label</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <Heading2>Buttons</Heading2>
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Tất cả các biến thể của button component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>

              <div className="mt-6 space-y-3">
                <Heading4>Sizes</Heading4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Heading4>With Icons</Heading4>
                <div className="flex flex-wrap gap-3">
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                  <Button variant="outline">
                    Settings
                    <Settings className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Heading4>States</Heading4>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <Heading2>Badges</Heading2>
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <Heading2>Cards</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>Đây là mô tả của card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Nội dung chính của card component với styling đầy đủ.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Action</CardTitle>
                <CardDescription>Card có button action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Bạn có thể thêm button hoặc element khác vào card.</p>
                <Button className="w-full">Thực hiện hành động</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-6">
          <Heading2>Alerts</Heading2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>Đây là alert thông tin - dùng để thông báo các thông tin quan trọng.</AlertDescription>
            </Alert>

            <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Thành công! Hành động của bạn đã hoàn tất.
              </AlertDescription>
            </Alert>

            <Alert className="border-destructive bg-destructive/5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Cảnh báo! Vui lòng kiểm tra lại thông tin trước khi tiếp tục.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Form Section */}
        <section className="space-y-6">
          <Heading2>Form Elements</Heading2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Ví dụ về form với input và labels</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên của bạn</Label>
                  <Input id="name" placeholder="Nhập tên của bạn" type="text" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="email@example.com" type="email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tin nhắn</Label>
                  <textarea
                    id="message"
                    placeholder="Viết tin nhắn của bạn tại đây..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit">
                    Gửi
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button type="reset" variant="outline">
                    Xóa
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <Heading2>Color Palette</Heading2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">Primary</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Brand Color</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground text-sm font-medium">Secondary</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground text-sm font-medium">Accent</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-destructive flex items-center justify-center">
                <span className="text-destructive-foreground text-sm font-medium">Destructive</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Error/Delete</p>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <div className="text-center py-12 border-t border-border">
          <Heading3>Sẵn sàng để sử dụng</Heading3>
          <p className="text-muted-foreground mt-2">
            Tất cả components đã được cấu hình và sẵn sàng để kế thừa và mở rộng
          </p>
        </div>
      </div>
    </div>
  )
}
