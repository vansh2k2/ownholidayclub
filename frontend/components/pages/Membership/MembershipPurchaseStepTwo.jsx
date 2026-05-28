"use client";

import React from "react";
import {
  Plus,
  Baby,
  CalendarDays,
  FileText,
  ImageIcon,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  User,
} from "lucide-react";
import {
  ADDRESS_PROOF_OPTIONS,
  GENDER_OPTIONS,
} from "./membershipPurchaseConfig";
import {
  FileInputField,
  InputField,
  SelectField,
  SelectFileRow,
} from "./MembershipPurchaseFormFields";

export default function MembershipPurchaseStepTwo({
  form,
  familyEnabled,
  updateSpouse,
  updateChild,
  addChild,
  updateDocumentType,
  handleFileChange,
  setForm,
  baseUrl,
}) {
  return (
    <div className="space-y-3">
      {familyEnabled ? (
        <>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
            <Users size={14} />
            Family Detail
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <InputField
              label="Spouse Name"
              value={form.familyDetails.spouse.name}
              onChange={(value) => updateSpouse("name", value)}
              placeholder="Spouse Name (Optional)"
              labelHidden
              icon={User}
            />
            <InputField
              label="Spouse DOB"
              type="date"
              value={form.familyDetails.spouse.dob}
              onChange={(value) => updateSpouse("dob", value)}
              labelHidden
              icon={CalendarDays}
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <InputField
              label="Spouse Email"
              type="email"
              value={form.familyDetails.spouse.email}
              onChange={(value) =>
                updateSpouse("email", value.trim().toLowerCase())
              }
              placeholder="Spouse Email (Optional)"
              labelHidden
              icon={Mail}
            />
            <InputField
              label="Spouse Mobile"
              value={form.familyDetails.spouse.mobile}
              onChange={(value) =>
                updateSpouse("mobile", value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Spouse Mobile (Optional)"
              labelHidden
              icon={Phone}
            />
          </div>

          {form.familyDetails.children.map((child, index) => (
            <div
              key={child.id}
              className="grid gap-2 md:grid-cols-[1.5fr,1fr,0.9fr]"
            >
              <InputField
                label={`Child ${index + 1} Name`}
                value={child.name}
                onChange={(value) => updateChild(index, "name", value)}
                placeholder={`Child ${index + 1} Name (Optional)`}
                labelHidden
                icon={Baby}
              />
              <InputField
                label={`Child ${index + 1} DOB`}
                type="date"
                value={child.dob}
                onChange={(value) => updateChild(index, "dob", value)}
                labelHidden
                icon={CalendarDays}
              />
              <SelectField
                label={`Child ${index + 1} Gender`}
                value={child.gender}
                onChange={(value) => updateChild(index, "gender", value)}
                options={GENDER_OPTIONS}
                labelHidden
                icon={Users}
              />
            </div>
          ))}

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={addChild}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[12px] border border-amber-200 bg-amber-50 px-4 text-[14px] font-semibold text-amber-700 transition hover:border-amber-400 hover:bg-amber-100"
            >
              <Plus size={16} />
              Add Child
            </button>
          </div>
        </>
      ) : null}

      <div className="pt-1">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
          <FileText size={14} />
          Documents
        </div>

        <div className="space-y-2">
          <FileInputField
            label="Profile Image"
            value={form.documents.profileImage}
            onChange={(file) => handleFileChange("profileImage", file)}
            accept="image/*"
            labelIcon={ImageIcon}
          />

          <FileInputField
            label="Aadhaar Card"
            value={form.documents.idProof}
            onChange={(file) => handleFileChange("idProof", file)}
            labelIcon={FileText}
          />

          <SelectFileRow
            label="Address Proof"
            selectValue={form.documents.addressProofType}
            onSelect={(value) => updateDocumentType("addressProofType", value)}
            options={ADDRESS_PROOF_OPTIONS}
            fileValue={form.documents.addressProof}
            onFileChange={(file) => handleFileChange("addressProof", file)}
            selectIcon={FileText}
          />

          {familyEnabled ? (
            <FileInputField
              label="Spouse ID"
              value={form.documents.spouseId}
              onChange={(file) => handleFileChange("spouseId", file)}
              labelIcon={FileText}
            />
          ) : null}
        </div>
      </div>

    </div>
  );
}
