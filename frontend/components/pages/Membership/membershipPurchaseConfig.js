"use client";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1.5;

export const TITLE_OPTIONS = [
  { value: "", label: "Title" },
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
];

export const OCCUPATION_OPTIONS = [
  { value: "", label: "Occupation" },
  { value: "Business", label: "Business" },
  { value: "Private Job", label: "Private Job" },
  { value: "Government Job", label: "Government Job" },
  { value: "Professional", label: "Professional" },
  { value: "Self Employed", label: "Self Employed" },
  { value: "Homemaker", label: "Homemaker" },
  { value: "Retired", label: "Retired" },
  { value: "Student", label: "Student" },
  { value: "Other", label: "Other" },
];

export const GENDER_OPTIONS = [
  { value: "", label: "Gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Separated", label: "Separated" },
];

export const INDIA_STATE_AND_UT_OPTIONS = [
  { value: "", label: "State" },
  { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Puducherry", label: "Puducherry" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
];

export const ID_PROOF_OPTIONS = [
  { value: "", label: "ID Proof" },
  { value: "Aadhaar Card", label: "Aadhaar Card" },
  { value: "PAN Card", label: "PAN Card" },
  { value: "Passport", label: "Passport" },
  { value: "Voter ID", label: "Voter ID" },
  { value: "Driving Licence", label: "Driving Licence" },
];

export const ADDRESS_PROOF_OPTIONS = [
  { value: "", label: "Address Proof" },
  { value: "Passport", label: "Passport" },
  { value: "Government Employee ID", label: "Government Employee ID" },
  { value: "PAN Card", label: "PAN Card" },
  { value: "Driving Licence", label: "Driving Licence" },
  { value: "Voter ID", label: "Voter ID" },
];

export const createEmptyChild = (index = 0) => ({
  id: `child-${index + 1}-${Date.now()}`,
  name: "",
  dob: "",
  gender: "",
});

export const createInitialState = () => ({
  personalDetails: {
    title: "",
    firstName: "",
    lastName: "",
    dob: "",
    occupation: "",
    gender: "",
    maritalStatus: "Married",
    anniversary: "",
  },
  contactDetails: {
    mobile: "",
    email: "",
  },
  addressDetails: {
    residence: {
      houseNo: "",
      addressLine: "",
      city: "",
      state: "",
      country: "India",
      phone: "",
      pin: "",
    },
    office: {
      houseNo: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      pin: "",
    },
    correspondence: {
      houseNo: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pin: "",
    },
  },
  familyDetails: {
    spouse: {
      name: "",
      dob: "",
      email: "",
      mobile: "",
    },
    children: [createEmptyChild(0), createEmptyChild(1)],
  },
  documents: {
    profileImage: null,
    idProofType: "Aadhaar Card",
    idProof: null,
    addressProofType: "",
    addressProof: null,
    spouseId: null,
  },
  acceptedTerms: false,
});

export const createVerificationState = () => ({
  requested: false,
  otp: "",
  verified: false,
  sending: false,
  verifying: false,
});

export const toBase64Document = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: String(reader.result || ""),
      });

    reader.onerror = () => reject(new Error(`Failed to read ${file.name}.`));
    reader.readAsDataURL(file);
  });

export const isEmailValid = (value) => /\S+@\S+\.\S+/.test(String(value || "").trim());

export const isMarriageRelatedStatus = (status) =>
  status === "Married" || status === "Separated";

export const joinMemberName = ({ title, firstName, lastName }) =>
  [title, firstName, lastName]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

export const getTierAccessLabel = (tier = {}) => {
  const baseYears = Number(String(tier.period || "").match(/(\d+)/)?.[1] || 0);
  const bonusYears = Math.max(0, Number(tier.bonusYears || 0) || 0);

  if (!baseYears) {
    return String(tier.period || "").trim();
  }

  if (bonusYears > 0) {
    return `${baseYears} + ${bonusYears} Years Access`;
  }

  return `${baseYears} Years Access`;
};
