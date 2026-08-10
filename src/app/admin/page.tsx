"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
  CheckCircle2,
  Clock,
  FileText,
  Settings,
  Users,
  BarChart3,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  KeyRound,
  Ban,
  Building2,
  Phone,
  Mail,
  RefreshCw,
  Sparkles,
  Calendar,
  Plus,
  Trash2,
  Send,
  MessageSquare,
  XCircle,
  Check,
} from "lucide-react";

import { WeeklyAvailability, Booking, BookingMessage, DayAvailability, TimeRange } from "@/lib/consultationsDb";
import { format12Hour } from "@/lib/slotGenerator";

interface Inquiry {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone: string;
  serviceRequested: string;
  date: string;
  status: "New" | "In Progress" | "Completed" | "Archived";
  notes: string;
}

export default function AdminPortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("admin");

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState<"inquiries" | "consultations" | "availability" | "services" | "security">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Consultation Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingMessages, setBookingMessages] = useState<BookingMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Decline Modal State
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [declineReasonText, setDeclineReasonText] = useState("");

  // Weekly Availability State
  const [availability, setAvailability] = useState<WeeklyAvailability | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  // Toast Feedback State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check current session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/session");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setCurrentUser(data.user.username);
          fetchInquiries();
          fetchBookings();
          fetchAvailability();
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const fetchAvailability = async () => {
    setIsLoadingAvailability(true);
    try {
      const res = await fetch("/api/admin/availability");
      if (res.ok) {
        const data = await res.json();
        setAvailability(data.availability || null);
      }
    } catch (err) {
      console.error("Failed to load availability", err);
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  const fetchBookingMessages = useCallback(async (bookingId: string) => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/messages`);
      if (res.ok) {
        const data = await res.json();
        setBookingMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (selectedBooking) {
      fetchBookingMessages(selectedBooking.id);
    }
  }, [selectedBooking, fetchBookingMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Authentication failed");
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      setCurrentUser(data.user.username);
      setPassword("");
      fetchInquiries();
      fetchBookings();
      fetchAvailability();
    } catch {
      setLoginError("Connection error. Please check backend status.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    }
  };

  const updateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as Inquiry["status"] } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as Inquiry["status"] } : null));
        }
        showToast(`Inquiry ${id} status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error("Failed to update inquiry status", err);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string, declineReason?: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, declineReason }),
      });

      const data = await res.json();

      if (res.ok && data.booking) {
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? data.booking : b)));
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(data.booking);
          fetchBookingMessages(bookingId);
        }
        showToast(`Booking ${bookingId} status updated to ${status}`);
        if (declineModalOpen) {
          setDeclineModalOpen(false);
          setDeclineReasonText("");
        }
      } else {
        showToast(data.error || "Failed to update status", "error");
      }
    } catch {
      showToast("Network error updating booking status", "error");
    }
  };

  const handleSendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !replyText.trim()) return;

    setIsSendingReply(true);
    try {
      const res = await fetch(`/api/admin/bookings/${selectedBooking.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setBookingMessages((prev) => [...prev, data.message]);
        setReplyText("");
        showToast(`Reply dispatched to ${selectedBooking.customerEmail}`);
      } else {
        showToast(data.error || "Failed to send reply", "error");
      }
    } catch {
      showToast("Network error sending reply", "error");
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleSaveAvailability = async () => {
    if (!availability) return;
    setIsSavingAvailability(true);
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(availability),
      });

      const data = await res.json();
      if (res.ok && data.availability) {
        setAvailability(data.availability);
        showToast("Weekly availability schedule updated successfully!");
      } else {
        showToast(data.error || "Failed to save availability", "error");
      }
    } catch {
      showToast("Network error saving availability", "error");
    } finally {
      setIsSavingAvailability(false);
    }
  };

  // Helper functions to edit availability day schedules
  const updateDayEnabled = (dayOfWeek: number, enabled: boolean) => {
    if (!availability) return;
    setAvailability({
      ...availability,
      days: availability.days.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, enabled } : d)),
    });
  };

  const addTimeRange = (dayOfWeek: number) => {
    if (!availability) return;
    setAvailability({
      ...availability,
      days: availability.days.map((d) => {
        if (d.dayOfWeek === dayOfWeek) {
          const newRange: TimeRange = {
            id: `range-${Date.now()}`,
            startTime: "14:00",
            endTime: "17:00",
          };
          return { ...d, ranges: [...d.ranges, newRange] };
        }
        return d;
      }),
    });
  };

  const removeTimeRange = (dayOfWeek: number, rangeId: string) => {
    if (!availability) return;
    setAvailability({
      ...availability,
      days: availability.days.map((d) => {
        if (d.dayOfWeek === dayOfWeek) {
          return { ...d, ranges: d.ranges.filter((r) => r.id !== rangeId) };
        }
        return d;
      }),
    });
  };

  const updateTimeRange = (dayOfWeek: number, rangeId: string, field: "startTime" | "endTime", value: string) => {
    if (!availability) return;
    setAvailability({
      ...availability,
      days: availability.days.map((d) => {
        if (d.dayOfWeek === dayOfWeek) {
          return {
            ...d,
            ranges: d.ranges.map((r) => (r.id === rangeId ? { ...r, [field]: value } : r)),
          };
        }
        return d;
      }),
    });
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.requestedDate.includes(searchTerm);
    const matchesStatus = bookingStatusFilter === "All" || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Loading Session Screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FAF2EE] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#0F3040] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif text-[#0F3040] font-medium tracking-wide">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF2EE] text-slate-900 font-sans selection:bg-[#0F3040] selection:text-[#D99B7F] relative">
      {/* Global Toast Banner */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center space-x-2.5 ${
              toast.type === "success"
                ? "bg-slate-900 text-white border-slate-800"
                : "bg-red-900 text-white border-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#D99B7F]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* ========================================================= */
          /*                       LOGIN PORTAL                        */
          /* ========================================================= */
          <motion.div
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
              {/* Header Branding */}
              <div className="bg-[#0F3040] px-8 py-10 text-white relative overflow-hidden text-center">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#D99B7F]/15 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#D99B7F]" />
                  <span className="text-xs tracking-widest uppercase font-semibold text-white/90">
                    Pankaj Agrawal & Co.
                  </span>
                </div>

                <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
                  Admin Portal
                </h1>
                <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xs mx-auto">
                  Single-administrator access for taxation, consultations & compliance
                </p>
              </div>

              {/* Form Section */}
              <div className="p-8 space-y-6">
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter admin username"
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="w-full pl-10 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-slate-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040] text-sm transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-slate-700 text-xs flex items-start space-x-2.5">
                    <Ban className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900">Security Policy Notice:</span> Single static password active. Credential recovery disabled.
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3.5 px-6 bg-[#0F3040] hover:bg-[#164257] active:bg-[#0a2330] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2 text-center border-t border-stone-100">
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-[#0F3040] transition-colors"
                  >
                    <span>Return to main website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /*                    AUTHENTICATED DASHBOARD                */
          /* ========================================================= */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* Top Bar Navigation */}
            <header className="bg-[#0F3040] text-white sticky top-0 z-40 shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D99B7F] text-[#0F3040] font-serif font-bold text-lg flex items-center justify-center shadow-md">
                    PA
                  </div>
                  <div>
                    <h1 className="font-serif text-lg font-bold tracking-wide text-white">
                      Pankaj Agrawal & Co.
                    </h1>
                    <p className="text-xs text-stone-300">Admin Control Panel</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-5">
                  <Link
                    href="/"
                    target="_blank"
                    className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                  >
                    <span>Live Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                    <User className="w-3.5 h-3.5 text-[#D99B7F]" />
                    <span className="text-xs font-medium text-white">{currentUser}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs px-3.5 py-1.5 rounded-lg transition-all border border-red-500/30 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Dashboard Body Container */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Bookings</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{bookings.length}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Pending</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">
                      {bookings.filter((b) => b.status === "PENDING").length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Accepted</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">
                      {bookings.filter((b) => b.status === "ACCEPTED").length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Declined</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">
                      {bookings.filter((b) => b.status === "DECLINED").length}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0F3040]/10 text-[#0F3040] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Lead Inquiries</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{inquiries.length}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-stone-200 space-x-6 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`pb-3 font-semibold text-sm border-b-2 flex items-center space-x-2 cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === "inquiries"
                      ? "border-[#0F3040] text-[#0F3040]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>General Inquiries & Leads</span>
                  <span className="ml-1 bg-stone-100 text-slate-700 text-xs px-2 py-0.5 rounded-full">
                    {inquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("consultations")}
                  className={`pb-3 font-semibold text-sm border-b-2 flex items-center space-x-2 cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === "consultations"
                      ? "border-[#0F3040] text-[#0F3040]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Calendar className="w-4 h-4 text-[#D99B7F]" />
                  <span className="font-bold text-slate-900">Consultation Bookings</span>
                  <span className="ml-1 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
                    {bookings.filter((b) => b.status === "PENDING").length} New
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("availability")}
                  className={`pb-3 font-semibold text-sm border-b-2 flex items-center space-x-2 cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === "availability"
                      ? "border-[#0F3040] text-[#0F3040]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Weekly Availability Schedule</span>
                </button>

                <button
                  onClick={() => setActiveTab("services")}
                  className={`pb-3 font-semibold text-sm border-b-2 flex items-center space-x-2 cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === "services"
                      ? "border-[#0F3040] text-[#0F3040]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Service Offerings</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`pb-3 font-semibold text-sm border-b-2 flex items-center space-x-2 cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === "security"
                      ? "border-[#0F3040] text-[#0F3040]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Security & Auth</span>
                </button>
              </div>

              {/* TAB 1: CONSULTATIONS BOOKINGS SYSTEM */}
              {activeTab === "consultations" && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search customer, email, date (YYYY-MM-DD), or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3040] text-slate-800"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">Booking Status:</span>
                      <select
                        value={bookingStatusFilter}
                        onChange={(e) => setBookingStatusFilter(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F3040]"
                      >
                        <option value="All">All Statuses ({bookings.length})</option>
                        <option value="PENDING">Pending Review</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="DECLINED">Declined</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>

                      <button
                        onClick={fetchBookings}
                        className="p-2 text-slate-600 hover:bg-stone-100 rounded-xl border border-stone-200 transition-colors cursor-pointer"
                        title="Refresh Bookings"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoadingBookings ? "animate-spin" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Consultation Bookings Table */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-4">Booking ID</th>
                            <th className="px-6 py-4">Customer Details</th>
                            <th className="px-6 py-4">Requested Slot</th>
                            <th className="px-6 py-4">Service & Mode</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-sm">
                          {filteredBookings.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No consultation bookings found matching your filters.
                              </td>
                            </tr>
                          ) : (
                            filteredBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-bold text-[#0F3040]">
                                  {booking.id}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-semibold text-slate-900">{booking.customerName}</div>
                                  <div className="text-xs text-slate-500">{booking.customerEmail}</div>
                                  {booking.customerPhone && (
                                    <div className="text-[11px] text-slate-400">{booking.customerPhone}</div>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-bold text-[#0F3040] text-xs">
                                    {booking.requestedDate}
                                  </div>
                                  <div className="text-xs text-slate-600 font-semibold mt-0.5">
                                    {format12Hour(booking.requestedTime)} ({booking.duration}m)
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-medium text-slate-800 text-xs">{booking.service}</div>
                                  <div className="text-[11px] text-slate-500 mt-0.5">{booking.consultationMode}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                      booking.status === "PENDING"
                                        ? "bg-amber-100 text-amber-900"
                                        : booking.status === "ACCEPTED"
                                        ? "bg-emerald-100 text-emerald-900"
                                        : booking.status === "DECLINED"
                                        ? "bg-red-100 text-red-900"
                                        : booking.status === "COMPLETED"
                                        ? "bg-blue-100 text-blue-900"
                                        : "bg-stone-100 text-stone-700"
                                    }`}
                                  >
                                    {booking.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                  <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="px-3 py-1.5 bg-[#0F3040] hover:bg-[#164257] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                                  >
                                    Manage & Reply
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WEEKLY RECURRING AVAILABILITY SETTINGS */}
              {activeTab === "availability" && (
                <div className="space-y-6">
                  {isLoadingAvailability ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                      Loading availability schedule...
                    </div>
                  ) : !availability ? (
                    <div className="p-6 bg-red-50 text-red-700 rounded-2xl">
                      Failed to load weekly availability settings.
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8">
                      {/* Top Controls Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-6 gap-4">
                        <div>
                          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F3040]/10 text-[#0F3040] text-xs font-bold mb-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Recurring Weekly Availability System</span>
                          </div>
                          <h2 className="font-serif text-2xl font-bold text-slate-900">
                            Consultation Hours & Schedule
                          </h2>
                          <p className="text-xs text-slate-500 mt-1 max-w-xl">
                            Configure your weekly recurring schedule once. Slots repeat automatically for future weeks without manual creation.
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Consultation Duration
                            </label>
                            <select
                              value={availability.durationMinutes}
                              onChange={(e) =>
                                setAvailability({
                                  ...availability,
                                  durationMinutes: Number(e.target.value),
                                })
                              }
                              className="px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-[#0F3040] focus:outline-none focus:ring-2 focus:ring-[#0F3040]"
                            >
                              <option value={15}>15 Minutes</option>
                              <option value={30}>30 Minutes (Recommended)</option>
                              <option value={45}>45 Minutes</option>
                              <option value={60}>60 Minutes (1 Hour)</option>
                            </select>
                          </div>

                          <button
                            onClick={handleSaveAvailability}
                            disabled={isSavingAvailability}
                            className="mt-4 sm:mt-0 px-6 py-2.5 bg-[#0F3040] hover:bg-[#164257] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-70"
                          >
                            {isSavingAvailability ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4 text-[#D99B7F]" />
                            )}
                            <span>Save Availability</span>
                          </button>
                        </div>
                      </div>

                      {/* Day-by-Day Schedule List */}
                      <div className="space-y-4">
                        {availability.days.map((day: DayAvailability) => (
                          <div
                            key={day.dayOfWeek}
                            className={`p-5 rounded-2xl border transition-all ${
                              day.enabled
                                ? "bg-stone-50/70 border-stone-200"
                                : "bg-stone-100/40 border-stone-200/60 opacity-60"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* Day Name & Toggle */}
                              <div className="flex items-center space-x-3 w-44 flex-shrink-0">
                                <input
                                  type="checkbox"
                                  id={`day-toggle-${day.dayOfWeek}`}
                                  checked={day.enabled}
                                  onChange={(e) => updateDayEnabled(day.dayOfWeek, e.target.checked)}
                                  className="w-5 h-5 accent-[#0F3040] rounded cursor-pointer"
                                />
                                <label
                                  htmlFor={`day-toggle-${day.dayOfWeek}`}
                                  className="font-serif font-bold text-base text-slate-900 cursor-pointer select-none"
                                >
                                  {day.dayName}
                                </label>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    day.enabled
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-stone-200 text-stone-600"
                                  }`}
                                >
                                  {day.enabled ? "Available" : "Off"}
                                </span>
                              </div>

                              {/* Time Ranges Manager */}
                              <div className="flex-1 space-y-2">
                                {day.enabled && day.ranges && day.ranges.length > 0 ? (
                                  day.ranges.map((range: TimeRange, rIdx: number) => (
                                    <div key={range.id || rIdx} className="flex items-center space-x-3 text-xs">
                                      <span className="text-slate-500 font-semibold w-16">
                                        Shift {rIdx + 1}:
                                      </span>
                                      <input
                                        type="time"
                                        value={range.startTime}
                                        onChange={(e) =>
                                          updateTimeRange(day.dayOfWeek, range.id, "startTime", e.target.value)
                                        }
                                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-mono text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0F3040]"
                                      />
                                      <span className="text-slate-400 font-bold">&mdash;</span>
                                      <input
                                        type="time"
                                        value={range.endTime}
                                        onChange={(e) =>
                                          updateTimeRange(day.dayOfWeek, range.id, "endTime", e.target.value)
                                        }
                                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-mono text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0F3040]"
                                      />
                                      {day.ranges.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => removeTimeRange(day.dayOfWeek, range.id)}
                                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                          title="Remove range"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-xs text-slate-400 italic">No working hours configured (Day Off)</span>
                                )}
                              </div>

                              {/* Add Range Button */}
                              {day.enabled && (
                                <button
                                  type="button"
                                  onClick={() => addTimeRange(day.dayOfWeek)}
                                  className="px-3 py-1.5 bg-white hover:bg-stone-100 text-[#0F3040] text-xs font-semibold rounded-lg border border-stone-200 transition-colors flex items-center space-x-1 cursor-pointer flex-shrink-0"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Split Shift / Lunch</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Save CTA */}
                      <div className="pt-4 border-t border-stone-100 flex justify-end">
                        <button
                          onClick={handleSaveAvailability}
                          disabled={isSavingAvailability}
                          className="px-8 py-3 bg-[#0F3040] hover:bg-[#164257] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-70"
                        >
                          {isSavingAvailability ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 text-[#D99B7F]" />
                          )}
                          <span>Save Availability Schedule</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INQUIRIES & LEADS */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by client name, company, email, or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3040] text-slate-800"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F3040]"
                      >
                        <option value="All">All Inquiries</option>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <button
                        onClick={fetchInquiries}
                        className="p-2 text-slate-600 hover:bg-stone-100 rounded-xl border border-stone-200 transition-colors"
                        title="Refresh Inquiries"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoadingInquiries ? "animate-spin" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Inquiries Table */}
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-4">Ref ID</th>
                            <th className="px-6 py-4">Client / Company</th>
                            <th className="px-6 py-4">Service Requested</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-sm">
                          {filteredInquiries.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No consultation inquiries found matching your filters.
                              </td>
                            </tr>
                          ) : (
                            filteredInquiries.map((item) => (
                              <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-semibold text-[#0F3040]">
                                  {item.id}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-semibold text-slate-900">{item.clientName}</div>
                                  <div className="text-xs text-slate-500 flex items-center space-x-1.5 mt-0.5">
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    <span>{item.company}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700">
                                  {item.serviceRequested}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                                  {new Date(item.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                      item.status === "New"
                                        ? "bg-amber-100 text-amber-800"
                                        : item.status === "In Progress"
                                        ? "bg-blue-100 text-blue-800"
                                        : item.status === "Completed"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-stone-100 text-stone-600"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                  <button
                                    onClick={() => setSelectedInquiry(item)}
                                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SERVICE OFFERINGS */}
              {activeTab === "services" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "GST Registration & Filing",
                      category: "Indirect Taxation",
                      status: "Active Offering",
                      leadCount: 14,
                      desc: "Complete GST registration, monthly GSTR-1 & 3B compliance, and annual reconciliation.",
                    },
                    {
                      name: "Income Tax Advisory & Filing",
                      category: "Direct Taxation",
                      status: "Active Offering",
                      leadCount: 28,
                      desc: "Individual & corporate income tax planning, advance tax calculation, and tax return submissions.",
                    },
                    {
                      name: "Statutory & Tax Audit",
                      category: "Assurance",
                      status: "Active Offering",
                      leadCount: 19,
                      desc: "Internal, statutory, and Section 44AB tax audits conducted according to ICAI standards.",
                    },
                    {
                      name: "ROC & MCA Compliances",
                      category: "Corporate Law",
                      status: "Active Offering",
                      leadCount: 11,
                      desc: "Company incorporation, DIR-3 KYC, AOC-4, MGT-7 annual filing compliance.",
                    },
                    {
                      name: "Accounting & Virtual CFO",
                      category: "Advisory",
                      status: "Active Offering",
                      leadCount: 8,
                      desc: "Full-stack cloud bookkeeping, financial statement preparation, and management reporting.",
                    },
                    {
                      name: "NRI Taxation & Advisory",
                      category: "Specialized",
                      status: "Active Offering",
                      leadCount: 6,
                      desc: "Form 15CA/15CB certificates, capital gains repatriations, and foreign asset disclosures.",
                    },
                  ].map((service, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#D99B7F] uppercase tracking-wider bg-[#FAF2EE] px-2.5 py-1 rounded-full">
                            {service.category}
                          </span>
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {service.status}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Total Inquiries: <strong className="text-slate-900">{service.leadCount}</strong></span>
                        <span className="text-[#0F3040] font-semibold cursor-pointer hover:underline">Manage Service &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: SECURITY POLICY & AUTHENTICATION */}
              {activeTab === "security" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 pb-4 border-b border-stone-100">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-slate-900">
                          Single-Password Security Protocol
                        </h3>
                        <p className="text-xs text-slate-500">
                          Configured credentials policy for Pankaj Agrawal & Co.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Administrator Username</p>
                        <p className="text-lg font-mono font-bold text-[#0F3040] mt-1">{currentUser}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Authentication Mode</p>
                        <p className="text-lg font-mono font-bold text-emerald-700 mt-1">Single Static Password</p>
                      </div>

                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Credential Recovery</p>
                        <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1">
                          <Ban className="w-4 h-4" />
                          <span>Forgot Password Disabled</span>
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Session Token Expiry</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">8 Hours (HTTP-Only Cookie)</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#0F3040] text-white space-y-3">
                      <div className="flex items-center space-x-2 text-[#D99B7F]">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Custom Credentials Override</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        To customize your administrator username and single password, define the environment variables in your server configuration file (<code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-200">.env</code>):
                      </p>
                      <div className="bg-slate-950 p-3.5 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
                        <div>ADMIN_USERNAME=admin</div>
                        <div>ADMIN_PASSWORD=your_secure_password_here</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
                      <ShieldCheck className="w-5 h-5 text-[#0F3040]" />
                      <span>Hardened Policy</span>
                    </h4>
                    <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>HTTP-only secure cookies prevent XSS session token hijacking.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>No public forgot-password endpoint exists, eliminating automated password reset attacks.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>Timing-safe HMAC comparison prevents side-channel timing attacks on login API.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Booking Drawer / Detail Modal */}
            {selectedBooking && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-stone-200 max-h-[90vh] overflow-y-auto my-6 text-slate-900"
                >
                  <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-[#0F3040] font-bold">{selectedBooking.id}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedBooking.status === "PENDING"
                              ? "bg-amber-100 text-amber-900"
                              : selectedBooking.status === "ACCEPTED"
                              ? "bg-emerald-100 text-emerald-900"
                              : selectedBooking.status === "DECLINED"
                              ? "bg-red-100 text-red-900"
                              : "bg-stone-100 text-stone-700"
                          }`}
                        >
                          {selectedBooking.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                        {selectedBooking.customerName}
                      </h3>
                      <p className="text-xs text-slate-500">{selectedBooking.service}</p>
                    </div>

                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Customer Info Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Email Address</span>
                      <a href={`mailto:${selectedBooking.customerEmail}`} className="text-[#0F3040] font-semibold flex items-center space-x-1 hover:underline">
                        <Mail className="w-3.5 h-3.5 text-[#0F3040]" />
                        <span>{selectedBooking.customerEmail}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Phone Number</span>
                      <a href={`tel:${selectedBooking.customerPhone}`} className="text-[#0F3040] font-semibold flex items-center space-x-1 hover:underline">
                        <Phone className="w-3.5 h-3.5 text-[#0F3040]" />
                        <span>{selectedBooking.customerPhone || "N/A"}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Requested Slot</span>
                      <span className="font-bold text-[#0F3040]">
                        {selectedBooking.requestedDate} @ {format12Hour(selectedBooking.requestedTime)} ({selectedBooking.duration} mins)
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Consultation Mode</span>
                      <span className="font-semibold text-slate-800">{selectedBooking.consultationMode}</span>
                    </div>
                  </div>

                  {/* Customer Message */}
                  {selectedBooking.message && (
                    <div className="text-xs">
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Customer Initial Notes</span>
                      <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 text-slate-800 italic">
                        &quot;{selectedBooking.message}&quot;
                      </div>
                    </div>
                  )}

                  {/* Booking Action Buttons */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Admin Actions</span>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedBooking.status !== "ACCEPTED" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBooking.id, "ACCEPTED")}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Confirm Email</span>
                        </button>
                      )}

                      {selectedBooking.status !== "DECLINED" && (
                        <button
                          onClick={() => setDeclineModalOpen(true)}
                          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline & Release Slot</span>
                        </button>
                      )}

                      {selectedBooking.status === "ACCEPTED" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBooking.id, "COMPLETED")}
                          className="px-4 py-2 bg-[#0F3040] hover:bg-[#164257] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}

                      {selectedBooking.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleUpdateBookingStatus(selectedBooking.id, "CANCELLED")}
                          className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Conversation & Message History Timeline */}
                  <div className="pt-4 border-t border-stone-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                        <MessageSquare className="w-4 h-4 text-[#0F3040]" />
                        <span>Communication & Event Timeline</span>
                      </span>
                      <span className="text-[11px] text-slate-500">{bookingMessages.length} Messages</span>
                    </div>

                    {isLoadingMessages ? (
                      <div className="py-4 text-center text-slate-400 text-xs">Loading timeline...</div>
                    ) : (
                      <div className="space-y-3 max-h-56 overflow-y-auto p-2 bg-stone-50/70 rounded-2xl border border-stone-200">
                        {bookingMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-xl text-xs space-y-1 ${
                              msg.senderType === "ADMIN"
                                ? "bg-[#0F3040] text-white ml-6"
                                : msg.senderType === "CUSTOMER"
                                ? "bg-white text-slate-900 border border-stone-200 mr-6"
                                : "bg-stone-200/70 text-slate-700 mx-2 text-center text-[11px]"
                            }`}
                          >
                            <div className="flex items-center justify-between opacity-80 text-[10px]">
                              <span className="font-bold uppercase tracking-wider">{msg.senderName} ({msg.senderType})</span>
                              <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                            <p className="leading-relaxed font-normal">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Direct Admin Reply Composer */}
                    <form onSubmit={handleSendAdminReply} className="space-y-2 pt-2">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Send Direct Reply Email to Customer
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          required
                          placeholder="Write a message/reply to send directly via email..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3040]"
                        />
                        <button
                          type="submit"
                          disabled={isSendingReply || !replyText.trim()}
                          className="px-5 py-2.5 bg-[#0F3040] hover:bg-[#164257] text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isSendingReply ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <span>Send</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Decline Reason Modal */}
            {declineModalOpen && selectedBooking && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-stone-200 text-slate-900">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Decline Consultation Request
                  </h3>
                  <p className="text-xs text-slate-600">
                    Enter an optional note or reason to be included in the decline email sent to <strong>{selectedBooking.customerName}</strong>:
                  </p>
                  <textarea
                    rows={3}
                    placeholder="e.g. Unfortunately, I am out of office at the requested time. Please pick another date."
                    value={declineReasonText}
                    onChange={(e) => setDeclineReasonText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3040] resize-none"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setDeclineModalOpen(false)}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateBookingStatus(selectedBooking.id, "DECLINED", declineReasonText)}
                      className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Decline & Send Email
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Inquiry Modal */}
            {selectedInquiry && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-stone-200 text-slate-900"
                >
                  <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                    <div>
                      <span className="font-mono text-xs text-[#0F3040] font-bold">{selectedInquiry.id}</span>
                      <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                        {selectedInquiry.clientName}
                      </h3>
                      <p className="text-xs text-slate-500">{selectedInquiry.company}</p>
                    </div>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl">
                      <div>
                        <span className="text-slate-500 uppercase font-semibold block mb-1">Email</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-[#0F3040] font-medium flex items-center space-x-1 hover:underline">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{selectedInquiry.email}</span>
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase font-semibold block mb-1">Phone</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-[#0F3040] font-medium flex items-center space-x-1 hover:underline">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{selectedInquiry.phone}</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Requested Service</span>
                      <span className="font-semibold text-slate-900 text-sm">{selectedInquiry.serviceRequested}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-1">Client Notes / Scope</span>
                      <p className="p-3 bg-stone-50 rounded-xl text-slate-700 leading-relaxed">
                        {selectedInquiry.notes}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 uppercase font-semibold block mb-2">Update Status</span>
                      <div className="flex flex-wrap gap-2">
                        {["New", "In Progress", "Completed", "Archived"].map((st) => (
                          <button
                            key={st}
                            onClick={() => updateInquiryStatus(selectedInquiry.id, st)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              selectedInquiry.status === st
                                ? "bg-[#0F3040] text-white shadow-sm"
                                : "bg-stone-100 text-slate-600 hover:bg-stone-200"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Close Details
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
