"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, ShieldCheck, Calendar, Clock, AlertCircle, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface TimeSlot {
  time: string;
  formattedTime: string;
  available: boolean;
  reason?: string;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service & Mode, 2: Date & Slot, 3: Details, 4: Confirmed
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Dates selection (Next 14 Days)
  const [availableDates, setAvailableDates] = useState<{ dateStr: string; dayName: string; monthDay: string; dayOfWeek: number }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Online Video Call",
    service: "Income Tax Planning & Filing",
    message: "",
  });

  // Generate next 14 days starting from today in YYYY-MM-DD
  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const dayOfWeek = d.getDay();

      dates.push({ dateStr, dayName, monthDay, dayOfWeek });
    }
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Fetch slots whenever selectedDate changes
  const fetchSlotsForDate = useCallback(async (dateStr: string) => {
    if (!dateStr) return;
    setLoadingSlots(true);
    setErrorMessage("");
    setSelectedSlot("");
    try {
      const res = await fetch(`/api/slots?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        setTimeSlots(data.slots || []);
        setDurationMinutes(data.durationMinutes || 30);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to load time slots");
        setTimeSlots([]);
      }
    } catch {
      setErrorMessage("Network error fetching availability slots");
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && selectedDate) {
      fetchSlotsForDate(selectedDate);
    }
  }, [isOpen, selectedDate, fetchSlotsForDate]);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          requestedDate: selectedDate,
          requestedTime: selectedSlot,
          consultationMode: form.mode,
          service: form.service,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to confirm consultation booking.");
        setSubmitting(false);
        return;
      }

      setStep(4);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      setErrorMessage("Network error during booking submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setErrorMessage("");
    setSelectedSlot("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-4 text-slate-900"
        >
          {/* Header */}
          <div className="bg-[#0F3040] text-white p-6 sm:p-8 relative">
            <button
              onClick={resetAndClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium tracking-wide uppercase mb-2 text-[#D99B7F]">
              Personalized CA Consultation
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Book Advisory Session</h3>
            <p className="text-xs text-stone-300 mt-1">
              Direct interaction with Mr. Pankaj Agrawal (FCA) &bull; {durationMinutes} Mins Session
            </p>

            {/* Stepper Progress Bar */}
            {step < 4 && (
              <div className="flex items-center space-x-2 mt-5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                      step >= s ? "bg-[#D99B7F]" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 bg-white">
            {errorMessage && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: SERVICE & MODE */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    1. Select Advisory Service *
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3040] transition-all"
                  >
                    <option value="Income Tax Planning & Filing">Income Tax Planning & Filing</option>
                    <option value="GST Registration & Refunds">GST Registration & Refunds</option>
                    <option value="Tax Appeals & Notice Resolution">Tax Appeals & Notice Resolution</option>
                    <option value="Statutory & Tax Audit">Statutory & Tax Audit</option>
                    <option value="Company Incorporation & ROC">Company Incorporation & ROC</option>
                    <option value="Virtual CFO & Advisory">Virtual CFO & Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    2. Select Consultation Mode *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { mode: "Online Video Call", sub: "Google Meet link" },
                      { mode: "Office Visit (Vikaspuri)", sub: "In-person New Delhi" },
                      { mode: "Direct Phone Call", sub: "Phone discussion" },
                    ].map((item) => (
                      <button
                        key={item.mode}
                        type="button"
                        onClick={() => setForm({ ...form, mode: item.mode })}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                          form.mode === item.mode
                            ? "border-[#0F3040] bg-[#0F3040]/5 ring-2 ring-[#0F3040]"
                            : "border-stone-200 bg-stone-50 hover:bg-stone-100"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900">{item.mode.split(" ")[0]} {item.mode.split(" ")[1]}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-[#0F3040] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#164257] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Select Date & Time Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SLOT */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0F3040]" />
                      <span>Select Date *</span>
                    </label>
                    <span className="text-[11px] text-slate-500">Recurring schedule auto-applied</span>
                  </div>

                  {/* Horizontal Scrollable Dates Row */}
                  <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-thin">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`flex-shrink-0 px-3.5 py-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#0F3040] bg-[#0F3040] text-white font-bold shadow-md"
                              : "border-stone-200 bg-stone-50 hover:bg-stone-100 text-slate-800"
                          }`}
                        >
                          <span className="block text-[10px] uppercase tracking-wider opacity-80">{item.dayName}</span>
                          <span className="block text-xs font-bold mt-0.5">{item.monthDay}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#0F3040]" />
                      <span>Select Available Time Slot ({durationMinutes} mins) *</span>
                    </label>
                    {loadingSlots && (
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin text-[#0F3040]" /> Updating...
                      </span>
                    )}
                  </div>

                  {loadingSlots ? (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      Checking recurring schedule & existing bookings...
                    </div>
                  ) : timeSlots.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center">
                      <p className="font-semibold">No consultation slots available on this date.</p>
                      <p className="text-[11px] text-amber-700 mt-1">
                        The owner is unavailable on this day. Please pick another date above.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                              !slot.available
                                ? "bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through"
                                : isSelected
                                ? "bg-[#0F3040] text-white border-[#0F3040] shadow-md ring-2 ring-[#0F3040]"
                                : "bg-stone-50 hover:bg-stone-100 text-slate-800 border-stone-200 cursor-pointer"
                            }`}
                          >
                            {slot.formattedTime}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-slate-700 text-xs font-semibold hover:bg-stone-50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-[#0F3040] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#164257] transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Enter Contact Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CUSTOMER DETAILS FORM */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Summary Pill */}
                <div className="p-3 bg-[#0F3040]/5 rounded-2xl border border-[#0F3040]/15 flex items-center justify-between text-xs text-slate-800">
                  <div>
                    <span className="font-bold text-[#0F3040]">{form.service}</span>
                    <span className="block text-[11px] text-slate-600 mt-0.5">
                      {selectedDate} @ {selectedSlot} ({form.mode})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[11px] font-bold text-[#0F3040] underline hover:text-[#164257] cursor-pointer"
                  >
                    Change Slot
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98123 45678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Consultation Topic / Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you'd like to discuss (e.g. GST notice reply, Income tax audit...)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-slate-700 text-xs font-semibold hover:bg-stone-50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3.5 rounded-xl bg-[#0F3040] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#164257] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Reserving Slot...
                      </span>
                    ) : (
                      <>
                        <span>Confirm Consultation</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F3040]" />
                  <span>Strict confidentiality maintained for all financial & tax disclosures.</span>
                </div>
              </form>
            )}

            {/* STEP 4: CONFIRMED */}
            {step === 4 && (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  Consultation Submitted!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm">
                  Your advisory request for <strong className="text-slate-900">{form.service}</strong> on{" "}
                  <strong className="text-[#0F3040]">{selectedDate}</strong> at <strong className="text-[#0F3040]">{selectedSlot}</strong> has been submitted.
                </p>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5 w-full max-w-md">
                  <p className="text-slate-700"><strong>Status:</strong> <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pending Review</span></p>
                  <p className="text-slate-700"><strong>Email:</strong> {form.email}</p>
                  <p className="text-slate-700"><strong>Mode:</strong> {form.mode}</p>
                </div>
                <p className="text-[11px] text-slate-500">
                  An email notification has been dispatched to Mr. Pankaj Agrawal. Once accepted, you will receive a confirmation email.
                </p>
                <button
                  onClick={resetAndClose}
                  className="mt-2 px-8 py-3 rounded-xl bg-[#0F3040] text-white text-xs font-bold hover:bg-[#164257] transition-colors cursor-pointer shadow-md"
                >
                  Close & Return to Portfolio
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
