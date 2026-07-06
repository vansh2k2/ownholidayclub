"use client";
import React, { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Info, MapPin, Briefcase, Star, Building2,
  Phone, User, CalendarDays, Globe, ChevronDown,
  LayoutGrid, X, Lock, ExternalLink, BookOpen
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Destinations", href: "/destinations", icon: Globe, badge: "New" },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Membership", href: "/membership", icon: Star, badge: "VIP" },
  { label: "Blogs", href: "/blog", icon: BookOpen },
  { label: "List Your Property", href: "/list-your-property", icon: Building2 },
  { label: "Contact Us", href: "/contactus", icon: Phone },
];

const BOTTOM_TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Destinations", href: "/destinations", icon: Globe },
  { label: "Membership", href: "/membership", icon: Star },
  { label: "Contact", href: "/contactus", icon: Phone },
];

export default function Navbar({ onLoginClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState("/logo.png");
  const pathname = usePathname();

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    if (onLoginClick) onLoginClick();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      if (typeof window === "undefined") return;
      const rawUser = window.localStorage.getItem("ohc_user");
      if (!rawUser) { setCurrentUser(null); return; }
      try { setCurrentUser(JSON.parse(rawUser)); } catch { setCurrentUser(null); }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("ohc-auth-changed", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("ohc-auth-changed", syncUser);
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/settings`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data?.logo) setLogo(result.data.logo);
      })
      .catch(err => console.error("Logo fetch error:", err));
  }, []);

  // Lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const profileImage =
    currentUser?.documents?.profileImage?.url ||
    currentUser?.documents?.profileImage?.dataUrl || "";
  const profileLabel = currentUser?.name || currentUser?.membershipId || "Profile";

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-in-out font-sans bg-white border-b border-slate-200 text-black ${
          isScrolled
            ? "top-0 py-1.5 shadow-[0_6px_24px_rgba(15,23,42,0.12)]"
            : "top-[36px] pt-1 pb-1 shadow-sm"
        }`}
      >
        <div className="site-width mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 pl-2 pr-5 py-0.5 rounded-2xl transition-all duration-300 bg-transparent">
              <img src={logo} className="w-44" alt="Own Holiday Club Logo" />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-5">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`tracking-[0.05em] xl:tracking-[0.1em] font-bold xl:font-semibold text-[10px] xl:text-[12px] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full hover:text-red-700 whitespace-nowrap ${isActive ? "after:w-full text-red-700" : "after:w-0 text-black"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {currentUser ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-full border px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border-slate-200 bg-slate-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
                    {profileImage ? (
                      <img src={profileImage} alt={profileLabel} className="h-full w-full object-cover" />
                    ) : (
                      <CircleUserRound size={22} className="text-slate-500" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-900">Profile</span>
                </Link>
              ) : (
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                  className="hidden md:flex relative flex-col items-center self-start"
                  style={{ marginTop: "-12px" }}
                >
                  <motion.div
                    animate={{ rotate: [-1.5, 1.5, -1.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="relative origin-top flex flex-col items-center"
                  >
                    <div className="w-[1.5px] h-5 bg-gradient-to-b from-slate-300 via-red-700/40 to-red-800" />
                    <motion.button
                      whileHover={{ scale: 1.05, y: 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLoginClick}
                      className={`relative mt-0 px-7 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border-2 overflow-hidden transition-all duration-500 group ${
                        isScrolled
                          ? "border-red-700 bg-red-700 text-white shadow-[0_8px_16px_-8px_rgba(185,28,28,0.3)]"
                          : "border-amber-500 bg-amber-500 text-slate-900 shadow-[0_8px_16px_-8px_rgba(245,158,11,0.3)]"
                      }`}
                    >
                      <span className={`absolute inset-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-500 ease-out ${isScrolled ? "bg-amber-500" : "bg-red-800"}`} />
                      <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2 ${isScrolled ? "group-hover:text-slate-900" : "group-hover:text-white"}`}>
                        Member Login
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Mobile: Register button + Hamburger */}
            <div className="lg:hidden flex items-center gap-2 pr-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="bg-amber-500 text-slate-900 border-[1.5px] border-red-600 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-tight active:scale-95 transition-all flex items-center gap-1"
              >
                Menu
                <ChevronDown className="w-3 h-3" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-9 h-9 rounded-full flex flex-col items-center justify-center gap-[4.5px] transition-all duration-300 border ${
                  isMobileMenuOpen ? "bg-red-700 border-red-700" : "bg-white border-slate-300"
                }`}
                aria-label="Toggle menu"
              >
                <span className={`block w-[14px] h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "bg-white translate-y-[6px] rotate-45" : "bg-slate-700"}`} />
                <span className={`block w-[14px] h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "bg-white opacity-0" : "bg-slate-700"}`} />
                <span className={`block w-[14px] h-[1.5px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "bg-white -translate-y-[6px] -rotate-45" : "bg-slate-700"}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/95 backdrop-blur-xl border-t border-slate-100">
        <div className="flex items-center justify-between px-1 sm:px-2 pt-1 pb-3">
          {BOTTOM_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-0.5 px-1 sm:px-2 py-1.5 rounded-xl transition-all flex-1"
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${isActive ? "bg-amber-500 shadow-md shadow-amber-300/40" : "bg-transparent"}`}>
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-white" : "text-slate-600"}`} />
                </div>
                <span className={`text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide transition-colors truncate w-full text-center ${isActive ? "text-amber-600" : "text-slate-500"}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* Center FAB */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-1 sm:px-2 py-1.5 flex-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-700 flex items-center justify-center shadow-lg shadow-red-700/30 -mt-4 border-2 border-white transition-all active:scale-95">
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide text-red-700 mt-0.5 truncate w-full text-center">Menu</span>
          </button>
        </div>
      </div>

      {/* ─── MOBILE BOTTOM SHEET ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sheet Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[99] bg-white rounded-t-[28px] max-h-[90vh] overflow-y-auto"
            >
              {/* Drag Handle */}
              <div className="sticky top-0 bg-white z-10 rounded-t-[28px]">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-9 h-1 bg-slate-200 rounded-full" />
                </div>
              </div>

              {/* Info Chip */}
              <div className="mx-5 mt-4 bg-amber-50 border border-amber-200/70 rounded-2xl px-4 py-3 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Own Holiday Club</div>
                    <div className="text-[12px] font-bold text-slate-900 leading-tight">Your Home Away From Home</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-auto w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="px-5 mt-5">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2">Navigation</div>

                {NAV_LINKS.map((item, i) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-3 px-3 rounded-xl border-b border-slate-50 transition-all ${
                          isActive ? "bg-amber-50" : "active:bg-slate-50"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive ? "bg-amber-500 shadow-sm shadow-amber-300/40" : "bg-slate-100"
                        }`}>
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                        </div>
                        <span className={`text-[13px] font-semibold flex-1 ${isActive ? "text-amber-700" : "text-slate-900"}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            item.badge === "VIP" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Account / Login section */}
              <div className="px-5 mt-5">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">Account</div>

                {currentUser ? (
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 transition-all active:bg-slate-100"
                  >
                    <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {profileImage ? (
                        <img src={profileImage} alt={profileLabel} className="w-full h-full object-cover" />
                      ) : (
                        <CircleUserRound size={20} className="text-slate-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">{profileLabel}</p>
                      <p className="text-[10px] text-slate-400 tracking-wide">View Profile →</p>
                    </div>
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleLoginClick}
                      className="col-span-2 relative overflow-hidden bg-gradient-to-r from-amber-500 to-red-600 text-white font-bold text-[12px] uppercase tracking-[0.12em] py-4 rounded-2xl shadow-lg shadow-amber-200/60 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      Member Login
                    </motion.button>

                    <Link
                      href="/destinations"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl py-3 text-[10px] font-semibold uppercase tracking-wide active:scale-95 transition-all"
                    >
                      <Globe className="w-3.5 h-3.5 text-amber-500" />
                      Explore
                    </Link>

                    <Link
                      href="/membership"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl py-3 text-[10px] font-semibold uppercase tracking-wide active:scale-95 transition-all"
                    >
                      <Star className="w-3.5 h-3.5 text-red-500" />
                      Membership
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom padding for tab bar */}
              <div className="h-28" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}