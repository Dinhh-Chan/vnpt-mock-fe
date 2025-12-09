import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Video, 
  FileText, 
  BarChart3, 
  Brain, 
  Shield,
  Clock,
  Users,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Trước cuộc họp",
      description: "Tạo lịch, Agenda tự động, Chuẩn bị tài liệu",
      href: "/meetings/create",
      color: "text-blue-600"
    },
    {
      icon: Video,
      title: "Trong cuộc họp",
      description: "Ghi transcript, Tóm tắt trực tuyến, Action Items, Co-pilot AI",
      href: "/meetings/live",
      color: "text-green-600"
    },
    {
      icon: FileText,
      title: "Sau cuộc họp",
      description: "Biên bản tự động, Phê duyệt, Đồng bộ Task, Báo cáo",
      href: "/minutes",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Quản trị & Bảo mật",
      description: "RBAC, Mã hóa AES-256, Audit Log, Chính sách bảo mật",
      href: "/admin",
      color: "text-red-600"
    },
    {
      icon: BarChart3,
      title: "Phân tích AI",
      description: "Meeting Insights, Recommendations, Chat với dữ liệu",
      href: "/analytics",
      color: "text-orange-600"
    },
    {
      icon: Sparkles,
      title: "Extension & Add-on",
      description: "Tích hợp Zoom/Google Meet, Gợi ý thông minh",
      href: "/extensions",
      color: "text-pink-600"
    }
  ];

  const stats = [
    { label: "Cuộc họp đã tổ chức", value: "156", icon: Video },
    { label: "Biên bản đã tạo", value: "142", icon: FileText },
    { label: "Action Items", value: "389", icon: CheckCircle2 },
    { label: "Thời gian tiết kiệm", value: "240h", icon: Clock }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a1929] via-[#1a237e] to-[#0d47a1] animate-gradient -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,181,246,0.1),transparent_50%)] -z-10" />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-gradient">
            COPILOT MEETING
          </h1>
          <p className="text-xl text-[#e3f2fd] max-w-2xl mx-auto font-medium">
            Trợ lý Cuộc họp ứng dụng Trí tuệ Nhân tạo toàn diện
            <br />
            Tối ưu hóa quy trình họp từ Trước → Trong → Sau cuộc họp
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/meetings/create">Tạo cuộc họp mới</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/meetings">Xem tất cả cuộc họp</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6 text-center border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover cursor-pointer">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#64b5f6] hover:text-[#90caf9] smooth-hover" />
              <div className="text-3xl font-bold mb-1 text-[#e3f2fd]">{stat.value}</div>
              <div className="text-sm text-[#bbdefb] font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover cursor-pointer group">
                <Link href={feature.href} className="block">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#64b5f6]/20 to-[#1976d2]/20 flex items-center justify-center group-hover:scale-110 smooth-hover">
                      <Icon className={`w-6 h-6 text-[#64b5f6] group-hover:text-[#90caf9] smooth-hover`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-[#e3f2fd] group-hover:text-[#90caf9] smooth-hover">
                        {feature.title}
                      </h3>
                      <p className="text-[#bbdefb]">
                        {feature.description}
                      </p>
                    </div>
                    <Button variant="ghost" className="w-full group-hover:text-[#64b5f6] smooth-hover">
                      Khám phá →
                    </Button>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
