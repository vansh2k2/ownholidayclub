"use client";

import React from "react";
import { Crown, LogOut, UploadCloud, User, CreditCard, Palmtree, Star } from "lucide-react";

const navigationItems = [
  { id: "profile",    label: "Personal Info",    icon: User },
  { id: "membership", label: "Membership",        icon: Star },
  { id: "holiday",   label: "Book Holiday",      icon: Palmtree },
  { id: "payment",   label: "Payment Details",   icon: CreditCard },
];

export default function ProfileSidebar({ profile, activeTab, onTabChange, onSignOut }) {
  return (
    <div className="min-w-0 space-y-5 lg:col-span-3">
      {/* Member Card */}
      <div className="bg-[#0A1628] text-white relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#C9A84C]/30" />

        <div className="px-6 pt-10 pb-8 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-5 relative inline-block">
            <div className="w-20 h-20 overflow-hidden border-2 border-[#C9A84C] flex items-center justify-center bg-[#1A2A40] rounded-full">
              {profile.documents?.profileImage?.url || profile.documents?.profileImage?.dataUrl ? (
                <img
                  src={profile.documents.profileImage.url || profile.documents.profileImage.dataUrl}
                  alt={profile.name || "Member"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UploadCloud size={24} className="text-[#C9A84C]" />
              )}
            </div>
          </div>

          <h2
            className="text-base font-bold tracking-widest text-white uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
          >
            {(profile.name || "OHC Member").toUpperCase()}
          </h2>
          <p
            className="mt-1 text-xs text-[#C9A84C] tracking-widest font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {profile.membershipId || "ID Pending"}
          </p>

          <div
            className="mt-5 inline-flex items-center gap-2 border border-[#C9A84C]/60 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Crown size={12} />
            {profile.membership?.name || "No Membership"}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border border-[#E8E4DC]">
        <div className="flex lg:flex-col overflow-x-auto hide-scrollbar divide-x lg:divide-x-0 lg:divide-y divide-[#E8E4DC]">
          <div className="flex lg:flex-col min-w-max lg:min-w-0 p-2 lg:p-4 gap-2 lg:gap-0">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={`group flex items-center gap-2 lg:gap-3 px-4 py-2.5 lg:py-3.5 text-xs lg:text-sm font-semibold transition-all rounded-full lg:rounded-none whitespace-nowrap ${
                  activeTab === id
                    ? "bg-[#0A1628] text-white"
                    : "bg-[#F7F5F0] text-[#0A1628] hover:bg-gray-100"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Icon
                  size={16}
                  className={activeTab === id ? "text-[#C9A84C]" : "text-[#C9A84C]"}
                />
                {label}
                {activeTab === id && (
                  <span className="hidden lg:block ml-auto w-1.5 h-1.5 bg-[#C9A84C]" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center p-2 lg:p-4 lg:border-t border-[#E8E4DC]">
            <button
              type="button"
              onClick={onSignOut}
              className="flex items-center gap-2 lg:gap-3 px-4 py-2.5 lg:py-3 text-xs lg:text-sm font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 transition-colors rounded-full lg:rounded-none whitespace-nowrap"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Decorative destination card */}
      <div className="bg-[#0A1628] px-6 py-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C]" />
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Own Holiday Club
        </p>
        <p
          className="text-xs text-[#94A3B8] leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          50+ destinations across India & abroad. Luxury stays at members-only rates.
        </p>
      </div>
    </div>
  );
}