"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import GlobalHolidayLeadWidget from "@/components/GlobalHolidayLeadWidget";
import Topbar from "@/components/Topbar";
import SocialSidebar from "@/components/SocialSidebar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [isAuthMounted, setIsAuthMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const exitDurationMs = 3200;

  const openAuth = () => {
    setIsAuthMounted(true);
    requestAnimationFrame(() => setIsAuthOpen(true));
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  useEffect(() => {
    if (!isAuthMounted) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAuth();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isAuthMounted]);

  useEffect(() => {
    if (!isAuthMounted) return undefined;
    if (isAuthOpen) return undefined;

    const timer = setTimeout(() => {
      setIsAuthMounted(false);
    }, exitDurationMs);

    return () => clearTimeout(timer);
  }, [isAuthOpen, isAuthMounted]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleOpenAuth = () => {
      openAuth();
    };

    window.addEventListener("ohc-open-auth", handleOpenAuth);

    return () => {
      window.removeEventListener("ohc-open-auth", handleOpenAuth);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className={`${pathname === "/" ? "absolute" : "relative"} top-0 left-0 w-full z-50`}>
        <Topbar />
        <Navbar onLoginClick={openAuth} />
        {pathname !== "/" && <div className="h-[56px]" />}
      </header>
      <main className="flex-grow">{children}</main>
      <SocialSidebar />
      <WhatsAppFloat />
      <Footer />
      <GlobalHolidayLeadWidget />
      {isAuthMounted && (
        <div
          className={`fixed inset-0 z-[100] auth-overlay ${
            isAuthOpen ? "auth-overlay-open" : ""
          }`}
          style={{ pointerEvents: isAuthOpen ? "auto" : "none" }}
        >
          <div className="absolute inset-0 auth-backdrop" />
          <div className="relative z-10 h-full">
            <Auth onClose={closeAuth} />
          </div>
        </div>
      )}
    </div>
  );
}
