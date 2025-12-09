"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  Plus
} from "lucide-react";
import { mockMeetings } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const router = useRouter();
  
  // Group meetings by date
  const meetingsByDate = mockMeetings.reduce((acc, meeting) => {
    const date = meeting.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meeting);
    return acc;
  }, {} as Record<string, typeof mockMeetings>);

  const sortedDates = Object.keys(meetingsByDate).sort();

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#e3f2fd]">Lịch Họp</h1>
          <p className="text-[#bbdefb] font-medium">
            Xem tất cả cuộc họp theo lịch
          </p>
        </div>
        <Button asChild>
          <Link href="/meetings/create">
            <Plus className="w-4 h-4 mr-2" />
            Tạo cuộc họp mới
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {sortedDates.map(date => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-[#90caf9]" />
              <h2 className="text-xl font-semibold text-[#e3f2fd]">
                {format(new Date(date), "EEEE, dd MMMM yyyy", { locale: vi })}
              </h2>
              <Badge variant="outline">{meetingsByDate[date].length} cuộc họp</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meetingsByDate[date].map(meeting => (
                <Card 
                  key={meeting.id} 
                  className="p-4 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover cursor-pointer"
                  onClick={() => router.push(`/meetings/${meeting.id}`)}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold flex-1 text-[#e3f2fd]">{meeting.title}</h3>
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="space-y-1 text-sm text-[#bbdefb]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#90caf9]" />
                        {meeting.startTime} - {meeting.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#90caf9]" />
                        {meeting.participants.length} người tham dự
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t" onClick={(e) => e.stopPropagation()}>
                      {meeting.status === 'in-progress' && (
                        <Button asChild variant="default" size="sm" className="flex-1">
                          <Link href={`/meetings/${meeting.id}/live`}>
                            <Video className="w-4 h-4 mr-2" />
                            Tham gia
                          </Link>
                        </Button>
                      )}
                      {meeting.status === 'scheduled' && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/meetings/${meeting.id}`}>
                            Xem chi tiết
                          </Link>
                        </Button>
                      )}
                      {meeting.status === 'completed' && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/minutes/${meeting.id}`}>
                            Xem biên bản
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Không có cuộc họp nào được lên lịch</p>
        </div>
      )}
    </div>
  );
}

