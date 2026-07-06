"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

import ProfileSidebar from "./ProfileSidebar";
import { MembershipTab, HolidayTab, PaymentTab, ProfileInfoTab } from "./ProfileTabs";
import { Card, FeedbackToast } from "./ProfileShared";
import {
  API_BASE_URL,
  defaultProfile,
  formatDateTimeLocalValue,
  getHolidayAccessSlots,
  getHolidayQuota,
  getStayAllowance,
  normaliseProfile,
} from "./profileData";

const createInitialHolidayForm = () => ({
  slotNumber: null,
  name: "",
  email: "",
  mobile: "",
  place: "",
  checkIn: "",
  checkOut: "",
  adults: "2",
  kids: "0",
  slotValidFrom: "",
  slotValidTo: "",
});

export default function Profilepage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [holidayForm, setHolidayForm] = useState(createInitialHolidayForm);
  const [selectedHolidaySlot, setSelectedHolidaySlot] = useState(null);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isBookingHoliday, setIsBookingHoliday] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const requestedTab = searchParams.get("tab");
    if (requestedTab) setActiveTab(requestedTab);
  }, [searchParams]);

  useEffect(() => {
    const loadProfile = async () => {
      const userId =
        typeof window !== "undefined"
          ? window.localStorage.getItem("ohc_user_id") || ""
          : "";
      if (!userId) {
        setFeedback({ type: "error", message: "Please sign in to view your profile." });
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/profile/${encodeURIComponent(userId)}`,
          { cache: "no-store" },
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || "Failed to load profile.");
        const nextProfile = normaliseProfile(data?.user);
        setProfile(nextProfile);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("ohc_user", JSON.stringify(nextProfile));
          window.dispatchEvent(new Event("ohc-auth-changed"));
        }
      } catch (error) {
        setFeedback({ type: "error", message: error.message || "Failed to load profile." });
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!feedback.message) return undefined;
    const id = window.setTimeout(() => setFeedback({ type: "", message: "" }), 5000);
    return () => window.clearTimeout(id);
  }, [feedback.message]);

  const holidayBookingHistory = Array.isArray(profile.holidayBookings) ? profile.holidayBookings : [];
  const holidaySlots          = getHolidayAccessSlots(profile, holidayBookingHistory);
  const totalHolidayQuota     = getHolidayQuota(profile.membership);
  const requestedHolidayQuota = holidayBookingHistory.filter(
    (b) => String(b?.status || "").toLowerCase() === "pending",
  ).length;
  const usedHolidayQuota      = holidayBookingHistory.filter(
    (b) => String(b?.status || "").toLowerCase() === "approved",
  ).length;
  const consumedHolidayQuota  = requestedHolidayQuota + usedHolidayQuota;
  const remainingHolidayQuota = Math.max(totalHolidayQuota - consumedHolidayQuota, 0);
  const nextStayAllowance     = getStayAllowance(profile.membership, consumedHolidayQuota + 1);
  const maxCheckOutValue = (() => {
    if (!holidayForm.checkIn) return holidayForm.slotValidTo || "";
    const checkInDate = new Date(holidayForm.checkIn);
    if (Number.isNaN(checkInDate.getTime())) return holidayForm.slotValidTo || "";
    const calcMax    = new Date(checkInDate.getTime() + nextStayAllowance.days * 86400000);
    const slotValidTo = holidayForm.slotValidTo ? new Date(holidayForm.slotValidTo) : null;
    const effectiveMax = slotValidTo && !Number.isNaN(slotValidTo.getTime()) && slotValidTo < calcMax
      ? slotValidTo : calcMax;
    return formatDateTimeLocalValue(effectiveMax);
  })();
  const hasActiveMembership = Boolean(profile.membership?.name && totalHolidayQuota > 0);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    if (!isHolidayModalOpen) { document.body.style.overflow = ""; return undefined; }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isHolidayModalOpen]);

  const signOut = () => {
    Swal.fire({
      title: '<div style="font-family: \'Playfair Display\', serif; font-size: 24px; font-weight: 900; color: #0A1628; margin-top: 10px;">Signing Out?</div>',
      html: '<div style="font-family: \'DM Sans\', sans-serif; font-size: 14px; color: #64748b; margin-top: 15px;">Are you sure you want to leave your member portal?</div>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#C8102E',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: 'Yes, Sign Out',
      cancelButtonText: 'Stay Connected',
      background: '#ffffff',
      backdrop: `rgba(10, 22, 40, 0.45) backdrop-filter: blur(8px)`,
      padding: '2rem',
      customClass: {
        popup: 'premium-auth-alert',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof window === "undefined") return;
        
        Swal.fire({
          title: '<div style="font-family: \'Playfair Display\', serif; font-size: 24px; font-weight: 900; color: #0A1628; margin-top: 10px;">Logged Out</div>',
          text: 'You have been successfully signed out.',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#ffffff',
          iconColor: '#16a34a'
        }).then(() => {
          window.localStorage.removeItem("ohc_user_id");
          window.localStorage.removeItem("ohc_user");
          window.dispatchEvent(new Event("ohc-auth-changed"));
          window.location.href = "/";
        });
      }
    });
  };

  const syncProfileLocally = (nextProfile) => {
    setProfile(nextProfile);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ohc_user", JSON.stringify(nextProfile));
      window.dispatchEvent(new Event("ohc-auth-changed"));
    }
  };

  const closeHolidayModal = () => {
    setIsHolidayModalOpen(false);
    setSelectedHolidaySlot(null);
    setHolidayForm(createInitialHolidayForm());
  };

  const openHolidayModal = (slot) => {
    if (!slot?.slotNumber) return;
    setSelectedHolidaySlot(slot);
    setHolidayForm({
      slotNumber: slot.slotNumber,
      name: profile?.name || "",
      email: profile?.email || "",
      mobile: profile?.mobile || "",
      place: "", checkIn: "", checkOut: "",
      adults: "2", kids: "0",
      slotValidFrom: formatDateTimeLocalValue(slot.validFrom),
      slotValidTo:   formatDateTimeLocalValue(slot.validTo),
    });
    setIsHolidayModalOpen(true);
  };

  const handleHolidayFieldChange = (field, value) => {
    setHolidayForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookHoliday = async () => {
    if (!profile?._id) { setFeedback({ type: "error", message: "Please sign in again to continue." }); return; }
    const slotNumber = Number(holidayForm.slotNumber || 0);
    const adults     = Number(holidayForm.adults || 0);
    const kids       = Number(holidayForm.kids || 0);
    if (!slotNumber) { setFeedback({ type: "error", message: "Please choose the active holiday row." }); return; }
    if (!holidayForm.name.trim() || !holidayForm.email.trim() || !holidayForm.mobile.trim()) {
      setFeedback({ type: "error", message: "Name, email, and mobile are required." }); return;
    }
    if (!holidayForm.place.trim() || !holidayForm.checkIn || !holidayForm.checkOut) {
      setFeedback({ type: "error", message: "Place, check-in, and check-out are required." }); return;
    }
    if (!Number.isInteger(adults) || adults <= 0 || !Number.isInteger(kids) || kids < 0) {
      setFeedback({ type: "error", message: "Please provide valid adults and kids counts." }); return;
    }
    const checkInDate = new Date(holidayForm.checkIn);
    const checkOutDate = new Date(holidayForm.checkOut);
    if (checkOutDate <= checkInDate) {
      setFeedback({ type: "error", message: "Check-out date must be after check-in date." }); return;
    }
    setIsBookingHoliday(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profile/${encodeURIComponent(profile._id)}/holiday-bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slotNumber, 
            name: holidayForm.name.trim(),
            email: holidayForm.email.trim(),
            mobile: holidayForm.mobile.trim(),
            place: holidayForm.place.trim(),
            checkIn: holidayForm.checkIn, checkOut: holidayForm.checkOut, adults, kids,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Failed to book holiday.");
      syncProfileLocally(normaliseProfile(data?.user));
      closeHolidayModal();
      setFeedback({
        type: "success",
        message: data?.message || "OHC team will contact you within 12 hours. Your holiday is confirmed!",
      });
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Failed to book holiday." });
    } finally {
      setIsBookingHoliday(false);
    }
  };

  const renderActiveTab = () => {
    if (isLoading) return <Card title="Loading">Loading profile...</Card>;
    if (activeTab === "profile")    return <ProfileInfoTab profile={profile} />;
    if (activeTab === "membership") return <MembershipTab profile={profile} />;
    if (activeTab === "holiday") {
      return (
        <HolidayTab
          profile={profile}
          holidaySlots={holidaySlots}
          holidayForm={holidayForm}
          isHolidayModalOpen={isHolidayModalOpen}
          isBookingHoliday={isBookingHoliday}
          totalHolidayQuota={totalHolidayQuota}
          requestedHolidayQuota={requestedHolidayQuota}
          usedHolidayQuota={usedHolidayQuota}
          remainingHolidayQuota={remainingHolidayQuota}
          nextStayAllowance={nextStayAllowance}
          maxCheckOutValue={maxCheckOutValue}
          hasActiveMembership={hasActiveMembership}
          selectedHolidaySlot={selectedHolidaySlot}
          onHolidayFieldChange={handleHolidayFieldChange}
          onBookHoliday={handleBookHoliday}
          onOpenHolidayModal={openHolidayModal}
          onCloseHolidayModal={closeHolidayModal}
        />
      );
    }
    return <PaymentTab profile={profile} />;
  };

  return (
    <>
      {/* Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap');
      ` }} />

      <div
        className="min-h-screen bg-white px-4 pb-16 pt-12 md:px-8 lg:px-12"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <FeedbackToast feedback={feedback} />

        <div className="mx-auto site-width">
          {/* Page Header */}
          <div className="mb-10 border-b border-[#E8E4DC] pb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-[#C8102E]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8102E]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Own Holiday Club
              </span>
            </div>
            <h1
              className="text-4xl font-black text-[#0A1628]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Member <span className="text-[#f59e08]">Profile</span>
            </h1>
            <p className="mt-2 text-sm text-black">
              View your membership, holiday bookings, documents, and payment details.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <ProfileSidebar
              profile={profile}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onSignOut={signOut}
            />
            <div className="min-w-0 lg:col-span-9">{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </>
  );
}