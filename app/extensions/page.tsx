"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video,
  Chrome,
  Sparkles,
  FileText,
  MessageSquare,
  Lightbulb,
  Download
} from "lucide-react";

export default function ExtensionsPage() {
  const extensions = [
    {
      name: "Zoom Extension",
      platform: "Zoom",
      description: "Tích hợp COPILOT MEETING vào Zoom để sử dụng AI trong cuộc họp",
      features: [
        "Truy cập nhanh tài liệu & dữ liệu",
        "Hỏi đáp trực tiếp với AI Co-pilot",
        "Gợi ý câu trả lời/dữ liệu theo ngữ cảnh",
        "Live transcript và summary"
      ],
      icon: Video,
      status: "available"
    },
    {
      name: "Google Meet Extension",
      platform: "Google Meet",
      description: "Tích hợp COPILOT MEETING vào Google Meet",
      features: [
        "Truy cập nhanh tài liệu & dữ liệu",
        "Hỏi đáp trực tiếp với AI Co-pilot",
        "Gợi ý câu trả lời/dữ liệu theo ngữ cảnh",
        "Live transcript và summary"
      ],
      icon: Video,
      status: "available"
    },
    {
      name: "Chrome Extension",
      platform: "Chrome Browser",
      description: "Tiện ích mở rộng cho trình duyệt Chrome",
      features: [
        "Truy cập nhanh từ thanh công cụ",
        "Đồng bộ với lịch Google Calendar",
        "Thông báo cuộc họp sắp tới",
        "Truy cập nhanh biên bản và action items"
      ],
      icon: Chrome,
      status: "coming-soon"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-[#90caf9]" />
          <h1 className="text-3xl font-bold text-[#e3f2fd]">Extension & Add-on</h1>
        </div>
        <p className="text-[#bbdefb] font-medium">
          Tích hợp COPILOT MEETING vào các nền tảng họp trực tuyến
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {extensions.map((extension, idx) => {
          const Icon = extension.icon;
          return (
            <Card key={idx} className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 hover:shadow-lg smooth-hover cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{extension.name}</h3>
                      <p className="text-sm text-muted-foreground">{extension.platform}</p>
                    </div>
                  </div>
                  {extension.status === 'available' ? (
                    <Badge variant="default">Có sẵn</Badge>
                  ) : (
                    <Badge variant="secondary">Sắp ra mắt</Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{extension.description}</p>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Tính năng:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {extension.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Sparkles className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full" 
                  disabled={extension.status !== 'available'}
                  variant={extension.status === 'available' ? 'default' : 'outline'}
                >
                  {extension.status === 'available' ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Cài đặt
                    </>
                  ) : (
                    'Sắp ra mắt'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Features Detail */}
      <div className="space-y-6">
        <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
          <h2 className="text-2xl font-semibold mb-4 text-[#e3f2fd]">Tính năng Extension</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Truy cập nhanh Tài liệu & Dữ liệu</h3>
                  <p className="text-sm text-muted-foreground">
                    Cho phép người dùng truy cập nhanh các tài liệu, báo cáo, hoặc lịch sử các cuộc họp tương tự 
                    đã được tổng hợp mà không cần rời màn hình họp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hỏi đáp trực tiếp (In-meeting Q&A)</h3>
                  <p className="text-sm text-muted-foreground">
                    Đóng vai trò là kênh giao tiếp trực tiếp với Trợ lý AI. Cho phép hỏi đáp, tổng hợp thông tin, 
                    hoặc trích xuất dữ liệu liên quan ngay trong phiên họp.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Gợi ý Câu trả lời / Dữ liệu</h3>
                  <p className="text-sm text-muted-foreground">
                    Dựa trên ngữ cảnh cuộc họp (transcript theo thời gian thực), AI tự động gợi ý các câu trả lời khả thi, 
                    dữ liệu lịch sử liên quan, hoặc các quyết định đã đưa ra trước đó để người tham dự có thông tin tức thì khi cần phát biểu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Tích hợp Seamless</h3>
                  <p className="text-sm text-muted-foreground">
                    Extension tự động tích hợp vào giao diện cuộc họp, không làm gián đoạn trải nghiệm người dùng. 
                    Cửa sổ pop-up truy cập nhanh có thể ẩn/hiện theo nhu cầu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

