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
  familyEnabled,
  updateSpouse,
  updateChild,
  addChild,
  setForm,
}) {
  const showAnniversary = form.personalDetails.maritalStatus === "Married";
  const [showOfficeAddress, setShowOfficeAddress] = useState(
    Boolean(
      form.addressDetails.office?.addressLine ||
        form.addressDetails.office?.city ||
        form.addressDetails.office?.state ||
        form.addressDetails.office?.pin,
    ),
  );
  const [showCorrespondenceAddress, setShowCorrespondenceAddress] = useState(
    Boolean(
      form.addressDetails.correspondence?.addressLine ||
        form.addressDetails.correspondence?.city ||
        form.addressDetails.correspondence?.state ||
        form.addressDetails.correspondence?.pin,
    ),
  );

  useEffect(() => {
    if (
      form.addressDetails.office?.addressLine ||
      form.addressDetails.office?.city ||
      form.addressDetails.office?.state ||
      form.addressDetails.office?.pin
    ) {
      setShowOfficeAddress(true);
    }
  }, [form.addressDetails.office]);

  useEffect(() => {
    if (
      form.addressDetails.correspondence?.addressLine ||
      form.addressDetails.correspondence?.city ||
      form.addressDetails.correspondence?.state ||
      form.addressDetails.correspondence?.pin
    ) {
      setShowCorrespondenceAddress(true);
    }
  }, [form.addressDetails.correspondence]);

  const hideOfficeAddress = () => {
    updateAddressFields("office", { houseNo: "", addressLine: "", city: "", state: "", country: "", phone: "", pin: "" });
    setShowOfficeAddress(false);
  };

  const hideCorrespondenceAddress = () => {
    updateAddressFields("correspondence", { houseNo: "", addressLine: "", city: "", state: "", country: "", pin: "" });
    setShowCorrespondenceAddress(false);
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <InlineDateField
          label="DOB"
          value={form.personalDetails.dob}
          onChange={(value) => updatePersonal("dob", value)}
          placeholder="DOB"
          required
          icon={CalendarDays}
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
          placeholder="House No."
          icon={Building2}
        />
        <AddressAutocompleteField
          label="Permanent Address"
          value={form.addressDetails.residence.addressLine}
          onChange={(value) => updateAddress("residence", "addressLine", value)}
          onAddressSelect={(place) => handleAddressSelect("residence", place)}
          placeholder="Address"
          required
          icon={MapPin}
        />
        <InputField
          label="City"
          value={form.addressDetails.residence.city}
          onChange={(value) => updateAddress("residence", "city", value)}
          placeholder="City"
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
          placeholder="Pin"
          icon={MapPin}
        />
      </div>

      {/* Correspondence Address */}
      <div className="pt-0.5">
        {!showCorrespondenceAddress ? (
          <button
            type="button"
            onClick={() => setShowCorrespondenceAddress(true)}
            className="inline-flex items-center gap-1.5 px-1 py-1 text-[12px] font-medium text-slate-500 transition hover:text-amber-600"
          >
            <MapPin size={14} />
            + Add Correspondence Address (Optional)
          </button>
        ) : (
          <div className="space-y-2 rounded-none border border-slate-100 bg-slate-50/30 p-3 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Correspondence Address (Optional)</h4>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3 w-3 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateAddressFields("correspondence", form.addressDetails.residence);
                      } else {
                        updateAddressFields("correspondence", { houseNo: "", addressLine: "", city: "", state: "", country: "", pin: "" });
                      }
                    }}
                  />
                  <span className="text-[10px] uppercase font-bold text-slate-500">Same as Permanent</span>
                </label>
                <button type="button" onClick={hideCorrespondenceAddress} className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] transition hover:text-[#A00D25]">Remove</button>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-1">
              <InputField label="House No." value={form.addressDetails.correspondence?.houseNo || ""} onChange={(v) => updateAddress("correspondence", "houseNo", v)} placeholder="House No." icon={Building2} />
              <AddressAutocompleteField label="Address" value={form.addressDetails.correspondence?.addressLine || ""} onChange={(v) => updateAddress("correspondence", "addressLine", v)} onAddressSelect={(place) => handleAddressSelect("correspondence", place)} placeholder="Correspondence Address" icon={MapPin} />
              <InputField label="City" value={form.addressDetails.correspondence?.city || ""} onChange={(v) => updateAddress("correspondence", "city", v)} placeholder="City" icon={MapPinned} />
              <SelectField label="State" value={form.addressDetails.correspondence?.state || ""} onChange={(v) => updateAddress("correspondence", "state", v)} options={INDIA_STATE_AND_UT_OPTIONS} icon={Map} />
              <CountrySelectField label="Country" value={form.addressDetails.correspondence?.country || ""} onChange={(v) => updateAddress("correspondence", "country", v)} icon={Globe} />
              <InputField label="Pin Code" value={form.addressDetails.correspondence?.pin || ""} onChange={(v) => updateAddress("correspondence", "pin", v.replace(/\D/g, "").slice(0, 6))} placeholder="Pin" icon={MapPin} />
            </div>
          </div>
        )}
      </div>

      {/* Office Address */}
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
          <div className="space-y-2 rounded-none border border-slate-100 bg-slate-50/30 p-3 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Office Address (Optional)</h4>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3 w-3 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateAddressFields("office", form.addressDetails.residence);
                      } else {
                        updateAddressFields("office", { houseNo: "", addressLine: "", city: "", state: "", country: "", phone: "", pin: "" });
                      }
                    }}
                  />
                  <span className="text-[10px] uppercase font-bold text-slate-500">Same as Permanent</span>
                </label>
                <button type="button" onClick={hideOfficeAddress} className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E] transition hover:text-[#A00D25]">Remove</button>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-1">
              <InputField label="House No." value={form.addressDetails.office?.houseNo || ""} onChange={(v) => updateAddress("office", "houseNo", v)} placeholder="House No." icon={Building2} />
              <AddressAutocompleteField label="Address" value={form.addressDetails.office?.addressLine || ""} onChange={(v) => updateAddress("office", "addressLine", v)} onAddressSelect={(place) => handleAddressSelect("office", place)} placeholder="Office Address" icon={MapPin} />
              <InputField label="City" value={form.addressDetails.office?.city || ""} onChange={(v) => updateAddress("office", "city", v)} placeholder="City" icon={MapPinned} />
              <SelectField label="State" value={form.addressDetails.office?.state || ""} onChange={(v) => updateAddress("office", "state", v)} options={INDIA_STATE_AND_UT_OPTIONS} icon={Map} />
              <CountrySelectField label="Country" value={form.addressDetails.office?.country || ""} onChange={(v) => updateAddress("office", "country", v)} icon={Globe} />
              <InputField label="Pin Code" value={form.addressDetails.office?.pin || ""} onChange={(v) => updateAddress("office", "pin", v.replace(/\D/g, "").slice(0, 6))} placeholder="Pin" icon={MapPin} />
            </div>
          </div>
        )}
      </div>
      </div>

      {form.personalDetails.maritalStatus && (
        <div className="space-y-2.5 pt-2">
          <h3 className="border-b border-slate-100 pb-1.5 text-sm font-bold uppercase tracking-[0.05em] text-[#C8102E]">
            Family Details{" "}
            {form.personalDetails.maritalStatus === "Married" ? (
              <span className="text-xs text-slate-500 font-medium normal-case">(Compulsory for Married)</span>
            ) : (
              <span className="text-xs text-slate-500 font-medium normal-case">(Optional)</span>
            )}
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            <InputField
              label="Spouse Name"
              value={form.familyDetails?.spouse?.name || ""}
              onChange={(value) => updateSpouse && updateSpouse("name", value)}
              placeholder="Spouse Name"
              required={form.personalDetails.maritalStatus === "Married"}
              icon={User}
            />
            <InlineDateField
              label="Spouse DOB"
              value={form.familyDetails?.spouse?.dob || ""}
              onChange={(value) => updateSpouse && updateSpouse("dob", value)}
              placeholder="DOB"
              required={form.personalDetails.maritalStatus === "Married"}
              icon={CalendarDays}
            />
            <InputField
              label="Spouse Mobile"
              value={form.familyDetails?.spouse?.mobile || ""}
              onChange={(value) => updateSpouse && updateSpouse("mobile", value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Mobile Number"
              required={form.personalDetails.maritalStatus === "Married"}
              icon={Phone}
            />
            <InputField
              label="Spouse Email"
              value={form.familyDetails?.spouse?.email || ""}
              onChange={(value) => updateSpouse && updateSpouse("email", value.toLowerCase())}
              placeholder="Email Address"
              required={form.personalDetails.maritalStatus === "Married"}
              icon={Mail}
            />
          </div>

          <div className="mt-4 border border-slate-100 bg-slate-50/50 p-3">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Children Details</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">No. of Children:</span>
                <select 
                  className="h-6 w-12 border border-slate-300 text-xs text-center outline-none"
                  value={form.familyDetails?.children?.length || 0}
                  onChange={(e) => {
                    const count = parseInt(e.target.value, 10);
                    const currentLen = form.familyDetails?.children?.length || 0;
                    if (count > currentLen) {
                      for (let i = 0; i < count - currentLen; i++) addChild && addChild();
                    } else if (count < currentLen) {
                      setForm && setForm(prev => ({
                        ...prev,
                        familyDetails: {
                          ...prev.familyDetails,
                          children: prev.familyDetails.children.slice(0, count)
                        }
                      }));
                    }
                  }}
                >
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {form.familyDetails?.children?.map((child, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-3 pb-3 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                <InputField
                  label={`Child ${index + 1} Name`}
                  value={child.name || ""}
                  onChange={(value) => updateChild && updateChild(index, "name", value)}
                  placeholder="Full Name"
                  icon={User}
                />
                <SelectField
                  label="Gender"
                  value={child.gender || ""}
                  onChange={(value) => updateChild && updateChild(index, "gender", value)}
                  options={GENDER_OPTIONS}
                  icon={Users}
                />
                <InlineDateField
                  label="DOB"
                  value={child.dob || ""}
                  onChange={(value) => updateChild && updateChild(index, "dob", value)}
                  placeholder="Date of Birth"
                  icon={CalendarDays}
                />
              </div>
            ))}
          </div>
        </div>
      )}
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
