"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock,
  User,
  Download,
  Eye,
  Edit,
  Sparkles
} from "lucide-react";
import { mockMeetings, mockUsers } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function MinutesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const meetingsWithMinutes = mockMeetings.filter(m => m.minutes);

  const filteredMinutes = meetingsWithMinutes.filter(meeting => 
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.minutes?.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getApprovalBadge = (status?: string) => {
    if (!status) return null;
    
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'pending': 'secondary',
      'approved': 'default',
      'revision-required': 'destructive'
    };
    
    const labels: Record<string, string> = {
      'pending': 'Chờ duyệt',
      'approved': 'Đã duyệt',
      'revision-required': 'Cần bổ sung'
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
          <h1 className="text-3xl font-bold mb-2 text-[#e3f2fd]">Biên bản Cuộc họp</h1>
          <p className="text-[#bbdefb] font-medium">
            Xem và quản lý biên bản được tạo tự động bởi AI
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm biên bản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Minutes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMinutes.map(meeting => (
          <Card key={meeting.id} className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 hover:shadow-lg smooth-hover cursor-pointer">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-[#e3f2fd]">{meeting.title}</h3>
                  <p className="text-sm text-[#bbdefb] line-clamp-2">
                    {meeting.description}
                  </p>
                </div>
                <Badge variant="secondary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-[#bbdefb]">
                  <Clock className="w-4 h-4 mr-2 text-[#90caf9]" />
                  {format(new Date(meeting.date), "dd/MM/yyyy", { locale: vi })}
                </div>
                <div className="flex items-center text-[#bbdefb]">
                  <User className="w-4 h-4 mr-2 text-[#90caf9]" />
                  Tạo bởi: {meeting.minutes?.createdBy.name}
                </div>
                {meeting.approvalStatus && (
                  <div className="pt-2">
                    {getApprovalBadge(meeting.approvalStatus)}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button asChild variant="default" className="flex-1">
                  <Link href={`/minutes/${meeting.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Xem
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link href={`/minutes/${meeting.id}?edit=true`}>
                    <Edit />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link href={`/minutes/${meeting.id}?download=true`}>
                    <Download />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMinutes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Không tìm thấy biên bản nào</p>
        </div>
      )}
    </div>
  );
}

