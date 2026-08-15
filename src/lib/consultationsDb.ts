import fs from "fs";
import path from "path";
import os from "os";

export interface TimeRange {
  id: string;
  startTime: string; // HH:mm format, e.g. "10:00"
  endTime: string;   // HH:mm format, e.g. "17:00"
}

export interface DayAvailability {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;   // "Monday", "Tuesday", etc.
  enabled: boolean;
  ranges: TimeRange[];
}

export interface WeeklyAvailability {
  durationMinutes: number; // 15, 30, 45, 60
  days: DayAvailability[];
  updatedAt: string;
}

export type BookingStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requestedDate: string; // YYYY-MM-DD
  requestedTime: string; // HH:mm (24-hour)
  duration: number; // in minutes
  consultationMode: string;
  service: string;
  message: string;
  status: BookingStatus;
  declineReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type SenderType = "CUSTOMER" | "ADMIN" | "SYSTEM";

export interface BookingMessage {
  id: string;
  bookingId: string;
  senderType: SenderType;
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
}

export interface DatabaseSchema {
  availability: WeeklyAvailability;
  bookings: Booking[];
  messages: BookingMessage[];
}

const PRIMARY_DATA_DIR = path.join(process.cwd(), "src", "data");
const PRIMARY_DB_FILE = path.join(PRIMARY_DATA_DIR, "consultations.json");
const TMP_DB_FILE = path.join(os.tmpdir(), "consultations.json");

// In-memory cache for fast reads and fallback in serverless runtimes
let inMemoryDb: DatabaseSchema | null = null;

const DEFAULT_AVAILABILITY: WeeklyAvailability = {
  durationMinutes: 30,
  days: [
    {
      dayOfWeek: 1,
      dayName: "Monday",
      enabled: true,
      ranges: [{ id: "mon-1", startTime: "10:00", endTime: "17:00" }],
    },
    {
      dayOfWeek: 2,
      dayName: "Tuesday",
      enabled: true,
      ranges: [{ id: "tue-1", startTime: "10:00", endTime: "17:00" }],
    },
    {
      dayOfWeek: 3,
      dayName: "Wednesday",
      enabled: false,
      ranges: [{ id: "wed-1", startTime: "10:00", endTime: "17:00" }],
    },
    {
      dayOfWeek: 4,
      dayName: "Thursday",
      enabled: true,
      ranges: [{ id: "thu-1", startTime: "10:00", endTime: "17:00" }],
    },
    {
      dayOfWeek: 5,
      dayName: "Friday",
      enabled: true,
      ranges: [{ id: "fri-1", startTime: "10:00", endTime: "15:00" }],
    },
    {
      dayOfWeek: 6,
      dayName: "Saturday",
      enabled: false,
      ranges: [{ id: "sat-1", startTime: "10:00", endTime: "17:00" }],
    },
    {
      dayOfWeek: 0,
      dayName: "Sunday",
      enabled: false,
      ranges: [{ id: "sun-1", startTime: "10:00", endTime: "17:00" }],
    },
  ],
  updatedAt: new Date().toISOString(),
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BKG-2026-001",
    customerName: "Sanjay Singhania",
    customerEmail: "sanjay@singhaniatech.com",
    customerPhone: "+91 98123 45678",
    requestedDate: "2026-08-10",
    requestedTime: "11:00",
    duration: 30,
    consultationMode: "Online Video Call",
    service: "Income Tax Advisory",
    message: "Need urgent advisory regarding cross-border software royalty taxation.",
    status: "ACCEPTED",
    createdAt: "2026-08-05T09:30:00.000Z",
    updatedAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "BKG-2026-002",
    customerName: "Neha Kapoor",
    customerEmail: "neha.k@kapoorfashion.in",
    customerPhone: "+91 99887 66554",
    requestedDate: "2026-08-11",
    requestedTime: "14:30",
    duration: 30,
    consultationMode: "Office Visit (Vikaspuri)",
    service: "GST Registration & Refunds",
    message: "Seeking assistance with export GST refund claims under LUT.",
    status: "PENDING",
    createdAt: "2026-08-07T14:15:00.000Z",
    updatedAt: "2026-08-07T14:15:00.000Z",
  },
];

const INITIAL_MESSAGES: BookingMessage[] = [
  {
    id: "MSG-001",
    bookingId: "BKG-2026-001",
    senderType: "CUSTOMER",
    senderName: "Sanjay Singhania",
    senderEmail: "sanjay@singhaniatech.com",
    message: "Need urgent advisory regarding cross-border software royalty taxation.",
    createdAt: "2026-08-05T09:30:00.000Z",
  },
  {
    id: "MSG-002",
    bookingId: "BKG-2026-001",
    senderType: "SYSTEM",
    senderName: "System",
    senderEmail: "system@pacoadvisory.com",
    message: "Booking status changed to ACCEPTED.",
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "MSG-003",
    bookingId: "BKG-2026-002",
    senderType: "CUSTOMER",
    senderName: "Neha Kapoor",
    senderEmail: "neha.k@kapoorfashion.in",
    message: "Seeking assistance with export GST refund claims under LUT.",
    createdAt: "2026-08-07T14:15:00.000Z",
  },
];

