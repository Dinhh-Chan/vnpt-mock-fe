# COPILOT MEETING - Trợ lý Cuộc họp AI

Hệ thống Trợ lý Cuộc họp ứng dụng Trí tuệ Nhân tạo toàn diện, được thiết kế để tối ưu hóa quy trình họp theo ba giai đoạn chính: Trước cuộc họp, Trong cuộc họp và Sau cuộc họp.

## 🚀 Tính năng chính

### 1. TRƯỚC CUỘC HỌP (Before Meeting)

- ✅ **Tạo cuộc họp & Quản lý lịch**: Tạo, đặt lịch và mời người tham dự
- ✅ **AI Agenda Generator**: Tự động tạo agenda từ chủ đề cuộc họp
- ✅ **Chuẩn bị Tài liệu**: Tự động tổng hợp tài liệu liên quan

### 2. TRONG CUỘC HỌP (During Meeting)

- ✅ **Ghi âm – Ghi hình – Ghi Transcript**: Voice-to-text thời gian thực với Speaker Identification
- ✅ **Live Meeting Summary**: Tóm tắt trực tuyến (Key Points, Decisions, Action Items)
- ✅ **Phát hiện Action Items tự động**: AI nhận dạng và ghi nhận action items
- ✅ **AI Co-pilot**: Hỏi đáp trực tiếp với AI trong cuộc họp

### 3. SAU CUỘC HỌP (After Meeting)

- ✅ **AI Minutes**: Tự động tạo biên bản chuẩn
- ✅ **Gửi & Phê duyệt Biên bản**: Quy trình phê duyệt tự động
- ✅ **Task Sync**: Đồng bộ Action Items vào hệ thống công việc
- ✅ **Báo cáo Tổng hợp**: Báo cáo theo phòng ban, người tham dự, hiệu quả cuộc họp

### 4. QUẢN TRỊ & BẢO MẬT (Enterprise Features)

- ✅ **RBAC**: Phân quyền dựa trên vai trò (Admin, Host, Secretary, Viewer)
- ✅ **Lưu trữ dữ liệu an toàn**: Mã hóa AES-256, On-premise/Private Cloud
- ✅ **Audit Log**: Nhật ký kiểm toán chi tiết
- ✅ **Chính sách bảo mật**: Tuân thủ chuẩn ngân hàng

### 5. EXTENSION & ADD-ON

- ✅ **Extension cho Zoom/Google Meet**: Tích hợp vào nền tảng họp trực tuyến
- ✅ **Truy cập nhanh Tài liệu**: Không cần rời màn hình họp
- ✅ **In-meeting Q&A**: Hỏi đáp trực tiếp với AI
- ✅ **Gợi ý thông minh**: AI gợi ý câu trả lời/dữ liệu theo ngữ cảnh

### 6. AI ANALYTICS

- ✅ **Meeting Insights**: Phân tích chủ đề, người nói, xu hướng
- ✅ **Meeting Recommendation Engine**: Đề xuất tối ưu hóa cuộc họp
- ✅ **Chat với Dữ liệu**: Truy vấn phức tạp trên kho dữ liệu biên bản

## 📁 Cấu trúc Dự án

```
vnpt-mock-fe/
├── app/
│   ├── page.tsx                    # Trang chủ
│   ├── layout.tsx                  # Layout chính với Navbar
│   ├── meetings/
│   │   ├── page.tsx               # Danh sách cuộc họp
│   │   ├── create/
│   │   │   └── page.tsx           # Tạo cuộc họp mới (AI Agenda Generator)
│   │   └── [id]/
│   │       ├── page.tsx           # Chi tiết cuộc họp
│   │       └── live/
│   │           └── page.tsx       # Cuộc họp trực tiếp (During Meeting)
│   ├── calendar/
│   │   └── page.tsx                # Lịch họp
│   ├── minutes/
│   │   ├── page.tsx               # Danh sách biên bản
│   │   └── [id]/
│   │       └── page.tsx           # Chi tiết biên bản
│   ├── reports/
│   │   └── page.tsx               # Báo cáo tổng hợp
│   ├── analytics/
│   │   └── page.tsx               # AI Analytics (Insights, Recommendations, Chat)
│   ├── admin/
│   │   └── page.tsx               # Quản trị & Bảo mật
│   └── extensions/
│       └── page.tsx               # Extension & Add-on
├── components/
│   ├── layout/
│   │   └── navbar.tsx             # Navigation bar
│   └── ui/                       # shadcn/ui components
└── lib/
    └── mock-data.ts              # Dữ liệu mock
```

