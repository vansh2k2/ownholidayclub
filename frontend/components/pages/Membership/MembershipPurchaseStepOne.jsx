"use client";

import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CalendarHeart,
  Globe,
  Heart,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Phone,
  User,
  Users,
} from "lucide-react";
import {
  GENDER_OPTIONS,
  INDIA_STATE_AND_UT_OPTIONS,
  isEmailValid,
  MARITAL_STATUS_OPTIONS,
  OCCUPATION_OPTIONS,
  TITLE_OPTIONS,
} from "./membershipPurchaseConfig";
import {
  AddressAutocompleteField,
  CountrySelectField,
  InputField,
  SelectField,
} from "./MembershipPurchaseFormFields";

export default function MembershipPurchaseStepOne({
  form,
  mobileState,
  emailState,
  updatePersonal,
  updateContact,
  updateAddress,
  updateAddressFields,
  setMobileState,
  setEmailState,
  sendOtp,
  verifyOtp,
}) {
  const showAnniversary = form.personalDetails.maritalStatus === "Married";
  const [showOfficeAddress, setShowOfficeAddress] = useState(
    Boolean(
      form.addressDetails.office.addressLine ||
        form.addressDetails.office.city ||
        form.addressDetails.office.state ||
        form.addressDetails.office.country ||
        form.addressDetails.office.phone ||
        form.addressDetails.office.pin,
    ),
  );

  useEffect(() => {
    if (
      form.addressDetails.office.addressLine ||
      form.addressDetails.office.city ||
      form.addressDetails.office.state ||
      form.addressDetails.office.country ||
      form.addressDetails.office.phone ||
      form.addressDetails.office.pin
    ) {
      setShowOfficeAddress(true);
    }
  }, [form.addressDetails.office]);

  const hideOfficeAddress = () => {
    updateAddress("office", "addressLine", "");
    updateAddress("office", "city", "");
    updateAddress("office", "state", "");
    updateAddress("office", "country", "");
    updateAddress("office", "phone", "");
    updateAddress("office", "pin", "");
    setShowOfficeAddress(false);
  };

  const handleAddressSelect = (group, place) => {
    updateAddressFields(group, {
      addressLine: place.addressLine || "",
      city: place.city || "",
      state: place.state || "",
      country: place.country || "",
      pin: place.pin || "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <h3 className="border-b border-slate-100 pb-1.5 text-sm font-bold uppercase tracking-[0.05em] text-[#C8102E]">
          Personal Information
        </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Title"
          value={form.personalDetails.title}
          onChange={(value) => updatePersonal("title", value)}
          options={TITLE_OPTIONS}
          icon={User}
          required
        />
        <InputField
          label="First Name"
          value={form.personalDetails.firstName}
          onChange={(value) => updatePersonal("firstName", value)}
          placeholder="First Name"
          required
          icon={User}
        />
        <InputField
          label="Last Name"
          value={form.personalDetails.lastName}
          onChange={(value) => updatePersonal("lastName", value)}
          placeholder="Last Name"
          icon={User}
        />
        <InlineDateField
          label="DOB"
          value={form.personalDetails.dob}
          onChange={(value) => updatePersonal("dob", value)}
          placeholder="DOB"
          required
          icon={CalendarDays}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InlineVerifyField
          label="Mobile Number"
          value={
            mobileState.requested && !mobileState.verified
              ? mobileState.otp
              : form.contactDetails.mobile
          }
          placeholder={
            mobileState.requested && !mobileState.verified
              ? "Enter OTP"
              : "Mobile Number"
          }
          buttonText={
            mobileState.verified
              ? "Verified"
              : mobileState.requested
                ? "Verify"
                : "Send OTP"
          }
          disabled={mobileState.verified}
          loading={mobileState.sending || mobileState.verifying}
          onChange={(value) => {
            if (mobileState.requested && !mobileState.verified) {
              setMobileState((prev) => ({
                ...prev,
                otp: value.replace(/\D/g, "").slice(0, 6),
              }));
              return;
            }

            updateContact("mobile", value.replace(/\D/g, "").slice(0, 10));
          }}
          onAction={() => {
            if (mobileState.requested && !mobileState.verified) {
              verifyOtp({
                channel: "mobile",
                value: form.contactDetails.mobile,
                otp: mobileState.otp,
              });
              return;
            }

            sendOtp({
              channel: "mobile",
              value: form.contactDetails.mobile,
            });
          }}
          actionDisabled={
            mobileState.verified
              ? true
              : mobileState.requested
                ? mobileState.verifying || String(mobileState.otp).length < 4
                : mobileState.sending || form.contactDetails.mobile.length !== 10
          }
          icon={Phone}
        />

        <InlineVerifyField
          label="Email Address"
          value={
            emailState.requested && !emailState.verified
              ? emailState.otp
              : form.contactDetails.email
          }
          placeholder={
            emailState.requested && !emailState.verified ? "Enter OTP" : "Email Address"
          }
          buttonText={
            emailState.verified
              ? "Verified"
              : emailState.requested
                ? "Verify"
                : "Send OTP"
          }
          disabled={emailState.verified}
          loading={emailState.sending || emailState.verifying}
          onChange={(value) => {
            if (emailState.requested && !emailState.verified) {
              setEmailState((prev) => ({
                ...prev,
                otp: value.replace(/\D/g, "").slice(0, 6),
              }));
              return;
            }

            updateContact("email", value.trim().toLowerCase());
          }}
          onAction={() => {
            if (emailState.requested && !emailState.verified) {
              verifyOtp({
                channel: "email",
                value: form.contactDetails.email,
                otp: emailState.otp,
              });
              return;
            }

            sendOtp({
              channel: "email",
              value: form.contactDetails.email,
            });
          }}
          actionDisabled={
            emailState.verified
              ? true
              : emailState.requested
                ? emailState.verifying || String(emailState.otp).length < 4
                : emailState.sending || !isEmailValid(form.contactDetails.email)
          }
          icon={Mail}
        />

        <SelectField
          label="Occupation"
          value={form.personalDetails.occupation}
          onChange={(value) => updatePersonal("occupation", value)}
          options={OCCUPATION_OPTIONS}
          required
          icon={BriefcaseBusiness}
        />
        <SelectField
          label="Gender"
          value={form.personalDetails.gender}
          onChange={(value) => updatePersonal("gender", value)}
          options={GENDER_OPTIONS}
          required
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Marital Status"
          value={form.personalDetails.maritalStatus}
          onChange={(value) => updatePersonal("maritalStatus", value)}
          options={MARITAL_STATUS_OPTIONS}
          required
          icon={Heart}
        />
        {showAnniversary ? (
          <InlineDateField
            label="Anniversary Date"
            value={form.personalDetails.anniversary}
            onChange={(value) => updatePersonal("anniversary", value)}
            placeholder="Anniversary Date"
            icon={CalendarHeart}
          />
        ) : null}
      </div>

      </div>

      <div className="space-y-2.5">
        <h3 className="border-b border-slate-100 pb-1.5 text-sm font-bold uppercase tracking-[0.05em] text-[#C8102E]">
          Address Information
        </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputField
          label="House No. / Block No."
          value={form.addressDetails.residence.houseNo}
          onChange={(value) => updateAddress("residence", "houseNo", value)}
          placeholder="House No. / Block No."
          icon={Building2}
        />

        <div className="lg:col-span-2">
          <AddressAutocompleteField
            label="Residence Address"
            value={form.addressDetails.residence.addressLine}
            onChange={(value) => updateAddress("residence", "addressLine", value)}
            onAddressSelect={(place) => handleAddressSelect("residence", place)}
            placeholder="Residence Address"
            required
            icon={MapPin}
          />
        </div>

        <InputField
          label="Residence City"
          value={form.addressDetails.residence.city}
          onChange={(value) => updateAddress("residence", "city", value)}
          placeholder="Residence City"
          required
          icon={MapPinned}
        />
        <SelectField
          label="State"
          value={form.addressDetails.residence.state}
          onChange={(value) => updateAddress("residence", "state", value)}
          options={INDIA_STATE_AND_UT_OPTIONS}
          required
          icon={Map}
        />
        <CountrySelectField
          label="Country"
          value={form.addressDetails.residence.country}
          onChange={(value) => updateAddress("residence", "country", value)}
          required
          icon={Globe}
        />
        <InputField
          label="Pin Code"
          value={form.addressDetails.residence.pin}
          onChange={(value) =>
            updateAddress("residence", "pin", value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="Pin (Opt)"
          icon={MapPin}
        />
      </div>

      <div className="pt-0.5">
        {!showOfficeAddress ? (
          <button
            type="button"
            onClick={() => setShowOfficeAddress(true)}
            className="inline-flex items-center gap-1.5 px-1 py-1 text-[12px] font-medium text-slate-500 transition hover:text-amber-600"
          >
            <Building2 size={14} />
            + Add Office Address (Optional)
          </button>
        ) : (
          <div className="space-y-2 rounded-none border border-slate-100 bg-slate-50/30 p-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Office Address (Optional)
              </h4>
              <button
                type="button"
                onClick={hideOfficeAddress}
                className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] transition hover:text-[#A00D25]"
              >
                Remove
              </button>
            </div>

            <AddressAutocompleteField
              label="Office Address"
              value={form.addressDetails.office.addressLine}
              onChange={(value) => updateAddress("office", "addressLine", value)}
              onAddressSelect={(place) => handleAddressSelect("office", place)}
              placeholder="Office Address"
              labelHidden
              icon={Building2}
            />

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <InputField
                label="Office City"
                value={form.addressDetails.office.city}
                onChange={(value) => updateAddress("office", "city", value)}
                placeholder="Office City"
                labelHidden
                icon={MapPinned}
              />
              <SelectField
                label="Office State"
                value={form.addressDetails.office.state}
                onChange={(value) => updateAddress("office", "state", value)}
                options={INDIA_STATE_AND_UT_OPTIONS}
                labelHidden
                icon={Map}
              />
              <CountrySelectField
                label="Office Country"
                value={form.addressDetails.office.country}
                onChange={(value) => updateAddress("office", "country", value)}
                labelHidden
                icon={Globe}
              />
              <InputField
                label="Office Phone"
                value={form.addressDetails.office.phone}
                onChange={(value) =>
                  updateAddress("office", "phone", value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Phone"
                labelHidden
                icon={Phone}
              />
              <InputField
                label="Office Pin"
                value={form.addressDetails.office.pin}
                onChange={(value) =>
                  updateAddress("office", "pin", value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Pin"
                labelHidden
                icon={MapPin}
              />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

function InlineDateField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon = CalendarDays,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
        {label}
        {required && <span className="ml-1 text-[#C8102E]">*</span>}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </span>
        <input
          type={isFocused || value ? "date" : "text"}
          value={value || ""}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!value) {
              setIsFocused(false);
            }
          }}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-full rounded-none border border-slate-400 bg-white pl-10 pr-3 py-0 leading-tight text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        />
      </div>
    </div>
  );
}

function InlineVerifyField({
  label,
  value,
  placeholder,
  buttonText,
  disabled,
  loading,
  onChange,
  onAction,
  actionDisabled,
  icon,
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800">
        {label}
        {!disabled && <span className="ml-1 text-[#C8102E]">*</span>}
      </span>
      <div className="relative flex items-center">
        <InputField
          label={placeholder}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          labelHidden
          icon={icon}
          wrapperClassName="w-full"
          inputClassName="pr-16"
        />
        <button
          type="button"
          onClick={onAction}
          disabled={actionDisabled}
          className="absolute right-0.5 px-2 py-1 bg-slate-900 text-white text-[9px] uppercase font-bold tracking-wider rounded-none hover:bg-slate-800 disabled:bg-slate-300 transition-all z-10"
          style={{ height: "calc(2rem - 4px)" }}
        >
          {loading
            ? buttonText === "Verify"
              ? "..."
              : "..."
            : buttonText}
        </button>
      </div>
    </div>
  );
}
