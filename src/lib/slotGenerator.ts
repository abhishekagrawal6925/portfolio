import { WeeklyAvailability, Booking } from "./consultationsDb";

export interface TimeSlot {
  time: string;          // 24h format, e.g. "14:30"
  formattedTime: string; // 12h format, e.g. "02:30 PM"
  available: boolean;
  reason?: string;       // e.g. "Already Booked" | "Unavailable"
}

// Convert "HH:mm" string into minutes from midnight
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convert minutes from midnight into 24h "HH:mm" string
export function minutesToTime(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

// Convert "HH:mm" 24h string to user-friendly "hh:mm AM/PM" string
export function format12Hour(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
}

// Determine day of week index (0=Sun, 1=Mon, ..., 6=Sat) for a date string "YYYY-MM-DD"
export function getDayOfWeekForDate(dateStr: string): number {
  // Using explicit UTC parsing of YYYY-MM-DD to avoid timezone shifting issues
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCDay();
}

/**
 * Generates all candidate timeslots for a given date based on recurring weekly schedule,
 * consultation duration, and existing pending/accepted bookings.
 */
export function generateAvailableSlots(
  dateStr: string,
  availability: WeeklyAvailability,
  existingBookings: Booking[]
): TimeSlot[] {
  const dayOfWeek = getDayOfWeekForDate(dateStr);
  const dayConfig = availability.days.find((d) => d.dayOfWeek === dayOfWeek);

  if (!dayConfig || !dayConfig.enabled || !dayConfig.ranges || dayConfig.ranges.length === 0) {
    return [];
  }

  const duration = availability.durationMinutes || 30;

  // Filter relevant bookings for this date that block slots (PENDING and ACCEPTED)
  const activeBookings = existingBookings.filter(
    (b) => b.requestedDate === dateStr && (b.status === "PENDING" || b.status === "ACCEPTED")
  );

  const slots: TimeSlot[] = [];

  for (const range of dayConfig.ranges) {
    if (!range.startTime || !range.endTime) continue;

    const rangeStartMins = timeToMinutes(range.startTime);
    const rangeEndMins = timeToMinutes(range.endTime);

    let currentStartMins = rangeStartMins;

    while (currentStartMins + duration <= rangeEndMins) {
      const currentEndMins = currentStartMins + duration;
      const slotTimeStr = minutesToTime(currentStartMins);

      // Check if slot overlaps with any active booking
      const isOverlapping = activeBookings.some((booking) => {
        const bookingStartMins = timeToMinutes(booking.requestedTime);
        const bookingDuration = booking.duration || duration;
        const bookingEndMins = bookingStartMins + bookingDuration;

        // Overlap condition: start < end && end > start
        return currentStartMins < bookingEndMins && currentEndMins > bookingStartMins;
      });

      slots.push({
        time: slotTimeStr,
        formattedTime: format12Hour(slotTimeStr),
        available: !isOverlapping,
        reason: isOverlapping ? "Already Booked" : undefined,
      });

      // Increment by duration (or 30 mins if duration is 15 to keep tidy 15/30 min intervals)
      const increment = Math.max(15, duration);
      currentStartMins += increment;
    }
  }

  return slots;
}

/**
 * Server-side strict slot availability validator.
 */
export function isSlotAvailable(
  dateStr: string,
  timeStr: string,
  duration: number,
  availability: WeeklyAvailability,
  existingBookings: Booking[]
): { valid: boolean; reason?: string } {
  const dayOfWeek = getDayOfWeekForDate(dateStr);
  const dayConfig = availability.days.find((d) => d.dayOfWeek === dayOfWeek);

  if (!dayConfig || !dayConfig.enabled) {
    return { valid: false, reason: "Consultations are not available on this day of the week." };
  }

  const reqStartMins = timeToMinutes(timeStr);
  const reqEndMins = reqStartMins + duration;

  // Verify requested slot lies within one of the enabled time ranges
  const fitsInRange = dayConfig.ranges.some((range) => {
    const rStart = timeToMinutes(range.startTime);
    const rEnd = timeToMinutes(range.endTime);
    return reqStartMins >= rStart && reqEndMins <= rEnd;
  });

  if (!fitsInRange) {
    return { valid: false, reason: "Requested time slot falls outside configured availability hours." };
  }

  // Verify no overlap with existing PENDING or ACCEPTED bookings
  const activeBookings = existingBookings.filter(
    (b) => b.requestedDate === dateStr && (b.status === "PENDING" || b.status === "ACCEPTED")
  );

  const hasConflict = activeBookings.some((booking) => {
    const bStart = timeToMinutes(booking.requestedTime);
    const bEnd = bStart + (booking.duration || duration);
    return reqStartMins < bEnd && reqEndMins > bStart;
  });

  if (hasConflict) {
    return { valid: false, reason: "This time slot has already been requested or booked by another customer." };
  }

  return { valid: true };
}
