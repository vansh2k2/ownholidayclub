"use client";

import React from "react";
import { Calendar, Mail, Phone, User } from "lucide-react";

import {
  AddressCard,
  Card,
  Detail,
  DocumentPreview,
  HolidayQuotaCard,
  InvoiceDownloadButton,
  PaymentMeta,
  ProfileInput,
  Stat,
} from "./ProfileShared";
import {
  formatHolidayDateTime,
  formatHolidayDate,
  formatPaymentAmount,
  formatPaymentDate,
  getPaymentDurationLabel,
} from "./profileData";

const HOLIDAY_STATUS_STYLES = {
  used:      "border-emerald-600 bg-emerald-50 text-emerald-700",
  booking:   "border-amber-500 bg-amber-50 text-amber-700",
  pending:   "border-amber-500 bg-amber-50 text-amber-700",
  approved:  "border-emerald-600 bg-emerald-50 text-emerald-700",
  rejected:  "border-rose-500 bg-rose-50 text-rose-700",
  expired:   "border-rose-500 bg-rose-50 text-rose-700",
  available: "border-sky-500 bg-sky-50 text-sky-700",
  inactive:  "border-[#E8E4DC] bg-[#f8fafc] text-[#9CA3AF]",
};

const HOLIDAY_STATUS_CLASS =
  "inline-flex h-8 w-24 items-center justify-center border text-[9px] font-bold uppercase tracking-widest";

const getHolidaySlotState = (slot, hasActiveMembership) => {
  const bookingStatus = String(slot?.booking?.status || "").trim().toLowerCase();
  const now = new Date();
  
  if (bookingStatus === "booked" || bookingStatus === "approved") return { key: "approved", label: "Approved", canBook: false };
  if (bookingStatus === "rejected") return { key: "rejected", label: "Rejected", canBook: true };
  if (bookingStatus === "booking" || bookingStatus === "pending") return { key: "pending", label: "Pending", canBook: false };
  if (!hasActiveMembership) return { key: "inactive", label: "Inactive", canBook: false };
  if (now >= slot.validTo) return { key: "expired", label: "Expired", canBook: false };
  
  // All valid unbooked slots are available to book
  return { key: "available", label: "Available", canBook: true };
};

// ─── Section heading helper ────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div
      className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C] mb-5 flex items-center gap-3"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <span className="w-6 h-px bg-[#C9A84C]" />
      {children}
      <span className="flex-1 h-px bg-[#E8E4DC]" />
    </div>
  );
}

