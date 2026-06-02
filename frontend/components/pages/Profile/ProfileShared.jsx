"use client";

import React from "react";
import { Download, FileText, MapPin } from "lucide-react";

import { API_BASE_URL } from "./profileData";

// ─── Design Tokens ────────────────────────────────────────────────────────────
// Primary: #0A1628 (deep navy)
// Accent:  #C9A84C (warm gold)
// Surface: #f8fafc (clean slate)
// Muted:   #6B7280

export function FeedbackToast({ feedback }) {
  if (!feedback?.message) return null;
  return (
    <div className="fixed right-6 top-24 z-[100] w-full max-w-sm">
      <div
        className={`border-l-4 px-5 py-4 text-sm font-medium shadow-xl ${
          feedback.type === "error"
            ? "border-red-500 bg-white text-red-700"
            : "border-[#C9A84C] bg-white text-[#0A1628]"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {feedback.message}
      </div>
    </div>
  );
}

export function Card({ title, children }) {
  return (
    <div className="bg-white border border-[#E8E4DC] shadow-sm">
      <div className="px-8 py-6 border-b border-[#E8E4DC] flex items-center gap-4">
        <div className="w-1 h-6 bg-[#C9A84C]" />
        <h2
          className="text-xl font-bold text-[#0A1628] tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="px-8 py-7">{children}</div>
    </div>
  );
}

export function Detail({ icon, label, value }) {
  return (
    <div className="border border-[#E8E4DC] bg-[#f8fafc] px-5 py-4">
      <div
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-[#C9A84C]">{icon}</span>
        {label}
      </div>
      <div
        className="mt-2 text-sm font-semibold text-[#0A1628]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

export function AddressCard({ title, address }) {
  const location = [address?.city, address?.state, address?.country]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="border border-[#E8E4DC] bg-[#f8fafc] p-5">
      <div
        className="flex items-center gap-2 text-sm font-bold text-[#0A1628]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <MapPin size={15} className="text-[#C9A84C]" />
        {title}
      </div>
      <div
        className="mt-4 space-y-1.5 text-sm text-[#4B5563]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {address?.houseNo ? <div>{address.houseNo}</div> : null}
        <div>{address?.addressLine || "—"}</div>
        <div>{location || "—"}</div>
        <div className="text-xs font-medium tracking-wide">PIN: {address?.pin || "—"}</div>
      </div>
    </div>
  );
}

export function DocumentPreview({ title, document }) {
  const documentUrl = document?.url || document?.dataUrl || "";
  const isImage = String(document?.type || "").startsWith("image/");
  const proofType = String(document?.proofType || "").trim();
  return (
    <div className="border border-[#E8E4DC] bg-[#f8fafc] p-5">
      <div
        className="flex items-center gap-2 text-sm font-bold text-[#0A1628]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <FileText size={15} className="text-[#C9A84C]" />
        {title}
      </div>
      {proofType && proofType !== title ? (
        <div
          className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {proofType}
        </div>
      ) : null}
      <div className="mt-4 border border-[#E8E4DC] bg-white p-3">
        {documentUrl ? (
          isImage ? (
            <img
              src={documentUrl}
              alt={title}
              className="h-40 w-full object-cover"
            />
          ) : (
            <a
              href={documentUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-40 items-center justify-center bg-[#f8fafc] px-4 text-center text-sm font-semibold text-[#0A1628] hover:text-[#C9A84C] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {document?.name || "Open document"}
            </a>
          )
        ) : (
          <div
            className="flex min-h-40 items-center justify-center text-sm text-[#9CA3AF]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Not uploaded
          </div>
        )}
      </div>
    </div>
  );
}

export function HolidayQuotaCard({ label, value }) {
  return (
    <div className="border border-[#E8E4DC] bg-[#f8fafc] px-6 py-5">
      <div
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {label}
      </div>
      <div
        className="mt-2 text-3xl font-black text-[#0A1628]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {value}
      </div>
    </div>
  );
}

export function ProfileInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min = "",
  max = "",
}) {
  return (
    <label className="block w-full">
      <div
        className="mb-1.5 text-xs font-medium text-[#4B5563]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </div>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min || undefined}
        max={max || undefined}
        className="w-full rounded-lg border border-[#E8E4DC] bg-white px-4 py-2.5 text-sm text-[#0A1628] outline-none transition-all focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] placeholder:text-[#9CA3AF]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
    </label>
  );
}

export function Stat({ label, value }) {
  return (
    <div>
      <div
        className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </div>
      <div
        className="text-base font-semibold text-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {value}
      </div>
    </div>
  );
}

export function PaymentMeta({ label, value }) {
  return (
    <div className="border border-[#E8E4DC] bg-[#f8fafc] px-4 py-3">
      <div
        className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </div>
      <div
        className="mt-1 break-all text-sm font-semibold text-[#0A1628]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

export function InvoiceDownloadButton({ userId, payment }) {
  const paymentIdentifier = payment?.paymentId || payment?._id;
  if (
    !userId ||
    !paymentIdentifier ||
    (!payment?.invoice?.url && !payment?.invoice?.dataUrl)
  ) {
    return null;
  }
  return (
    <a
      href={`${API_BASE_URL}/api/profile/${encodeURIComponent(userId)}/payments/${encodeURIComponent(paymentIdentifier)}/invoice`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 border border-[#C9A84C] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Download size={14} />
      Download Invoice
    </a>
  );
}