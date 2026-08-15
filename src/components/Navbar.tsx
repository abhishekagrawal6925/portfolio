"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Our Values", href: "#our-values" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = navLinks.map((link) => link.href.substring(1));
          const current = sections.find((section) => {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              return rect.top <= 140 && rect.bottom >= 140;
            }
            return false;
          });
          if (current) {
            setActiveSection(current);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const navHeaderHeight = 70;
      const targetPosition = element.offsetTop - navHeaderHeight;

      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }, 50);

      setActiveSection(targetId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${isScrolled
        ? "bg-[#0F3040]/95 backdrop-blur-md border-b border-[#D99B7F]/20 shadow-lg py-2.5"
        : "bg-transparent py-3.5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Clean Firm Brand Section with PA CO Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 group py-0.5"
        >
          <div className="h-9 px-2.5 rounded-xl bg-[#D99B7F] text-[#0F3040] flex items-center justify-center gap-1 font-sans shadow-sm select-none leading-none shrink-0">
            <span className="text-xs font-bold tracking-tight text-[#0F3040]">PACO</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-sans font-bold text-sm sm:text-base tracking-wide text-white uppercase leading-tight group-hover:text-[#D99B7F] transition-colors">
              PANKAJ AGRAWAL &amp; CO
            </span>
            <span className="font-sans font-semibold text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#D99B7F] mt-0.5">
              CHARTERED ACCOUNTANTS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-1.5 text-xs font-medium transition-colors ${isActive ? "text-[#D99B7F] font-semibold" : "text-[#FAF2EE]/80 hover:text-white"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D99B7F] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+918273801105"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF2EE]/90 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/10"
            title="Call Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#D99B7F]" />
            <span>+91 8273801105</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="relative group inline-flex items-center justify-center gap-1 px-4.5 py-2 rounded-full text-xs font-bold tracking-wide text-[#0F3040] bg-[#D99B7F] hover:bg-[#c88b6f] shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-800 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`py-3 text-sm font-medium px-3.5 rounded-xl transition-colors flex items-center justify-between touch-manipulation ${isActive
                        ? "bg-slate-100 text-slate-900 font-semibold"
                        : "text-slate-800 hover:bg-gray-50 active:bg-gray-100"
                        }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                <a
                  href="tel:+918273801105"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-medium text-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-800" />
                  +91 8273801105
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-white text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
