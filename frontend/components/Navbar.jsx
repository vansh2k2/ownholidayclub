"use client";
import React, { useEffect, useState } from "react";
import { CircleUserRound, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ onLoginClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      if (typeof window === "undefined") return;
      const rawUser = window.localStorage.getItem("ohc_user");
      if (!rawUser) {
        setCurrentUser(null);
        return;
      }

      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch {
        setCurrentUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("ohc-auth-changed", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("ohc-auth-changed", syncUser);
    };
  }, []);

  const [logo, setLogo] = useState("/logo.png");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081"}/api/settings`)
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data && result.data.logo) {
          setLogo(result.data.logo);
        }
      })
      .catch(err => console.error("Logo fetch error:", err));
  }, []);

  const isHome = pathname === "/";
  const isDestinationDetail = pathname?.startsWith("/destinations/") && pathname?.split("/")?.length > 2;
  // Always start as transparent on all pages as per user request
  const isTransparentPage = true; 

  const shouldBeWhite = true;

  const profileImage =
    currentUser?.documents?.profileImage?.url ||
    currentUser?.documents?.profileImage?.dataUrl ||
    "";
  const profileLabel =
    currentUser?.name || currentUser?.membershipId || "Profile";

  return (
    <nav className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-in-out font-sans bg-white border-b border-slate-200 text-black ${isScrolled ? "top-0 py-1 shadow-[0_6px_24px_rgba(15,23,42,0.12)]" : "top-[36px] py-2 shadow-sm"}`}>

      <div className="site-width mx-auto ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <div
              className={`text-2xl font-black tracking-tighter transition-colors duration-300 flex items-center gap-2
                ${shouldBeWhite ? "text-black" : "text-white"}`}
            >
              <Link href="/" className="flex items-center gap-2 px-5 py-1 rounded-2xl transition-all duration-300 bg-transparent">
                <img src={logo} className="w-40" alt="Own Holiday Club Logo" />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              "Home",
              "About",
              "Destinations",
              "Services",
              "Membership",
              "List Your Property",
              "Contact Us",
            ].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : item === "Contact Us"
                    ? "/contactus"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`tracking-[0.12em] font-semibold text-[12px] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full
                    ${shouldBeWhite ? "text-black" : "text-white"} hover:text-red-700
                  `}
              >
                {item}
              </Link>
            ))}

            {/* Premium Button adapting to scroll state */}
            {currentUser ? (
              <Link
                href="/profile"
                className={`flex items-center gap-3 rounded-full border px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${shouldBeWhite ? "border-slate-200 bg-slate-50" : "border-white/20 bg-white/10 backdrop-blur-md"}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ${shouldBeWhite ? "bg-white" : "bg-white/20"}`}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={profileLabel}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <CircleUserRound size={22} className={shouldBeWhite ? "text-slate-500" : "text-white"} />
                  )}
                </div>
                <span className={`text-xs font-semibold ${shouldBeWhite ? "text-slate-900" : "text-white"}`}>
                  Profile
                </span>
              </Link>
            ) : (
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
                className="hidden md:flex relative flex-col items-center self-start"
                style={{ marginTop: "-12px" }}
              >
                <motion.div
                  animate={{ rotate: [-1.5, 1.5, -1.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="relative origin-top flex flex-col items-center"
                >
                  {/* The Hanging String */}
                  <div className={`w-[1.5px] h-5 bg-gradient-to-b ${shouldBeWhite ? "from-slate-300 via-red-700/40 to-red-800" : "from-white/30 via-white/50 to-white"}`} />

                  {/* The Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoginClick}
                    className={`relative mt-0 px-7 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border-2 overflow-hidden transition-all duration-500 group
                      ${isScrolled 
                        ? "border-red-700 bg-red-700 text-white shadow-[0_8px_16px_-8px_rgba(185,28,28,0.3)]" 
                        : "border-amber-500 bg-amber-500 text-slate-900 shadow-[0_8px_16px_-8px_rgba(245,158,11,0.3)]"
                      }
                    `}
                  >
                    {/* Hover Background Slide */}
                    <span className={`absolute inset-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-500 ease-out
                      ${isScrolled ? "bg-amber-500" : "bg-red-800"}
                    `} />

                    <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2 
                      ${isScrolled ? "group-hover:text-slate-900" : "group-hover:text-white"}
                    `}>
                      Member Login
                    </span>
                  </motion.button>

                  {/* Small decorative "pin" or "knot" at the top could be added here if desired */}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${shouldBeWhite ? "text-black hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Glassmorphism design) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out overflow-hidden origin-top
          ${isMobileMenuOpen ? "opacity-100 scale-y-100 max-h-[500px]" : "opacity-0 scale-y-0 max-h-0"}
        `}
      >
        <div className="mx-4 mt-2 mb-6 px-4 py-6 space-y-2 flex flex-col bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-slate-200/70">
          {[
            "Home",
            "About",
            "Destinations",
            "Services",
            "Membership",
            "List Your Property",
            "Contact Us",
          ].map((item) => (
            <Link
              key={item}
              href={
                item === "Home"
                  ? "/"
                  : item === "Contact Us"
                  ? "/contactus"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="block px-4 py-3 text-xs font-semibold text-black hover:bg-slate-100 hover:text-red-700 rounded-2xl transition-all duration-300 uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
               {item}
            </Link>
          ))}
          {currentUser ? (
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profileLabel}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <CircleUserRound size={22} className="text-slate-500" />
                )}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                Profile
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleLoginClick();
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 w-full bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-4 rounded-2xl font-normal uppercase tracking-widest text-xs transition-all duration-300 active:scale-[0.98]"
            >
              Member Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
