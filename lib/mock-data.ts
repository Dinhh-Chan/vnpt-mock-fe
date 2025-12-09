// Dữ liệu mock cho hệ thống COPILOT MEETING

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'host' | 'secretary' | 'viewer';
  department: string;
  avatar?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  host: User;
  participants: User[];
  agenda?: AgendaItem[];
  documents?: Document[];
  transcript?: TranscriptEntry[];
  summary?: MeetingSummary;
  actionItems?: ActionItem[];
  minutes?: Minutes;
  approvalStatus?: 'pending' | 'approved' | 'revision-required';
}

export interface AgendaItem {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  presenter?: User;
  order: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: User;
  uploadedAt: string;
}

export interface TranscriptEntry {
  id: string;
  timestamp: string;
  speaker: User;
  text: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface MeetingSummary {
  keyPoints: string[];
  decisions: string[];
  actionItems: ActionItem[];
  generatedAt: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignedTo: User;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  relatedTranscriptIds?: string[];
}

export interface Minutes {
  id: string;
  meetingId: string;
  content: string;
  template: string;
  createdAt: string;
  createdBy: User;
  approvedBy?: User;
  approvedAt?: string;
  version: number;
}

export interface AuditLog {
  id: string;
  meetingId: string;
  action: string;
  user: User;
  timestamp: string;
  details: string;
  transcriptReference?: string;
}

export interface MeetingInsight {
  id: string;
  meetingId: string;
  type: 'topic' | 'speaker' | 'sentiment' | 'action';
  data: any;
  generatedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@vnpt.vn',
    role: 'admin',
    department: 'Ban Giám đốc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@vnpt.vn',
    role: 'host',
    department: 'Khối Tín Dụng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TranThiB'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@vnpt.vn',
    role: 'secretary',
    department: 'Phòng Hành chính',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@vnpt.vn',
    role: 'viewer',
    department: 'Khối Tín Dụng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD'
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@vnpt.vn',
    role: 'viewer',
    department: 'Phòng Kế toán',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangVanE'
  }
];

