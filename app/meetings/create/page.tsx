"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import { mockUsers } from "@/lib/mock-data";

export default function CreateMeetingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: [] as string[],
    agendaItems: [] as Array<{ title: string; description: string; duration: number }>,
    documents: [] as string[]
  });

  const [agendaPrompt, setAgendaPrompt] = useState("");
  const [isGeneratingAgenda, setIsGeneratingAgenda] = useState(false);

  const handleGenerateAgenda = () => {
    setIsGeneratingAgenda(true);
    // Simulate AI generation
    setTimeout(() => {
      setFormData({
        ...formData,
        agendaItems: [
          { title: "Báo cáo tiến độ", description: "Cập nhật tiến độ dự án", duration: 30 },
          { title: "Thảo luận vấn đề", description: "Giải quyết các vấn đề phát sinh", duration: 45 },
          { title: "Kế hoạch tiếp theo", description: "Đề xuất và quyết định kế hoạch", duration: 30 }
        ]
      });
      setIsGeneratingAgenda(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation
    router.push("/meetings");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-[#e3f2fd]">Tạo Cuộc họp Mới</h1>
        <p className="text-[#bbdefb] font-medium">
          Sử dụng AI để tạo cuộc họp và agenda tự động
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề cuộc họp *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Họp Ban Lãnh đạo tháng 10"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  placeholder="Mô tả về cuộc họp..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Ngày *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Giờ bắt đầu *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Giờ kết thúc *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2: AI Agenda Generator */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <h2 className="text-xl font-semibold">AI Agenda Generator</h2>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="agendaPrompt">Nhập chủ đề để AI tạo agenda tự động</Label>
                <div className="flex gap-2">
                  <Input
                    id="agendaPrompt"
                    value={agendaPrompt}
                    onChange={(e) => setAgendaPrompt(e.target.value)}
                    placeholder="Ví dụ: Họp đánh giá kết quả kinh doanh và kế hoạch tháng tới"
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateAgenda}
                    disabled={isGeneratingAgenda || !agendaPrompt}
                  >
                    {isGeneratingAgenda ? "Đang tạo..." : "Tạo Agenda"}
                  </Button>
                </div>
              </div>

              {formData.agendaItems.length > 0 && (
                <div className="space-y-2">
                  <Label>Agenda đã tạo:</Label>
                  {formData.agendaItems.map((item, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-sm text-[#bbdefb]">{item.description}</div>
                          <Badge variant="outline" className="mt-2">
                            {item.duration} phút
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              agendaItems: formData.agendaItems.filter((_, i) => i !== idx)
                            });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Step 3: Participants */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                3
              </div>
              <h2 className="text-xl font-semibold">Người tham dự</h2>
            </div>

            <div className="space-y-2">
              {mockUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-[#bbdefb]">{user.department}</div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={formData.participants.includes(user.id) ? "default" : "outline"}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        participants: formData.participants.includes(user.id)
                          ? formData.participants.filter(id => id !== user.id)
                          : [...formData.participants, user.id]
                      });
                    }}
                  >
                    {formData.participants.includes(user.id) ? "Đã chọn" : "Chọn"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Step 4: Documents */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                4
              </div>
              <h2 className="text-xl font-semibold">Tài liệu liên quan</h2>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                AI đề xuất
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-[#bbdefb]">
                AI sẽ tự động tìm và đề xuất tài liệu liên quan từ các cuộc họp trước
              </p>
              <div className="border-2 border-dashed border-[#64b5f6]/30 rounded-md p-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-2 text-[#90caf9]" />
                <p className="text-sm text-[#bbdefb]">
                  Tài liệu sẽ được đề xuất sau khi tạo cuộc họp
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Hủy
            </Button>
            <Button type="submit">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Tạo cuộc họp
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

