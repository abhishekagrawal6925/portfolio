import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg">
        <FileQuestion className="w-8 h-8" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold mb-2">
        Error 404
      </span>

      <h1 className="font-sans text-4xl sm:text-5xl font-bold text-primary mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-secondary max-w-md mb-8 leading-relaxed">
        The requested page does not exist or has been relocated. Please check the URL or return to the main firm homepage.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-luxury"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
