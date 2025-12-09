"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  FileText,
  Lightbulb,
  Search
} from "lucide-react";
import { mockMeetings, mockInsights } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatSubmit = () => {
    if (!chatQuery.trim()) return;

    const userMessage = chatQuery;
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatQuery("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerQuery = userMessage.toLowerCase();

      if (lowerQuery.includes("quyết định") || lowerQuery.includes("decision")) {
        response = "Trong tháng 10, các quyết định lớn của Khối Tín Dụng bao gồm:\n\n1. Phê duyệt mục tiêu doanh thu tháng 11: 18 tỷ đồng\n2. Tăng ngân sách marketing lên 20%\n3. Triển khai dự án số hóa hệ thống\n4. Mở rộng thị trường ra 3 tỉnh mới\n\nTất cả các quyết định này đã được ghi nhận trong biên bản các cuộc họp tương ứng.";
      } else if (lowerQuery.includes("action") || lowerQuery.includes("việc")) {
        response = "Tổng hợp Action Items trong tháng 10:\n\n• Hoàn thành mục tiêu doanh thu 18 tỷ đồng (Trần Thị B - Deadline: 30/11)\n• Tăng ngân sách marketing lên 20% (Phạm Thị D - Deadline: 25/10)\n• Báo cáo tiến độ dự án số hóa (Lê Văn C - Deadline: 15/11)\n• Lập kế hoạch mở rộng thị trường (Nguyễn Văn A - Deadline: 20/11)\n\nTỷ lệ hoàn thành hiện tại: 65%";
      } else if (lowerQuery.includes("chủ đề") || lowerQuery.includes("topic")) {
        response = "Các chủ đề họp nổi bật trong tháng 10:\n\n1. Kết quả kinh doanh (35% thời gian)\n2. Kế hoạch và chiến lược (40% thời gian)\n3. Marketing và mở rộng thị trường (25% thời gian)\n\nCác chủ đề này xuất hiện thường xuyên trong các cuộc họp Ban Lãnh đạo và Khối Tín Dụng.";
      } else {
        response = "Dựa trên dữ liệu từ tất cả các cuộc họp, tôi có thể cung cấp thông tin về:\n\n• Các quyết định quan trọng\n• Action Items và tiến độ\n• Chủ đề họp nổi bật\n• Phân tích người tham dự\n• Xu hướng và đề xuất\n\nBạn muốn tìm hiểu về điều gì cụ thể?";
      }

      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-[#90caf9]" />
          <h1 className="text-3xl font-bold text-[#e3f2fd]">AI Analytics</h1>
        </div>
        <p className="text-[#bbdefb] font-medium">
          Phân tích sâu dữ liệu cuộc họp và Chat với Toàn bộ Dữ liệu
        </p>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="insights">Meeting Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="chat">Chat với Dữ liệu</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Topics Analysis */}
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#64b5f6]" />
                <h3 className="text-lg font-semibold text-[#e3f2fd]">Chủ đề Họp Nổi bật</h3>
              </div>
              <div className="space-y-3">
                {mockInsights
                  .filter(i => i.type === 'topic')
                  .map(insight => (
                    <div key={insight.id} className="space-y-2">
                      {insight.data.topics.map((topic: string, idx: number) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{topic}</span>
                            <span className="text-sm text-muted-foreground">
                              {insight.data.weights[idx]}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${insight.data.weights[idx]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </Card>

            {/* Speaker Analysis */}
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#64b5f6]" />
                <h3 className="text-lg font-semibold text-[#e3f2fd]">Phân tích Người Nói</h3>
              </div>
              <div className="space-y-3">
                {mockInsights
                  .filter(i => i.type === 'speaker')
                  .map(insight => (
                    <div key={insight.id} className="space-y-3">
                      {insight.data.speakers.map((speaker: any, idx: number) => (
                        <div key={idx} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{speaker.user.name}</span>
                            <Badge variant="outline">{speaker.percentage}%</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Thời gian nói: {speaker.speakingTime} phút
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${speaker.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </Card>

            {/* Meeting Trends */}
            <Card className="p-6 lg:col-span-2 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#64b5f6]" />
                <h3 className="text-lg font-semibold text-[#e3f2fd]">Xu hướng Action Items</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold mb-1">389</div>
                  <div className="text-sm text-muted-foreground">Tổng Action Items</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold mb-1">2.5</div>
                  <div className="text-sm text-muted-foreground">Trung bình/Cuộc họp</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Tỷ lệ hoàn thành</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-[#64b5f6]" />
                <h3 className="text-lg font-semibold text-[#e3f2fd]">Đề xuất Tối ưu hóa</h3>
                <Badge variant="secondary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-semibold mb-1">Cuộc họp nên tổ chức định kỳ</h4>
                  <p className="text-sm text-muted-foreground">
                    "Họp Ban Lãnh đạo" nên được tổ chức hàng tháng vào ngày 15. Dựa trên lịch sử, 
                    cuộc họp này có tỷ lệ hoàn thành action items cao nhất (92%).
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold mb-1">Tài liệu nên xem xét trước cuộc họp</h4>
                  <p className="text-sm text-muted-foreground">
                    Trước "Họp đánh giá kết quả kinh doanh", nên xem lại:
                    • Báo cáo tháng trước
                    • Kế hoạch đã đề ra
                    • Action items chưa hoàn thành
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-semibold mb-1">Gợi ý tài liệu liên quan</h4>
                  <p className="text-sm text-muted-foreground">
                    Từ các cuộc họp tương tự, hệ thống đề xuất các tài liệu:
                    • Báo cáo kết quả kinh doanh tháng 9.pdf
                    • Kế hoạch marketing Q4.docx
                    • Biên bản họp Ban Lãnh đạo tháng 9.pdf
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#64b5f6]" />
                <h3 className="text-lg font-semibold text-[#e3f2fd]">Phân tích Hiệu quả</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Cuộc họp hiệu quả nhất</span>
                  <span className="font-semibold">Họp Ban Lãnh đạo tháng 10</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Thời gian trung bình/cuộc họp</span>
                  <span className="font-semibold">1.5 giờ</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Action items/cuộc họp (trung bình)</span>
                  <span className="font-semibold">2.5</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-[#64b5f6]" />
              <h3 className="text-lg font-semibold text-[#e3f2fd]">Chat với Toàn bộ Dữ liệu Cuộc họp</h3>
              <Badge variant="secondary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Hỏi bất kỳ câu hỏi nào về dữ liệu cuộc họp. Ví dụ: "Trong tháng 10, các quyết định lớn của Khối Tín Dụng là gì?"
            </p>

            {/* Chat History */}
            <div className="border rounded-lg p-4 mb-4 h-[400px] overflow-y-auto space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Bắt đầu trò chuyện với AI về dữ liệu cuộc họp</p>
                </div>
              ) : (
                chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Hỏi về dữ liệu cuộc họp..."
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                disabled={isLoading}
              />
              <Button onClick={handleChatSubmit} disabled={isLoading || !chatQuery.trim()}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

