"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  Video,
  FileText,
  CheckCircle2,
  PlayCircle
} from "lucide-react";
import { mockMeetings, mockUsers } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function MeetingsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || meeting.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#e3f2fd]">Quản lý Cuộc họp</h1>
          <p className="text-[#bbdefb] font-medium">
            Quản lý và theo dõi tất cả các cuộc họp của bạn
          </p>
        </div>
        <Button asChild>
          <Link href="/meetings/create">
            <Plus className="w-4 h-4 mr-2" />
            Tạo cuộc họp mới
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm cuộc họp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'scheduled', 'in-progress', 'completed'].map(status => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'Tất cả' : 
               status === 'scheduled' ? 'Đã lên lịch' :
               status === 'in-progress' ? 'Đang diễn ra' : 'Hoàn thành'}
            </Button>
          ))}
        </div>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeetings.map(meeting => (
          <Card 
            key={meeting.id} 
            className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover cursor-pointer"
            onClick={() => router.push(`/meetings/${meeting.id}`)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-[#e3f2fd]">{meeting.title}</h3>
                  <p className="text-sm text-[#bbdefb] line-clamp-2">
                    {meeting.description}
                  </p>
                </div>
                {getStatusBadge(meeting.status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-[#bbdefb]">
                  <Calendar className="w-4 h-4 mr-2 text-[#90caf9]" />
                  {format(new Date(meeting.date), "dd/MM/yyyy", { locale: vi })}
                </div>
                <div className="flex items-center text-[#bbdefb]">
                  <Clock className="w-4 h-4 mr-2 text-[#90caf9]" />
                  {meeting.startTime} - {meeting.endTime}
                </div>
                <div className="flex items-center text-[#bbdefb]">
                  <Users className="w-4 h-4 mr-2 text-[#90caf9]" />
                  {meeting.participants.length} người tham dự
                </div>
                {meeting.actionItems && (
                  <div className="flex items-center text-[#bbdefb]">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-[#90caf9]" />
                    {meeting.actionItems.length} action items
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                {meeting.status === 'in-progress' && (
                  <Button asChild variant="default" className="flex-1">
                    <Link href={`/meetings/${meeting.id}/live`}>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Tham gia
                    </Link>
                  </Button>
                )}
                {meeting.status === 'completed' && (
                  <>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/meetings/${meeting.id}`}>
                        <FileText className="w-4 h-4 mr-2" />
                        Xem biên bản
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                      <Link href={`/meetings/${meeting.id}/transcript`}>
                        <Video />
                      </Link>
                    </Button>
                  </>
                )}
                {meeting.status === 'scheduled' && (
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/meetings/${meeting.id}`}>
                      Xem chi tiết
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy cuộc họp nào</p>
        </div>
      )}
    </div>
  );
}

