"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle2,
  Video,
  PlayCircle,
  Download
} from "lucide-react";
import { mockMeetings } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

export default function MeetingDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const pathname = usePathname();
  const [meetingId, setMeetingId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const resolveParams = async () => {
      try {
        // Thử lấy từ params trước
        let id = "";
        if (params && typeof params === 'object' && 'then' in params) {
          const resolved = await params;
          id = resolved.id;
        } else if (params && typeof params === 'object' && 'id' in params) {
          id = (params as { id: string }).id;
        }
        
        // Nếu không có từ params, lấy từ URL
        if (!id && pathname) {
          const pathParts = pathname.split('/');
          id = pathParts[pathParts.length - 1];
        }
        
        setMeetingId(id);
      } catch (error) {
        console.error('Error resolving params:', error);
        // Fallback: lấy từ URL
        if (pathname) {
          const pathParts = pathname.split('/');
          setMeetingId(pathParts[pathParts.length - 1]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    resolveParams();
  }, [params, pathname]);

  const meeting = mockMeetings.find(m => m.id === meetingId);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

  if (!meeting) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div>Cuộc họp không tồn tại</div>
        <div className="text-sm text-muted-foreground mt-2">ID: {meetingId || 'undefined'}</div>
        <div className="text-sm text-muted-foreground">Các ID có sẵn: {mockMeetings.map(m => m.id).join(', ')}</div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'scheduled': 'default',
      'in-progress': 'secondary',
      'completed': 'outline',
      'cancelled': 'destructive'
    };
    
    const labels: Record<string, string> = {
      'scheduled': 'Đã lên lịch',
      'in-progress': 'Đang diễn ra',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy'
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{meeting.title}</h1>
            {getStatusBadge(meeting.status)}
          </div>
          <p className="text-muted-foreground">{meeting.description}</p>
        </div>
        <div className="flex gap-2">
          {meeting.status === 'in-progress' && (
            <Button asChild>
              <Link href={`/meetings/${meeting.id}/live`}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Tham gia
              </Link>
            </Button>
          )}
          {meeting.status === 'completed' && meeting.minutes && (
            <Button asChild variant="outline">
              <Link href={`/minutes/${meeting.id}`}>
                <FileText className="w-4 h-4 mr-2" />
                Xem biên bản
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="participants">Người tham dự</TabsTrigger>
          <TabsTrigger value="documents">Tài liệu</TabsTrigger>
          {meeting.actionItems && <TabsTrigger value="actions">Action Items</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin Cuộc họp</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Ngày</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(meeting.date), "EEEE, dd MMMM yyyy", { locale: vi })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Thời gian</div>
                    <div className="text-sm text-muted-foreground">
                      {meeting.startTime} - {meeting.endTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Chủ trì</div>
                    <div className="text-sm text-muted-foreground">
                      {meeting.host.name}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {meeting.summary && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tóm tắt</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium mb-1">Điểm chính:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {meeting.summary.keyPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Quyết định:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {meeting.summary.decisions.slice(0, 2).map((decision, idx) => (
                        <li key={idx}>✓ {decision}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="agenda">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Agenda</h3>
            {meeting.agenda && meeting.agenda.length > 0 ? (
              <div className="space-y-4">
                {meeting.agenda.map((item, idx) => (
                  <div key={item.id} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{item.order}. {item.title}</span>
                          <Badge variant="outline">{item.duration} phút</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        {item.presenter && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Trình bày: {item.presenter.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Chưa có agenda</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="participants">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Người tham dự ({meeting.participants.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meeting.participants.map(participant => (
                <div key={participant.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {participant.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-sm text-muted-foreground">{participant.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tài liệu</h3>
            {meeting.documents && meeting.documents.length > 0 ? (
              <div className="space-y-2">
                {meeting.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB • {doc.uploadedBy.name}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Chưa có tài liệu</p>
            )}
          </Card>
        </TabsContent>

        {meeting.actionItems && (
          <TabsContent value="actions">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Action Items ({meeting.actionItems.length})</h3>
              <div className="space-y-4">
                {meeting.actionItems.map(item => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
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
                        <Users className="w-4 h-4" />
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
        )}
      </Tabs>
    </div>
  );
}


