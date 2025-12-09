"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield,
  Users,
  Lock,
  FileText,
  Eye,
  Settings,
  Key,
  Server,
  AlertCircle
} from "lucide-react";
import { mockUsers, mockAuditLogs } from "@/lib/mock-data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function AdminPage() {
  const roles = [
    { value: 'admin', label: 'Quản trị viên', color: 'destructive' },
    { value: 'host', label: 'Chủ trì', color: 'default' },
    { value: 'secretary', label: 'Thư ký', color: 'secondary' },
    { value: 'viewer', label: 'Người xem', color: 'outline' }
  ];

  const getRoleBadge = (role: string) => {
    const roleInfo = roles.find(r => r.value === role);
    return (
      <Badge variant={roleInfo?.color as any || 'outline'}>
        {roleInfo?.label || role}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-8 h-8 text-[#90caf9]" />
          <h1 className="text-3xl font-bold text-[#e3f2fd]">Quản trị & Bảo mật</h1>
        </div>
        <p className="text-[#bbdefb] font-medium">
          Quản lý phân quyền, bảo mật và audit log
        </p>
      </div>

      <Tabs defaultValue="rbac" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rbac">RBAC - Phân quyền</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="rbac">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Quản lý Người dùng</h3>
                <Button>Thêm người dùng</Button>
              </div>
              <div className="space-y-2">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-sm text-muted-foreground">{user.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getRoleBadge(user.role)}
                      <Button variant="outline" size="sm">
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quyền theo Vai trò</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map(role => (
                  <div key={role.value} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={role.color as any}>{role.label}</Badge>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {role.value === 'admin' && (
                        <>
                          <li>✓ Toàn quyền truy cập</li>
                          <li>✓ Quản lý người dùng</li>
                          <li>✓ Xem tất cả cuộc họp</li>
                          <li>✓ Chỉnh sửa biên bản</li>
                          <li>✓ Xem audit log</li>
                        </>
                      )}
                      {role.value === 'host' && (
                        <>
                          <li>✓ Tạo và quản lý cuộc họp</li>
                          <li>✓ Xem và chỉnh sửa biên bản</li>
                          <li>✓ Quản lý action items</li>
                          <li>✗ Quản lý người dùng</li>
                        </>
                      )}
                      {role.value === 'secretary' && (
                        <>
                          <li>✓ Tạo và chỉnh sửa biên bản</li>
                          <li>✓ Xem cuộc họp</li>
                          <li>✓ Quản lý action items</li>
                          <li>✗ Tạo cuộc họp</li>
                        </>
                      )}
                      {role.value === 'viewer' && (
                        <>
                          <li>✓ Xem cuộc họp</li>
                          <li>✓ Xem biên bản</li>
                          <li>✗ Chỉnh sửa</li>
                          <li>✗ Tạo cuộc họp</li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Mã hóa Dữ liệu</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm">Mã hóa AES-256</span>
                  <Badge variant="default">Đã bật</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm">Mã hóa trong quá trình truyền</span>
                  <Badge variant="default">TLS 1.3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm">Mã hóa dữ liệu lưu trữ</span>
                  <Badge variant="default">AES-256</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Lưu trữ</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">Chế độ lưu trữ</div>
                  <div className="text-sm text-muted-foreground">On-premise / Private Cloud</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">Tách dữ liệu theo phòng ban</div>
                  <div className="text-sm text-muted-foreground">Đã bật</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">Retention Policy</div>
                  <div className="text-sm text-muted-foreground">Theo quy định ngân hàng</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Kiểm soát Truy cập</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">On-premise AI Model</div>
                  <div className="text-sm text-muted-foreground">Dữ liệu không gửi ra ngoài</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">Kiểm soát IP/Mạng</div>
                  <div className="text-sm text-muted-foreground">Chỉ truy cập từ mạng nội bộ LPBank</div>
                </div>
                <div className="p-3 bg-muted rounded">
                  <div className="text-sm font-medium mb-1">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Đã bật</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Chính sách Bảo mật</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 border rounded">
                  <div className="text-sm font-medium mb-1">Tuân thủ chuẩn ngân hàng</div>
                  <div className="text-sm text-muted-foreground">Đã đạt chuẩn</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm font-medium mb-1">GDPR Compliance</div>
                  <div className="text-sm text-muted-foreground">Đã tuân thủ</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm font-medium mb-1">ISO 27001</div>
                  <div className="text-sm text-muted-foreground">Đang chứng nhận</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Audit Log</h3>
              <Button variant="outline">Xuất log</Button>
            </div>
            <div className="space-y-2">
              {mockAuditLogs.map(log => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{log.action}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss", { locale: vi })}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{log.user.name}</span>
                        <span className="text-muted-foreground"> - {log.details}</span>
                      </div>
                      {log.transcriptReference && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Tham chiếu transcript: {log.transcriptReference}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Cài đặt Hệ thống</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Tự động tạo biên bản</div>
                    <div className="text-sm text-muted-foreground">Sau khi cuộc họp kết thúc</div>
                  </div>
                  <Badge variant="default">Bật</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Gửi email thông báo</div>
                    <div className="text-sm text-muted-foreground">Khi có biên bản mới</div>
                  </div>
                  <Badge variant="default">Bật</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Đồng bộ với hệ thống công việc</div>
                    <div className="text-sm text-muted-foreground">Jira, Trello, Notion</div>
                  </div>
                  <Badge variant="default">Bật</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Mẫu Biên bản</h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 border rounded flex justify-between items-center">
                  <span className="text-sm">Biên bản chuẩn doanh nghiệp</span>
                  <Badge variant="outline">Mặc định</Badge>
                </div>
                <div className="p-3 border rounded flex justify-between items-center">
                  <span className="text-sm">Biên bản họp Ban Lãnh đạo</span>
                </div>
                <div className="p-3 border rounded flex justify-between items-center">
                  <span className="text-sm">Biên bản dự án</span>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  Thêm mẫu mới
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

