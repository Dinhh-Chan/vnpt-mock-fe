"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  MessageSquare,
  FileText,
  CheckCircle2,
  Sparkles,
  Clock,
  Users
} from "lucide-react";
import { mockMeetings, mockUsers } from "@/lib/mock-data";

export default function LiveMeetingPage({ params }: { params: { id: string } }) {
  const meeting = mockMeetings.find(m => m.id === params.id);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(meeting?.transcript || []);
  const [liveSummary, setLiveSummary] = useState(meeting?.summary);
  const [actionItems, setActionItems] = useState(meeting?.actionItems || []);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Simulate real-time transcript updates
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        // Simulate new transcript entry
        const newEntry = {
          id: `t${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('vi-VN'),
          speaker: mockUsers[Math.floor(Math.random() * mockUsers.length)],
          text: "Đây là một câu nói mẫu được thêm vào transcript...",
          sentiment: 'neutral' as const
        };
        setTranscript(prev => [...prev, newEntry]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const handleAskAI = () => {
    if (!aiQuery) return;
    
    // Simulate AI response
    setAiResponse("Đang xử lý...");
    setTimeout(() => {
      if (aiQuery.toLowerCase().includes("tổng hợp")) {
        setAiResponse("Dựa trên transcript hiện tại, cuộc họp đang thảo luận về kết quả kinh doanh và kế hoạch tháng tới. Có 2 quyết định quan trọng và 3 action items đã được xác định.");
      } else if (aiQuery.toLowerCase().includes("action")) {
        setAiResponse(`Hiện có ${actionItems.length} action items:\n${actionItems.map((ai, idx) => `${idx + 1}. ${ai.title} - ${ai.assignedTo.name} (Deadline: ${ai.deadline})`).join('\n')}`);
      } else {
        setAiResponse("Tôi đã hiểu câu hỏi của bạn. Dựa trên ngữ cảnh cuộc họp, đây là thông tin liên quan...");
      }
    }, 1500);
  };

  if (!meeting) {
    return <div className="container mx-auto px-4 py-8">Cuộc họp không tồn tại</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meeting Header */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{meeting.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {meeting.startTime} - {meeting.endTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {meeting.participants.length} người tham dự
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Dừng ghi âm
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Bắt đầu ghi âm
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Bật camera
                </Button>
              </div>
            </div>

            {isRecording && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-red-700">Đang ghi âm và transcript...</span>
              </div>
            )}
          </Card>

          {/* Live Transcript */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transcript thời gian thực</h2>
              <Badge variant="secondary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Voice-to-Text
              </Badge>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {transcript.map((entry) => (
                <div key={entry.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{entry.speaker.name}</span>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                    {entry.sentiment && (
                      <Badge variant="outline" className="text-xs">
                        {entry.sentiment === 'positive' ? 'Tích cực' : 
                         entry.sentiment === 'negative' ? 'Tiêu cực' : 'Trung tính'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{entry.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Co-pilot */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">AI Co-pilot</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Hỏi AI: 'Tổng hợp lại giúp tôi'..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                />
                <Button 
                  className="w-full mt-2" 
                  onClick={handleAskAI}
                  disabled={!aiQuery}
                >
                  Hỏi AI
                </Button>
              </div>
              {aiResponse && (
                <div className="bg-muted p-3 rounded-md text-sm">
                  {aiResponse}
                </div>
              )}
            </div>
          </Card>

          {/* Live Summary */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Tóm tắt trực tuyến</h2>
              <Badge variant="secondary">Live</Badge>
            </div>
            <Tabs defaultValue="keypoints">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="keypoints">Điểm chính</TabsTrigger>
                <TabsTrigger value="decisions">Quyết định</TabsTrigger>
                <TabsTrigger value="actions">Action Items</TabsTrigger>
              </TabsList>
              <TabsContent value="keypoints" className="space-y-2">
                {liveSummary?.keyPoints.map((point, idx) => (
                  <div key={idx} className="text-sm p-2 bg-muted rounded">
                    • {point}
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="decisions" className="space-y-2">
                {liveSummary?.decisions.map((decision, idx) => (
                  <div key={idx} className="text-sm p-2 bg-muted rounded">
                    ✓ {decision}
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="actions" className="space-y-2">
                {actionItems.map((item) => (
                  <div key={item.id} className="text-sm p-2 bg-muted rounded">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.assignedTo.name} • {item.deadline}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thao tác nhanh</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Gửi tin nhắn
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Xem tài liệu
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Quản lý Action Items
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


