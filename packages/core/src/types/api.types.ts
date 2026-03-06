// ── Error ──
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, string[]>;
}

// ── Auth ──
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserResponse;
  tokens: AuthTokens;
}

// ── User ──
export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatarUrl: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}

// ── Property ──
export interface PropertyResponse {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _count?: { units: number };
}

// ── Unit ──
export interface UnitResponse {
  id: string;
  propertyId: string;
  unitNumber: string;
  floor: number | null;
  rooms: number | null;
  area: number | null;
  rentAmount: number | null;
  isOccupied: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Ticket ──
export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  unitId: string;
  reporterId: string;
  slaAckDeadline: string | null;
  slaResolveDeadline: string | null;
  escalated: boolean;
  resolvedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  photos?: TicketPhotoResponse[];
  comments?: TicketCommentResponse[];
  assignments?: TicketAssignmentResponse[];
  reporter?: { firstName: string; lastName: string };
  unit?: { unitNumber: string; property?: { name: string } };
}

export interface TicketPhotoResponse {
  id: string;
  url: string;
  caption: string | null;
  orderIndex: number;
  createdAt: string;
}

export interface TicketCommentResponse {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  author?: { firstName: string; lastName: string };
}

export interface TicketAssignmentResponse {
  id: string;
  contractorId: string;
  costEstimate: number | null;
  finalCost: number | null;
  assignedAt: string;
  completedAt: string | null;
  contractor?: { firstName: string; lastName: string };
}

// ── Document ──
export interface DocumentResponse {
  id: string;
  propertyId: string;
  name: string;
  type: string;
  mimeType: string;
  size: number;
  s3Key: string;
  uploadedById: string;
  createdAt: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  documentId: string;
  s3Key: string;
}

// ── Dashboard ──
export interface DashboardStats {
  openTickets: number;
  urgentTickets: number;
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  recentTickets: TicketResponse[];
}