## 🛠️ Công nghệ sử dụng

- **Next.js 16**: Framework React với App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Recharts**: Data visualization
- **date-fns**: Date formatting
- **Lucide React**: Icons

## 🚀 Cài đặt và Chạy

```bash
# Cài đặt dependencies
cd vnpt-mock-fe
npm install
# hoặc
pnpm install

# Chạy development server
npm run dev
# hoặc
pnpm dev

# Mở trình duyệt tại http://localhost:3000
```

## 📊 Dữ liệu Mock

Dữ liệu mock được định nghĩa trong `lib/mock-data.ts`, bao gồm:
- Users (người dùng với các vai trò khác nhau)
- Meetings (cuộc họp với đầy đủ thông tin)
- Transcripts (bản ghi cuộc họp)
- Action Items (các việc cần làm)
- Minutes (biên bản)
- Audit Logs (nhật ký kiểm toán)
- Insights (phân tích AI)

## 🎨 UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode support (sẵn sàng với next-themes)
- ✅ Modern và professional UI
- ✅ Interactive components với animations
- ✅ Real-time updates simulation
- ✅ Loading states và error handling

## 📝 Các Trang chính

1. **Trang chủ** (`/`): Dashboard tổng quan với stats và quick access
2. **Quản lý Cuộc họp** (`/meetings`): Danh sách và quản lý cuộc họp
3. **Tạo Cuộc họp** (`/meetings/create`): Form tạo cuộc họp với AI Agenda Generator
4. **Cuộc họp Trực tiếp** (`/meetings/[id]/live`): Giao diện trong cuộc họp với transcript, summary, AI Co-pilot
5. **Lịch Họp** (`/calendar`): Xem cuộc họp theo lịch
6. **Biên bản** (`/minutes`): Quản lý và xem biên bản
7. **Báo cáo** (`/reports`): Báo cáo tổng hợp với charts
8. **Phân tích AI** (`/analytics`): Meeting Insights, Recommendations, Chat với dữ liệu
9. **Quản trị** (`/admin`): RBAC, Bảo mật, Audit Log
10. **Extension** (`/extensions`): Thông tin về extensions cho Zoom/Google Meet

## 🔐 Bảo mật & Quyền

- **RBAC**: 4 vai trò chính (Admin, Host, Secretary, Viewer)
- **Mã hóa**: AES-256 cho dữ liệu
- **Audit Log**: Ghi lại mọi thay đổi
- **On-premise AI**: Dữ liệu không gửi ra ngoài

## 🎯 Tính năng AI

- **AI Agenda Generator**: Tạo agenda tự động từ chủ đề
- **Voice-to-Text**: Chuyển đổi giọng nói thành văn bản
- **Speaker Identification**: Nhận diện người nói
- **Live Summary**: Tóm tắt trực tuyến
- **Action Item Detection**: Phát hiện action items tự động
- **AI Co-pilot**: Hỏi đáp với AI trong cuộc họp
- **Meeting Insights**: Phân tích dữ liệu cuộc họp
- **Recommendations**: Đề xuất tối ưu hóa
- **Chat với Dữ liệu**: Truy vấn phức tạp

## 📱 Responsive Design

Tất cả các trang đều được thiết kế responsive:
- Mobile: 1 cột
- Tablet: 2 cột
- Desktop: 3-4 cột

## 🚧 Lưu ý

Đây là một **mock application** với dữ liệu giả. Các tính năng AI được mô phỏng bằng setTimeout và dữ liệu tĩnh. Trong môi trường production, cần tích hợp với:
- Backend API thực tế
- AI/ML services (OpenAI, Azure AI, etc.)
- Database (PostgreSQL, MongoDB, etc.)
- Authentication & Authorization service
- File storage service
- Real-time communication (WebSocket)

## 📄 License

Dự án này được tạo cho AI Hackathon VNPT.