// Mock Meetings
export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Họp Ban Lãnh đạo tháng 10/2024',
    description: 'Đánh giá kết quả kinh doanh tháng 10 và kế hoạch tháng 11',
    date: '2024-10-15',
    startTime: '09:00',
    endTime: '11:30',
    status: 'completed',
    host: mockUsers[0],
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    agenda: [
      {
        id: 'a1',
        title: 'Báo cáo kết quả kinh doanh tháng 10',
        description: 'Tổng hợp doanh thu, chi phí và lợi nhuận',
        duration: 30,
        presenter: mockUsers[1],
        order: 1
      },
      {
        id: 'a2',
        title: 'Kế hoạch tháng 11',
        description: 'Đề xuất mục tiêu và chiến lược cho tháng 11',
        duration: 45,
        presenter: mockUsers[0],
        order: 2
      },
      {
        id: 'a3',
        title: 'Thảo luận và quyết định',
        description: 'Thảo luận các vấn đề và đưa ra quyết định',
        duration: 30,
        order: 3
      }
    ],
    documents: [
      {
        id: 'd1',
        name: 'Báo cáo tháng 10.pdf',
        type: 'application/pdf',
        size: 2048000,
        url: '#',
        uploadedBy: mockUsers[1],
        uploadedAt: '2024-10-14T10:00:00Z'
      }
    ],
    transcript: [
      {
        id: 't1',
        timestamp: '09:05:23',
        speaker: mockUsers[0],
        text: 'Chào mừng mọi người đến với cuộc họp Ban Lãnh đạo tháng 10. Chúng ta sẽ bắt đầu với báo cáo kết quả kinh doanh.',
        sentiment: 'positive'
      },
      {
        id: 't2',
        timestamp: '09:06:15',
        speaker: mockUsers[1],
        text: 'Cảm ơn anh. Tôi xin trình bày báo cáo kết quả kinh doanh tháng 10. Doanh thu đạt 15 tỷ đồng, tăng 12% so với tháng trước.',
        sentiment: 'positive'
      },
      {
        id: 't3',
        timestamp: '09:20:30',
        speaker: mockUsers[0],
        text: 'Rất tốt. Vậy chúng ta cần đặt mục tiêu cho tháng 11 là 18 tỷ đồng. Ai sẽ chịu trách nhiệm thực hiện?',
        sentiment: 'neutral'
      },
      {
        id: 't4',
        timestamp: '09:21:05',
        speaker: mockUsers[1],
        text: 'Tôi sẽ chịu trách nhiệm và hoàn thành trước ngày 30/11.',
        sentiment: 'positive'
      }
    ],
    summary: {
      keyPoints: [
        'Doanh thu tháng 10 đạt 15 tỷ đồng, tăng 12%',
        'Mục tiêu tháng 11 là 18 tỷ đồng',
        'Cần tăng cường marketing và mở rộng thị trường'
      ],
      decisions: [
        'Phê duyệt mục tiêu doanh thu tháng 11: 18 tỷ đồng',
        'Tăng ngân sách marketing lên 20%'
      ],
      actionItems: [
        {
          id: 'ai1',
          title: 'Hoàn thành mục tiêu doanh thu 18 tỷ đồng',
          description: 'Thực hiện các biện pháp để đạt mục tiêu doanh thu tháng 11',
          assignedTo: mockUsers[1],
          deadline: '2024-11-30',
          status: 'in-progress',
          priority: 'high',
          relatedTranscriptIds: ['t3', 't4']
        }
      ],
      generatedAt: '2024-10-15T11:30:00Z'
    },
    actionItems: [
      {
        id: 'ai1',
        title: 'Hoàn thành mục tiêu doanh thu 18 tỷ đồng',
        description: 'Thực hiện các biện pháp để đạt mục tiêu doanh thu tháng 11',
        assignedTo: mockUsers[1],
        deadline: '2024-11-30',
        status: 'in-progress',
        priority: 'high',
        relatedTranscriptIds: ['t3', 't4']
      },
      {
        id: 'ai2',
        title: 'Tăng ngân sách marketing lên 20%',
        description: 'Lập kế hoạch và trình duyệt ngân sách marketing mới',
        assignedTo: mockUsers[3],
        deadline: '2024-10-25',
        status: 'pending',
        priority: 'medium'
      }
    ],
    minutes: {
      id: 'min1',
      meetingId: 'm1',
      content: 'Biên bản cuộc họp Ban Lãnh đạo tháng 10/2024...',
      template: 'enterprise',
      createdAt: '2024-10-15T12:00:00Z',
      createdBy: mockUsers[2],
      version: 1
    },
    approvalStatus: 'approved'
  },
  {
    id: 'm2',
    title: 'Họp dự án số hóa hệ thống',
    description: 'Cập nhật tiến độ và thảo luận các vấn đề kỹ thuật',
    date: '2024-10-20',
    startTime: '14:00',
    endTime: '16:00',
    status: 'scheduled',
    host: mockUsers[1],
    participants: [mockUsers[1], mockUsers[2], mockUsers[4]],
    agenda: [
      {
        id: 'a4',
        title: 'Báo cáo tiến độ',
        description: 'Cập nhật tiến độ dự án số hóa',
        duration: 30,
        presenter: mockUsers[2],
        order: 1
      },
      {
        id: 'a5',
        title: 'Thảo luận vấn đề kỹ thuật',
        description: 'Giải quyết các vấn đề kỹ thuật phát sinh',
        duration: 60,
        order: 2
      }
    ]
  },
  {
    id: 'm3',
    title: 'Họp đánh giá hiệu quả cuộc họp',
    description: 'Đánh giá và cải thiện quy trình họp',
    date: '2024-10-18',
    startTime: '10:00',
    endTime: '11:00',
    status: 'in-progress',
    host: mockUsers[0],
    participants: [mockUsers[0], mockUsers[2], mockUsers[3]]
  }
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'al1',
    meetingId: 'm1',
    action: 'minutes_edited',
    user: mockUsers[2],
    timestamp: '2024-10-15T12:30:00Z',
    details: 'Chỉnh sửa phần quyết định trong biên bản',
    transcriptReference: 't3'
  },
  {
    id: 'al2',
    meetingId: 'm1',
    action: 'action_item_added',
    user: mockUsers[0],
    timestamp: '2024-10-15T11:00:00Z',
    details: 'Thêm action item: Hoàn thành mục tiêu doanh thu',
    transcriptReference: 't4'
  }
];

// Mock Insights
export const mockInsights: MeetingInsight[] = [
  {
    id: 'ins1',
    meetingId: 'm1',
    type: 'topic',
    data: {
      topics: ['Kết quả kinh doanh', 'Kế hoạch tháng 11', 'Marketing'],
      weights: [35, 40, 25]
    },
    generatedAt: '2024-10-15T11:30:00Z'
  },
  {
    id: 'ins2',
    meetingId: 'm1',
    type: 'speaker',
    data: {
      speakers: [
        { user: mockUsers[0], speakingTime: 45, percentage: 30 },
        { user: mockUsers[1], speakingTime: 90, percentage: 60 },
        { user: mockUsers[2], speakingTime: 15, percentage: 10 }
      ]
    },
    generatedAt: '2024-10-15T11:30:00Z'
  }
];