export function readDb(): DatabaseSchema {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  // 1. Try reading from OS temp directory (stores recent changes during serverless runtime)
  if (fs.existsSync(TMP_DB_FILE)) {
    try {
      const raw = fs.readFileSync(TMP_DB_FILE, "utf-8");
      const data = JSON.parse(raw) as DatabaseSchema;
      if (data && data.availability && Array.isArray(data.bookings)) {
        inMemoryDb = data;
        return inMemoryDb;
      }
    } catch {
      // Fall through if file read fails or corrupt
    }
  }

  // 2. Try reading from bundled project file (src/data/consultations.json)
  if (fs.existsSync(PRIMARY_DB_FILE)) {
    try {
      const raw = fs.readFileSync(PRIMARY_DB_FILE, "utf-8");
      const data = JSON.parse(raw) as DatabaseSchema;
      if (data && data.availability && Array.isArray(data.bookings)) {
        inMemoryDb = data;
        return inMemoryDb;
      }
    } catch {
      // Fall through if file read fails or corrupt
    }
  }

  // 3. Fallback default
  inMemoryDb = {
    availability: DEFAULT_AVAILABILITY,
    bookings: INITIAL_BOOKINGS,
    messages: INITIAL_MESSAGES,
  };
  return inMemoryDb;
}

export function writeDb(data: DatabaseSchema): void {
  inMemoryDb = data;
  const jsonContent = JSON.stringify(data, null, 2);

  // 1. Try writing to primary project data path (works in local development)
  try {
    if (!fs.existsSync(PRIMARY_DATA_DIR)) {
      fs.mkdirSync(PRIMARY_DATA_DIR, { recursive: true });
    }
    const tempFile = `${PRIMARY_DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, jsonContent, "utf-8");
    fs.renameSync(tempFile, PRIMARY_DB_FILE);
    return;
  } catch (primaryErr) {
    console.warn(
      "[consultationsDb] Unable to write to primary project directory (read-only filesystem):",
      (primaryErr as Error).message
    );
  }

  // 2. Fallback: Write to OS temp directory (works in serverless environments like Vercel /tmp)
  try {
    const tmpTempFile = `${TMP_DB_FILE}.tmp`;
    fs.writeFileSync(tmpTempFile, jsonContent, "utf-8");
    fs.renameSync(tmpTempFile, TMP_DB_FILE);
  } catch (tmpErr) {
    console.warn(
      "[consultationsDb] Unable to write to temp directory:",
      (tmpErr as Error).message
    );
  }
}

// Data Access Helper Functions
export function getWeeklyAvailability(): WeeklyAvailability {
  const db = readDb();
  return db.availability;
}

export function saveWeeklyAvailability(availability: WeeklyAvailability): WeeklyAvailability {
  const db = readDb();
  db.availability = {
    ...availability,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.availability;
}

export function getBookings(): Booking[] {
  const db = readDb();
  return db.bookings;
}

export function getBookingById(id: string): Booking | undefined {
  const db = readDb();
  return db.bookings.find((b) => b.id === id);
}

export function createBooking(data: Omit<Booking, "id" | "createdAt" | "updatedAt">): { booking: Booking; message: BookingMessage } {
  const db = readDb();
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `BKG-${new Date().getFullYear()}-${randomSuffix}`;

  const newBooking: Booking = {
    ...data,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const initialMsg: BookingMessage = {
    id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: id,
    senderType: "CUSTOMER",
    senderName: data.customerName,
    senderEmail: data.customerEmail,
    message: data.message || "Requested consultation booking.",
    createdAt: timestamp,
  };

  db.bookings.unshift(newBooking);
  db.messages.push(initialMsg);

  writeDb(db);
  return { booking: newBooking, message: initialMsg };
}

export function updateBookingStatus(
  id: string,
  status: BookingStatus,
  declineReason?: string
): Booking | undefined {
  const db = readDb();
  const index = db.bookings.findIndex((b) => b.id === id);
  if (index === -1) return undefined;

  const timestamp = new Date().toISOString();
  db.bookings[index].status = status;
  if (declineReason !== undefined) {
    db.bookings[index].declineReason = declineReason;
  }
  db.bookings[index].updatedAt = timestamp;

  // Add a system event log message
  const systemMsg: BookingMessage = {
    id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: id,
    senderType: "SYSTEM",
    senderName: "System",
    senderEmail: "system@pacoadvisory.com",
    message: declineReason
      ? `Booking status updated to ${status}. Reason: ${declineReason}`
      : `Booking status updated to ${status}.`,
    createdAt: timestamp,
  };
  db.messages.push(systemMsg);

  writeDb(db);
  return db.bookings[index];
}

export function getBookingMessages(bookingId: string): BookingMessage[] {
  const db = readDb();
  return db.messages
    .filter((m) => m.bookingId === bookingId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addBookingMessage(
  bookingId: string,
  senderType: SenderType,
  senderName: string,
  senderEmail: string,
  messageText: string
): BookingMessage {
  const db = readDb();
  const timestamp = new Date().toISOString();
  const newMsg: BookingMessage = {
    id: `MSG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId,
    senderType,
    senderName,
    senderEmail,
    message: messageText,
    createdAt: timestamp,
  };

  db.messages.push(newMsg);
  
  // Touch updatedAt on the booking
  const bIndex = db.bookings.findIndex((b) => b.id === bookingId);
  if (bIndex !== -1) {
    db.bookings[bIndex].updatedAt = timestamp;
  }

  writeDb(db);
  return newMsg;
}