// ─── ProfileInfoTab ────────────────────────────────────────────────────────────
export function ProfileInfoTab({ profile }) {
  return (
    <div className="space-y-6">
      <Card title="Personal Details">
        <div className="grid gap-4 md:grid-cols-2">
          <Detail icon={<User size={14} />} label="Full Name"       value={profile.name} />
          <Detail icon={<Mail size={14} />} label="Email"           value={profile.email} />
          <Detail icon={<Phone size={14} />} label="Mobile"         value={profile.mobile} />
          <Detail icon={<Calendar size={14} />} label="Date of Birth" value={profile.dob} />
          <Detail icon={<User size={14} />} label="Gender"          value={profile.gender} />
          <Detail icon={<User size={14} />} label="Marital Status"  value={profile.maritalStatus} />
          <Detail icon={<Calendar size={14} />} label="Anniversary" value={profile.anniversary} />
          <Detail icon={<User size={14} />} label="Occupation"      value={profile.occupation} />
        </div>
      </Card>

      <Card title="Address Details">
        <div className="grid gap-5 md:grid-cols-2">
          <AddressCard title="Residence Address" address={profile.residenceAddress} />
          <AddressCard title="Office Address"    address={profile.officeAddress} />
        </div>
      </Card>

      <Card title="Family Details">
        <div className="grid gap-4 md:grid-cols-2">
          <Detail icon={<User size={14} />}     label="Spouse Name" value={profile.spouse?.name} />
          <Detail icon={<Calendar size={14} />} label="Spouse DOB"  value={profile.spouse?.dob} />
        </div>
        <div className="mt-6">
          <SectionLabel>Children</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {profile.familyMembers.length === 0 ? (
              <div
                className="col-span-3 border border-dashed border-[#E8E4DC] bg-[#f8fafc] px-6 py-8 text-sm text-[#9CA3AF]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                No children added.
              </div>
            ) : (
              profile.familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="border border-[#E8E4DC] bg-[#f8fafc] p-5"
                >
                  <div
                    className="text-sm font-bold text-[#0A1628]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {member.name || member.id}
                  </div>
                  <div
                    className="mt-2 text-sm text-[#6B7280]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    DOB: {member.dob || "N/A"}
                  </div>
                  <div
                    className="mt-1 text-sm text-[#6B7280]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Gender: {member.gender || "N/A"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      <Card title="Documents">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DocumentPreview title="Profile Image"
            document={profile.documents?.profileImage} />
          <DocumentPreview
            title={profile.documents?.idProof?.proofType || "Aadhaar Card"}
            document={profile.documents?.idProof}
          />
          <DocumentPreview
            title={profile.documents?.addressProof?.proofType || "Additional ID"}
            document={profile.documents?.addressProof}
          />
        </div>
      </Card>
    </div>
  );
}

// ─── MembershipTab ─────────────────────────────────────────────────────────────
export function MembershipTab({ profile }) {
  return (
    <Card title="Membership Details">
      {/* Hero membership card */}
      <div className="relative bg-[#0A1628] overflow-hidden">
        {/* Gold stripe top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C]" />
        {/* Decorative watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.03] select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif" }}>OHC</div>

        <div className="px-8 py-10">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {profile.membershipId || "Membership ID Pending"}
          </div>
          <h3
            className="text-3xl font-black text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {profile.membership?.name || "No Active Membership"}
          </h3>

          <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-3">
            <Stat label="Status"         value={profile.membership?.status} />
            <Stat label="Valid Until"    value={profile.membership?.validUntil || "N/A"} />
            <Stat label="Duration"       value={profile.membership?.duration || "N/A"} />
            <Stat label="Annual Quota"   value={profile.membership?.nightsPerYear || "N/A"} />
            <Stat label="Nights Left"    value={`${profile.membership?.nightsRemaining || 0} Nights`} />
            <Stat label="Purchase Price" value={profile.membership?.purchasePrice || "N/A"} />
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── HolidayTab ────────────────────────────────────────────────────────────────
export function HolidayTab({
  profile, holidaySlots, holidayForm, isHolidayModalOpen, isBookingHoliday,
  totalHolidayQuota, requestedHolidayQuota, usedHolidayQuota, remainingHolidayQuota,
  nextStayAllowance, maxCheckOutValue, hasActiveMembership, selectedHolidaySlot,
  onHolidayFieldChange, onBookHoliday, onOpenHolidayModal, onCloseHolidayModal,
}) {
  const lengthOfHolidayLabel = profile.membership?.nightsPerYear || nextStayAllowance.label;

  return (
    <div className="space-y-6">
      <Card title="Member Holidays">
        <div className="space-y-6">
          {/* Quota strip */}
          <div className="grid gap-4 md:grid-cols-3">
            <HolidayQuotaCard label="Total Holiday Access"  value={String(totalHolidayQuota || 0)} />
            <HolidayQuotaCard label="Requested / Used"      value={`${requestedHolidayQuota} / ${usedHolidayQuota}`} />
            <HolidayQuotaCard label="Remaining"             value={String(remainingHolidayQuota)} />
          </div>

          <div className="w-full">
            {!hasActiveMembership ? (
              <div
                className="border border-dashed border-[#E8E4DC] bg-white px-6 py-8 text-sm text-[#9CA3AF]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                An active membership is required before booking a holiday.
              </div>
            ) : null}

            {hasActiveMembership && holidaySlots.length === 0 ? (
              <div
                className="border border-dashed border-[#E8E4DC] bg-white px-6 py-8 text-sm text-[#9CA3AF]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Holiday access rows will appear once the membership start date is available.
              </div>
            ) : null}

            {holidaySlots.length > 0 ? (
              <div className="overflow-x-auto border border-[#E8E4DC]">
                <table className="min-w-full divide-y divide-[#E8E4DC] bg-white text-sm text-[#0A1628]">
                  <thead className="bg-[#0A1628]">
                    <tr>
                      {["Holiday No.", "Length Of Stay", "Valid From", "Valid To", "Booking Details", "Status"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-widest text-white"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    {holidaySlots.map((slot) => {
                      const slotState = getHolidaySlotState(slot, hasActiveMembership);
                      const booking = slot.booking;
                      const guestSummary = `${Number(booking?.adults || 0)} Adult${Number(booking?.adults || 0) === 1 ? "" : "s"} / ${Number(booking?.kids || 0)} Kid${Number(booking?.kids || 0) === 1 ? "" : "s"}`;

                      return (
                        <tr key={slot.slotNumber} className="hover:bg-[#f8fafc] transition-colors">
                          <td
                            className="px-5 py-4 font-bold text-[#0A1628]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            #{slot.slotNumber}
                          </td>
                          <td className="px-5 py-4 text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {lengthOfHolidayLabel}
                          </td>
                          <td className="px-5 py-4 text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {formatHolidayDate(slot.validFrom)}
                          </td>
                          <td className="px-5 py-4 text-[#4B5563]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {formatHolidayDate(slot.validTo)}
                          </td>
                          <td className="px-5 py-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {booking ? (
                              <div className="space-y-1">
                                <div className="font-bold text-blue-900">{booking.place || "N/A"}</div>
                                <div className="text-[11px] font-medium text-slate-600 flex flex-col">
                                  <span>{formatHolidayDateTime(booking.checkIn)}</span>
                                  <span>{formatHolidayDateTime(booking.checkOut)}</span>
                                </div>
                                <div className="text-[11px] font-medium text-slate-600">{guestSummary}</div>
                                <div className="text-[10px] font-semibold text-blue-600 mt-1 whitespace-nowrap">
                                  Requested {formatHolidayDateTime(booking.requestedAt)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-[#9CA3AF] text-xs">No booking yet</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {slotState.canBook ? (
                              <button
                                type="button"
                                onClick={() => onOpenHolidayModal(slot)}
                                className="inline-flex h-8 w-24 items-center justify-center bg-[#C9A84C] text-[9px] font-bold uppercase tracking-widest text-[#0A1628] transition hover:bg-[#B8933D]"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                Book Now
                              </button>
                            ) : (
                              <div className="flex flex-col gap-1.5 items-start">
                                <span
                                  className={`${HOLIDAY_STATUS_CLASS} ${HOLIDAY_STATUS_STYLES[slotState.key] || HOLIDAY_STATUS_STYLES.inactive}`}
                                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                  {slotState.label}
                                </span>
                                {booking?.adminMessage && (
                                  <div className="text-[10px] bg-slate-100 border border-slate-200 p-2 rounded text-red-600 font-medium leading-tight max-w-[140px] mt-1">
                                    <span className="font-bold text-black">Admin Note:</span><br/>
                                    "{booking.adminMessage}"
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}

            {remainingHolidayQuota <= 0 && hasActiveMembership ? (
              <div
                className="mt-4 border-l-4 border-[#C9A84C] bg-amber-50 px-5 py-4 text-sm font-medium text-amber-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Your available holiday quota has been fully used.
              </div>
            ) : null}
          </div>
        </div>
      </Card>

      {/* Modal */}
      {isHolidayModalOpen && selectedHolidaySlot ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/80 px-4 py-8 backdrop-blur-md transition-opacity">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-[0_32px_80px_rgba(10,22,40,0.35)] overflow-hidden animate-scale-in">
            {/* Elegant Header */}
            <div className="bg-[#0A1628] px-6 py-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C]" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Holiday Access #{selectedHolidaySlot.slotNumber}
                  </div>
                  <h3
                    className="mt-1 text-xl font-medium text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Request Your Holiday
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onCloseHolidayModal}
                  className="text-white/70 hover:text-white transition-colors"
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              <p
                className="mb-5 text-sm text-[#6B7280]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Valid: {formatHolidayDate(selectedHolidaySlot.validFrom)} — {formatHolidayDate(selectedHolidaySlot.validTo)}
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <ProfileInput
                    label="Destination / Place"
                    value={holidayForm.place}
                    onChange={(v) => onHolidayFieldChange("place", v)}
                    placeholder="Enter your preferred destination"
                  />
                </div>
                <ProfileInput
                  label="Check-In Date"
                  type="datetime-local"
                  value={holidayForm.checkIn}
                  onChange={(v) => onHolidayFieldChange("checkIn", v)}
                  min={holidayForm.slotValidFrom || ""}
                  max={holidayForm.slotValidTo || ""}
                />
                <ProfileInput
                  label="Check-Out Date"
                  type="datetime-local"
                  value={holidayForm.checkOut}
                  onChange={(v) => onHolidayFieldChange("checkOut", v)}
                  min={holidayForm.checkIn || holidayForm.slotValidFrom || ""}
                  max={maxCheckOutValue || holidayForm.slotValidTo || ""}
                />
                <ProfileInput
                  label="Adults"
                  type="number"
                  value={holidayForm.adults}
                  onChange={(v) => onHolidayFieldChange("adults", v)}
                  min="1"
                />
                <ProfileInput
                  label="Kids"
                  type="number"
                  value={holidayForm.kids}
                  onChange={(v) => onHolidayFieldChange("kids", v)}
                  min="0"
                />
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onCloseHolidayModal}
                  className="rounded-lg border border-[#E8E4DC] px-6 py-2.5 text-sm font-medium text-[#4B5563] transition hover:bg-gray-50 hover:text-[#0A1628]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onBookHoliday}
                  disabled={isBookingHoliday}
                  className="rounded-lg bg-[#0A1628] px-6 py-2.5 text-sm font-medium text-[#C9A84C] transition hover:bg-[#112240] hover:text-[#F0D080] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {isBookingHoliday ? "Submitting..." : "Submit Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ─── PaymentTab ────────────────────────────────────────────────────────────────
export function PaymentTab({ profile }) {
  return (
    <Card title="Payment Details">
      <div className="space-y-6">
        {profile.payments.length === 0 ? (
          <div
            className="border-2 border-dashed border-[#E8E4DC] bg-[#f8fafc] py-12 text-center text-[#9CA3AF]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No membership payments found yet.
          </div>
        ) : (
          profile.payments.map((payment) => (
            <div
              key={payment.paymentId || payment.orderId || payment._id}
              className="border border-[#E8E4DC] bg-[#f8fafc]"
            >
              {/* Top color bar */}
              <div className="h-[2px] bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C]" />

              <div className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div
                      className="inline-flex items-center border border-emerald-500 bg-emerald-50 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-700"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {payment.status || "captured"}
                    </div>
                    <h4
                      className="mt-3 text-xl font-bold text-[#0A1628]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {payment.membershipTierName || "Membership Payment"}
                    </h4>
                    <p
                      className="mt-1 text-sm text-[#6B7280]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Paid on {formatPaymentDate(payment.paidAt)}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <div
                      className="text-3xl font-black text-[#0A1628]"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {formatPaymentAmount(payment.amount, payment.currency)}
                    </div>
                    <div
                      className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {getPaymentDurationLabel(payment)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <PaymentMeta label="Order ID"    value={payment.orderId} />
                  <PaymentMeta label="Payment ID"  value={payment.paymentId} />
                  <PaymentMeta label="Method"      value={payment.method || "N/A"} />
                  <PaymentMeta label="Contact"     value={payment.contact || profile.mobile || "N/A"} />
                  <PaymentMeta label="Email"       value={payment.email || profile.email || "N/A"} />
                  <PaymentMeta label="Bank / Wallet" value={payment.bank || payment.wallet || payment.vpa || "N/A"} />
                </div>

                <div className="mt-5">
                  <InvoiceDownloadButton userId={profile._id} payment={payment} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}