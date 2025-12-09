"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  Users,
  Share2,
  PhoneOff,
  ChevronRight,
  ChevronLeft,
  Download,
  Send,
  Eye,
  EyeOff
} from "lucide-react";
import { mockMeetings, mockUsers } from "@/lib/mock-data";
import Link from "next/link";

export default function LiveMeetingPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const pathname = usePathname();
  const [meetingId, setMeetingId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [isExtensionOpen, setIsExtensionOpen] = useState(true);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ role: 'user' | 'ai', message: string, timestamp: string }>>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        let id = "";
        if (params && typeof params === 'object' && 'then' in params) {
          const resolved = await params;
          id = resolved.id;
        } else if (params && typeof params === 'object' && 'id' in params) {
          id = (params as { id: string }).id;
        }
        
        if (!id && pathname) {
          const pathParts = pathname.split('/');
          id = pathParts[pathParts.length - 2] === 'live' ? pathParts[pathParts.length - 3] : pathParts[pathParts.length - 1];
        }
        
        setMeetingId(id);
      } catch (error) {
        console.error('Error resolving params:', error);
        if (pathname) {
          const pathParts = pathname.split('/');
          setMeetingId(pathParts[pathParts.length - 2] === 'live' ? pathParts[pathParts.length - 3] : pathParts[pathParts.length - 1]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    resolveParams();
  }, [params, pathname]);

  const meeting = mockMeetings.find(m => m.id === meetingId);

  // Initialize transcript from meeting data
  useEffect(() => {
    if (meeting?.transcript) {
      setTranscript(meeting.transcript);
    }
  }, [meeting]);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Simulate real-time transcript updates
  useEffect(() => {
    if (isRecording && meeting) {
      const interval = setInterval(() => {
        const newEntry = {
          id: `t${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          speaker: meeting.participants[Math.floor(Math.random() * meeting.participants.length)],
          text: "Đây là một câu nói mẫu được AI detect và chuyển đổi thành text trong thời gian thực...",
          sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative'
        };
        setTranscript(prev => [...prev, newEntry]);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isRecording, meeting]);

  const handleAskAI = () => {
    if (!aiQuery.trim()) return;
    
    const userMessage = {
      role: 'user' as const,
      message: aiQuery,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setAiChatHistory(prev => [...prev, userMessage]);
    setAiQuery("");
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      const query = aiQuery.toLowerCase();
      
      if (query.includes("tổng hợp") || query.includes("tóm tắt")) {
        aiResponse = "Dựa trên transcript hiện tại, cuộc họp đang thảo luận về kết quả kinh doanh và kế hoạch tháng tới. Có 2 quyết định quan trọng và 3 action items đã được xác định.";
      } else if (query.includes("action") || query.includes("hành động")) {
        aiResponse = `Hiện có ${meeting?.actionItems?.length || 0} action items:\n${meeting?.actionItems?.map((ai, idx) => `${idx + 1}. ${ai.title} - ${ai.assignedTo.name} (Deadline: ${ai.deadline})`).join('\n') || 'Chưa có action items'}`;
      } else if (query.includes("quyết định") || query.includes("decision")) {
        aiResponse = `Các quyết định đã được đưa ra:\n${meeting?.summary?.decisions.map((d, idx) => `${idx + 1}. ${d}`).join('\n') || 'Chưa có quyết định nào'}`;
      } else if (query.includes("người tham dự") || query.includes("participant")) {
        aiResponse = `Danh sách người tham dự:\n${meeting?.participants.map((p, idx) => `${idx + 1}. ${p.name} - ${p.department}`).join('\n') || 'Chưa có thông tin'}`;
      } else {
        aiResponse = "Tôi đã hiểu câu hỏi của bạn. Dựa trên ngữ cảnh cuộc họp, đây là thông tin liên quan...";
      }
      
      const aiMessage = {
        role: 'ai' as const,
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setAiChatHistory(prev => [...prev, aiMessage]);
    }, 1000);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
  }

  if (!meeting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">Cuộc họp không tồn tại</div>
          <div className="text-sm text-muted-foreground">ID: {meetingId || 'undefined'}</div>
        </div>
      </div>
    );
  }

  // Calculate grid layout for video participants
  const participantCount = meeting.participants.length;
  const getGridCols = () => {
    if (participantCount <= 1) return "grid-cols-1";
    if (participantCount <= 4) return "grid-cols-2";
    if (participantCount <= 9) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="h-screen flex flex-col bg-[#202124] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2e30] border-b border-[#3c4043]">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-[#e8eaed]">{meeting.title}</h1>
          <div className="flex items-center gap-2 text-sm text-[#9aa0a6]">
            <Clock className="w-4 h-4" />
            <span>{meeting.startTime} - {meeting.endTime}</span>
          </div>
          {isRecording && (
            <Badge variant="destructive" className="bg-red-600">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
              Đang ghi âm
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExtensionOpen(!isExtensionOpen)}
            className="text-[#e8eaed] hover:bg-[#3c4043]"
          >
            {isExtensionOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Call Area */}
        <div className={`flex-1 flex flex-col ${isExtensionOpen ? '' : ''}`}>
          {/* Video Grid */}
          <div className={`flex-1 grid ${getGridCols()} gap-2 p-2 overflow-auto`}>
            {meeting.participants.map((participant, idx) => (
              <div
                key={participant.id}
                className="relative bg-[#3c4043] rounded-lg overflow-hidden aspect-video flex items-center justify-center"
              >
                {isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#64b5f6]/20 to-[#1976d2]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-[#64b5f6]/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-semibold text-[#64b5f6]">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-[#e8eaed]">{participant.name}</div>
                      <div className="text-xs text-[#9aa0a6]">{participant.department}</div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#3c4043] flex items-center justify-center">
                    <VideoOff className="w-12 h-12 text-[#9aa0a6]" />
                  </div>
                )}
                {/* Mic indicator */}
                <div className="absolute bottom-2 left-2">
                  {isMicOn ? (
                    <div className="w-8 h-8 rounded-full bg-[#34a853] flex items-center justify-center">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#ea4335] flex items-center justify-center">
                      <MicOff className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="bg-[#2d2e30] border-t border-[#3c4043] px-4 py-3 flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsMicOn(!isMicOn)}
              className={`rounded-full ${isMicOn ? 'bg-[#3c4043] hover:bg-[#3c4043]' : 'bg-[#ea4335] hover:bg-[#ea4335]'} text-white`}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`rounded-full ${isVideoOn ? 'bg-[#3c4043] hover:bg-[#3c4043]' : 'bg-[#ea4335] hover:bg-[#ea4335]'} text-white`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full bg-[#3c4043] hover:bg-[#3c4043] text-white"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="rounded-full bg-[#ea4335] hover:bg-[#ea4335] text-white"
            >
              <Link href={`/meetings/${meeting.id}`}>
                <PhoneOff className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Extension Panel */}
        {isExtensionOpen && (
          <div className="w-96 bg-[#2d2e30] border-l border-[#3c4043] flex flex-col">
            <Tabs defaultValue="transcript" className="flex-1 flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#202124] rounded-none border-b border-[#3c4043]">
                <TabsTrigger value="transcript" className="text-xs">Transcript</TabsTrigger>
                <TabsTrigger value="documents" className="text-xs">Tài liệu</TabsTrigger>
                <TabsTrigger value="chat" className="text-xs">AI Chat</TabsTrigger>
              </TabsList>

              {/* Transcript Tab */}
              <TabsContent value="transcript" className="flex-1 flex flex-col m-0 p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#64b5f6]" />
                    <span className="text-sm font-semibold text-[#e8eaed]">AI Transcript</span>
                  </div>
                  <Badge variant="secondary" className="bg-[#34a853] text-white text-xs">
                    Live
                  </Badge>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {transcript.map((entry) => (
                    <div key={entry.id} className="border-l-2 border-[#64b5f6] pl-3 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#64b5f6]">{entry.speaker.name}</span>
                        <span className="text-xs text-[#9aa0a6]">{entry.timestamp}</span>
                        {entry.sentiment && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              entry.sentiment === 'positive' ? 'border-green-500 text-green-500' :
                              entry.sentiment === 'negative' ? 'border-red-500 text-red-500' :
                              'border-gray-500 text-gray-500'
                            }`}
                          >
                            {entry.sentiment === 'positive' ? 'Tích cực' : 
                             entry.sentiment === 'negative' ? 'Tiêu cực' : 'Trung tính'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#e8eaed]">{entry.text}</p>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="flex-1 flex flex-col m-0 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#64b5f6]" />
                  <span className="text-sm font-semibold text-[#e8eaed]">Tài liệu liên quan</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {meeting.documents && meeting.documents.length > 0 ? (
                    meeting.documents.map((doc) => (
                      <Card key={doc.id} className="p-3 bg-[#3c4043] border-[#3c4043]">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-[#64b5f6]" />
                              <span className="text-sm font-medium text-[#e8eaed]">{doc.name}</span>
                            </div>
                            <div className="text-xs text-[#9aa0a6]">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.uploadedBy.name}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#64b5f6] hover:text-[#90caf9]">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-[#9aa0a6] text-sm">
                      Chưa có tài liệu nào
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* AI Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#64b5f6]" />
                  <span className="text-sm font-semibold text-[#e8eaed]">Chat với AI</span>
                  <Badge variant="secondary" className="bg-[#64b5f6] text-white text-xs ml-auto">
                    <Eye className="w-3 h-3 mr-1" />
                    Riêng tư
                  </Badge>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2">
                  {aiChatHistory.length === 0 ? (
                    <div className="space-y-2">
                      <div className="text-xs text-[#9aa0a6] mb-2">Gợi ý câu hỏi:</div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left text-xs bg-[#3c4043] border-[#3c4043] text-[#e8eaed] hover:bg-[#3c4043]"
                        onClick={() => setAiQuery("Tổng hợp lại các điểm chính của cuộc họp")}
                      >
                        Tổng hợp lại các điểm chính của cuộc họp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left text-xs bg-[#3c4043] border-[#3c4043] text-[#e8eaed] hover:bg-[#3c4043]"
                        onClick={() => setAiQuery("Gợi ý 3 câu hỏi tiếp theo")}
                      >
                        Gợi ý 3 câu hỏi tiếp theo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left text-xs bg-[#3c4043] border-[#3c4043] text-[#e8eaed] hover:bg-[#3c4043]"
                        onClick={() => setAiQuery("Liệt kê các action items")}
                      >
                        Liệt kê các action items
                      </Button>
                    </div>
                  ) : (
                    aiChatHistory.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-2 ${
                            chat.role === 'user'
                              ? 'bg-[#64b5f6] text-white'
                              : 'bg-[#3c4043] text-[#e8eaed]'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                          <span className="text-xs opacity-70 mt-1 block">{chat.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Hỏi AI bất cứ điều gì..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                    className="bg-[#3c4043] border-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6]"
                  />
                  <Button
                    onClick={handleAskAI}
                    disabled={!aiQuery.trim()}
                    className="bg-[#64b5f6] hover:bg-[#90caf9] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-[#9aa0a6]">
                  <EyeOff className="w-3 h-3" />
                  <span>Tất cả cuộc trò chuyện AI đều riêng tư và chỉ bạn mới thấy</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
