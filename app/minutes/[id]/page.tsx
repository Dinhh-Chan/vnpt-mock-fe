"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  CheckCircle2,
  Clock,
  User,
  Download,
  Edit,
  Sparkles,
  Users,
  Calendar
} from "lucide-react";
import { mockMeetings } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function MinutesDetailPage({ params, searchParams }: { 
  params: { id: string };
  searchParams: { edit?: string; download?: string };
}) {
  const meeting = mockMeetings.find(m => m.id === params.id);
  const [isEditing, setIsEditing] = useState(searchParams.edit === 'true');

  if (!meeting || !meeting.minutes) {
    return <div className="container mx-auto px-4 py-8">Biên bản không tồn tại</div>;
  }

  const minutes = meeting.minutes;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{meeting.title}</h1>
            <Badge variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          </div>
          <p className="text-muted-foreground">{meeting.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Xem' : 'Chỉnh sửa'}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Tải xuống
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="approval">Phê duyệt</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card className="p-6">
            {isEditing ? (
              <textarea
                className="w-full min-h-[600px] p-4 border rounded-md font-mono text-sm"
                defaultValue={minutes.content}
              />
            ) : (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{minutes.content}</div>
              </div>
            )}
            {isEditing && (
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button>
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="transcript">
          <Card className="p-6">
            <div className="space-y-4">
              {meeting.transcript?.map((entry) => (
                <div key={entry.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{entry.speaker.name}</span>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm">{entry.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <Card className="p-6">
            <div className="space-y-4">
              {meeting.actionItems?.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Badge variant={
                      item.status === 'completed' ? 'default' :
                      item.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {item.status === 'completed' ? 'Hoàn thành' :
                       item.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.assignedTo.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Deadline: {format(new Date(item.deadline), "dd/MM/yyyy", { locale: vi })}
                    </div>
                    <Badge variant="outline">
                      {item.priority === 'high' ? 'Cao' : item.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="approval">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Thông tin biên bản</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Tạo bởi: {minutes.createdBy.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Tạo lúc: {format(new Date(minutes.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>Mẫu: {minutes.template}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Phiên bản: {minutes.version}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Trạng thái phê duyệt</h3>
                <div className="space-y-4">
                  {meeting.approvalStatus === 'approved' && minutes.approvedBy && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Đã được phê duyệt</span>
                      </div>
                      <div className="text-sm text-green-700">
                        <div>Người duyệt: {minutes.approvedBy.name}</div>
                        {minutes.approvedAt && (
                          <div>Thời gian: {format(new Date(minutes.approvedAt), "dd/MM/yyyy HH:mm", { locale: vi })}</div>
                        )}
                      </div>
                    </div>
                  )}
                  {meeting.approvalStatus === 'pending' && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Chờ phê duyệt</span>
                      </div>
                      <p className="text-sm text-yellow-700">Biên bản đang chờ được phê duyệt</p>
                    </div>
                  )}
                  {meeting.approvalStatus === 'revision-required' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Edit className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">Cần bổ sung</span>
                      </div>
                      <p className="text-sm text-red-700">Biên bản cần được chỉnh sửa và bổ sung</p>
                    </div>
                  )}
                </div>
              </div>

              {meeting.approvalStatus === 'pending' && (
                <div className="flex gap-2">
                  <Button>Phê duyệt</Button>
                  <Button variant="outline">Yêu cầu bổ sung</Button>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


