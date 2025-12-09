"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const departmentData = [
  { name: 'Ban Giám đốc', meetings: 24, actions: 45, completion: 85 },
  { name: 'Khối Tín Dụng', meetings: 18, actions: 32, completion: 78 },
  { name: 'Phòng Hành chính', meetings: 15, actions: 28, completion: 92 },
  { name: 'Phòng Kế toán', meetings: 12, actions: 22, completion: 88 }
];

const participantData = [
  { name: 'Nguyễn Văn A', participation: 95, actions: 12, completion: 100 },
  { name: 'Trần Thị B', participation: 88, actions: 8, completion: 87 },
  { name: 'Lê Văn C', participation: 92, actions: 15, completion: 93 },
  { name: 'Phạm Thị D', participation: 75, actions: 5, completion: 80 }
];

const monthlyTrend = [
  { month: 'Tháng 7', meetings: 35, actions: 68 },
  { month: 'Tháng 8', meetings: 42, actions: 85 },
  { month: 'Tháng 9', meetings: 38, actions: 72 },
  { month: 'Tháng 10', meetings: 45, actions: 89 }
];

const actionStatusData = [
  { name: 'Hoàn thành', value: 65, color: '#22c55e' },
  { name: 'Đang thực hiện', value: 25, color: '#3b82f6' },
  { name: 'Chờ xử lý', value: 10, color: '#f59e0b' }
];

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-[#e3f2fd]">Báo cáo Tổng hợp</h1>
        <p className="text-[#bbdefb] font-medium">
          Phân tích và thống kê hiệu quả cuộc họp
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#bbdefb] mb-1">Tổng cuộc họp</p>
              <p className="text-3xl font-bold text-[#e3f2fd]">156</p>
            </div>
            <Calendar className="w-8 h-8 text-[#64b5f6]" />
          </div>
        </Card>
        <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#bbdefb] mb-1">Action Items</p>
              <p className="text-3xl font-bold text-[#e3f2fd]">389</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-[#64b5f6]" />
          </div>
        </Card>
        <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#bbdefb] mb-1">Tỷ lệ hoàn thành</p>
              <p className="text-3xl font-bold text-[#e3f2fd]">85%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#64b5f6]" />
          </div>
        </Card>
        <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs hover:bg-[#64b5f6]/10 hover:border-[#64b5f6]/50 smooth-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#bbdefb] mb-1">Thời gian tiết kiệm</p>
              <p className="text-3xl font-bold text-[#e3f2fd]">240h</p>
            </div>
            <Clock className="w-8 h-8 text-[#64b5f6]" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="department" className="space-y-6">
        <TabsList>
          <TabsTrigger value="department">Theo phòng ban</TabsTrigger>
          <TabsTrigger value="participant">Theo người tham dự</TabsTrigger>
          <TabsTrigger value="trend">Xu hướng</TabsTrigger>
          <TabsTrigger value="efficiency">Hiệu quả cuộc họp</TabsTrigger>
        </TabsList>

        <TabsContent value="department">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Số cuộc họp theo phòng ban</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="meetings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Action Items theo phòng ban</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="actions" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 lg:col-span-2 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Tỷ lệ hoàn thành Action Items</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="participant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Tỷ lệ tham gia cuộc họp</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participantData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participation" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Số Action Items được giao</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participantData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="actions" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Tỷ lệ hoàn thành Action Items</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participantData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trend">
          <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
            <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Xu hướng cuộc họp và Action Items</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="meetings" stroke="#3b82f6" strokeWidth={2} name="Cuộc họp" />
                <Line type="monotone" dataKey="actions" stroke="#22c55e" strokeWidth={2} name="Action Items" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Trạng thái Action Items</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={actionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {actionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6 border-[#64b5f6]/30 bg-background/50 shadow-xs">
              <h3 className="text-lg font-semibold mb-4 text-[#e3f2fd]">Thống kê hiệu quả</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Thời gian trung bình/cuộc họp</span>
                  <span className="font-semibold">1.5 giờ</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Action Items/cuộc họp</span>
                  <span className="font-semibold">2.5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Tỷ lệ hoàn thành trung bình</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span>Thời gian tiết kiệm (AI)</span>
                  <span className="font-semibold text-green-600">240 giờ</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

