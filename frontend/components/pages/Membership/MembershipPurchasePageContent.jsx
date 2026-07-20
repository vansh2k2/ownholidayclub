"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Crown,
  Gem,
  LoaderCircle,
  Package,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import {
  createMembershipPaymentOrder,
  loadRazorpayScript,
  verifyMembershipPayment,
} from "@/lib/payments";
import {
  API_BASE_URL,
  createEmptyChild,
  createInitialState,
  createVerificationState,
  getTierAccessLabel,
  isEmailValid,
  isMarriageRelatedStatus,
  joinMemberName,
  MAX_FILE_SIZE_BYTES,
  toBase64Document,
} from "./membershipPurchaseConfig";
import MembershipPurchaseStepOne from "./MembershipPurchaseStepOne";
import MembershipPurchaseStepTwo from "./MembershipPurchaseStepTwo";

const TIER_ICONS = {
  star: Star,
  crown: Crown,
  sparkles: Sparkles,
  gem: Gem,
};

export default function MembershipPurchasePageContent({
  tier,
  backHref = "/membership#tiers",
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(createInitialState);
  const [mobileState, setMobileState] = useState(createVerificationState);
  const [emailState, setEmailState] = useState(createVerificationState);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [baseUrl, setBaseUrl] = useState("https://www.ownholidayclub.com");
  const TierVisualIcon = TIER_ICONS[tier.icon] || Package;
  const memberFeeAmount = useMemo(
    () => parseCurrencyAmount(tier.price),
    [tier.price],
  );
  const adminFeeAmount = useMemo(
    () => parseCurrencyAmount(tier.adminFee),
    [tier.adminFee],
  );
  const totalPayableAmount = memberFeeAmount + adminFeeAmount;
  const memberFeeLabel = useMemo(
    () => formatCurrencyAmount(memberFeeAmount, tier.price),
    [memberFeeAmount, tier.price],
  );
  const adminFeeLabel = useMemo(
    () => formatCurrencyAmount(adminFeeAmount, tier.adminFee),
    [adminFeeAmount, tier.adminFee],
  );
  const totalPayableLabel = useMemo(
    () =>
      formatCurrencyAmount(
        totalPayableAmount,
        `${String(tier.price || "").trim()} + ${String(
          tier.adminFee || "",
        ).trim()}`,
      ),
    [totalPayableAmount, tier.adminFee, tier.price],
  );

  const fullName = useMemo(
    () => joinMemberName(form.personalDetails),
    [form.personalDetails],
  );
  const familyEnabled = isMarriageRelatedStatus(
    form.personalDetails.maritalStatus,
  );
  const isBusy =
    submitting ||
    isUploadingFile ||
    mobileState.sending ||
    mobileState.verifying ||
    emailState.sending ||
    emailState.verifying;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!feedback.message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4500);

    return () => window.clearTimeout(timeoutId);
  }, [feedback.message]);

  useEffect(() => {
    if (!familyEnabled) {
      setForm((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          anniversary: "",
        },
        familyDetails: {
          spouse: {
            name: "",
            dob: "",
            email: "",
            mobile: "",
          },
          children: prev.familyDetails.children.map((child) => ({
            ...child,
            name: "",
            dob: "",
            gender: "",
          })),
        },
        documents: {
          ...prev.documents,
          spouseId: null,
        },
      }));
    }
  }, [familyEnabled]);

  const stepOneValid = useMemo(() => {
    const { personalDetails, contactDetails, addressDetails } = form;

    return Boolean(
      personalDetails.firstName.trim() &&
      personalDetails.dob &&
      personalDetails.occupation &&
      personalDetails.gender &&
      personalDetails.maritalStatus &&
      contactDetails.mobile.length === 10 &&
      mobileState.verified &&
      isEmailValid(contactDetails.email) &&
      emailState.verified &&
      addressDetails.residence.addressLine.trim() &&
      addressDetails.residence.city.trim() &&
      addressDetails.residence.state &&
      addressDetails.residence.country.trim() &&
      form.acceptedTerms,
    );
  }, [emailState.verified, form, mobileState.verified]);

  const stepTwoChecks = useMemo(() => {
    const { documents, acceptedTerms } = form;

    return [
      {
        label: "Aadhaar card",
        complete: Boolean(
          documents.idProof?.dataUrl ||
            documents.idProof?.url ||
            documents.idProof?.name,
        ),
      },
    ];
  }, [form]);

  const stepTwoValid = useMemo(
    () => stepTwoChecks.every((check) => check.complete),
    [stepTwoChecks],
  );

  const showToast = (nextFeedback) => setFeedback(nextFeedback);

  const updatePersonal = (field, value) => {
    setForm((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value,
      },
    }));
  };

  const updateContact = (field, value) => {
    setForm((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [field]: value,
      },
    }));

    if (field === "mobile") {
      setMobileState(createVerificationState());
    }

    if (field === "email") {
      setEmailState(createVerificationState());
    }
  };

  const updateAddress = (group, field, value) => {
    setForm((prev) => ({
      ...prev,
      addressDetails: {
        ...prev.addressDetails,
        [group]: {
          ...prev.addressDetails[group],
          [field]: value,
        },
      },
    }));
  };

  const updateAddressFields = (group, values) => {
    setForm((prev) => ({
      ...prev,
      addressDetails: {
        ...prev.addressDetails,
        [group]: {
          ...prev.addressDetails[group],
          ...values,
        },
      },
    }));
  };

  const updateSpouse = (field, value) => {
    setForm((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        spouse: {
          ...prev.familyDetails.spouse,
          [field]: value,
        },
      },
    }));
  };

  const updateChild = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        children: prev.familyDetails.children.map((child, childIndex) =>
          childIndex === index ? { ...child, [field]: value } : child,
        ),
      },
    }));
  };

  const addChild = () => {
    setForm((prev) => ({
      ...prev,
      familyDetails: {
        ...prev.familyDetails,
        children: [
          ...prev.familyDetails.children,
          createEmptyChild(prev.familyDetails.children.length),
        ],
      },
    }));
  };

  const updateDocumentType = (field, value) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: value,
      },
    }));
  };

  const handleFileChange = async (field, file) => {
    if (!file) {
      return;
    }

    if (
      field === "addressProof" &&
      !String(form.documents.addressProofType || "").trim()
    ) {
      showToast({
        type: "error",
        message: "Please choose the address proof ID type first.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast({
        type: "error",
        message: `${file.name} is too large. Max 1.5MB.`,
      });
      return;
    }

    try {
      setIsUploadingFile(true);
      const encodedFile = await toBase64Document(file);

      setForm((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: encodedFile,
        },
      }));

      showToast({
        type: "success",
        message: `${file.name} added successfully.`,
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Unable to read the selected file.",
      });
    } finally {
      setIsUploadingFile(false);
    }
  };

  const sendOtp = async ({ channel, value }) => {
    const normalizedValue = String(value || "").trim();

    if (!normalizedValue) {
      showToast({
        type: "error",
        message: `Enter ${channel === "email" ? "email" : "mobile number"} first.`,
      });
      return;
    }

    const endpoint =
      channel === "email"
        ? "/api/auth/email/send-otp"
        : "/api/auth/mobile/send-otp";
    const payload =
      channel === "email"
        ? { email: normalizedValue.toLowerCase() }
        : { mobile: normalizedValue.replace(/\D/g, "") };
    const setState = channel === "email" ? setEmailState : setMobileState;

    setState((prev) => ({ ...prev, sending: true }));
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send verification code.");
      }

      setState((prev) => ({
        ...prev,
        requested: true,
        verified: false,
        otp: "",
      }));

      showToast({
        type: "success",
        message:
          channel === "email"
            ? "Verification code sent to your email address."
            : "Verification code sent to your mobile number.",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Failed to send verification code.",
      });
    } finally {
      setState((prev) => ({ ...prev, sending: false }));
    }
  };

  const verifyOtp = async ({ channel, value, otp }) => {
    const normalizedValue = String(value || "").trim();
    const normalizedOtp = String(otp || "").trim();

    if (!normalizedValue || !normalizedOtp) {
      showToast({
        type: "error",
        message: `Enter ${channel === "email" ? "email" : "mobile number"} and OTP.`,
      });
      return;
    }

    const endpoint =
      channel === "email"
        ? "/api/auth/email/verify-otp"
        : "/api/auth/mobile/verify-otp";
    const payload =
      channel === "email"
        ? { email: normalizedValue.toLowerCase(), otp: normalizedOtp }
        : { mobile: normalizedValue.replace(/\D/g, ""), otp: normalizedOtp };
    const setState = channel === "email" ? setEmailState : setMobileState;

    setState((prev) => ({ ...prev, verifying: true }));
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to verify OTP.");
      }

      setState((prev) => ({
        ...prev,
        requested: true,
        verified: true,
      }));

      showToast({
        type: "success",
        message:
          channel === "email"
            ? "Email verified successfully."
            : "Mobile number verified successfully.",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Failed to verify OTP.",
      });
    } finally {
      setState((prev) => ({ ...prev, verifying: false }));
    }
  };

  const buildSubmissionPayload = () => ({
    personalDetails: {
      title: String(form.personalDetails.title || "").trim(),
      firstName: String(form.personalDetails.firstName || "").trim(),
      lastName: String(form.personalDetails.lastName || "").trim(),
      fullName,
      email: String(form.contactDetails.email || "")
        .trim()
        .toLowerCase(),
      mobile: String(form.contactDetails.mobile || "").replace(/\D/g, ""),
      dob: String(form.personalDetails.dob || "").trim(),
      occupation: String(form.personalDetails.occupation || "").trim(),
      gender: String(form.personalDetails.gender || "").trim(),
      maritalStatus: String(form.personalDetails.maritalStatus || "").trim(),
      anniversary: String(form.personalDetails.anniversary || "").trim(),
      residenceAddress: {
        ...form.addressDetails.residence,
      },
      officeAddress: {
        ...form.addressDetails.office,
      },
      correspondenceAddress: {
        ...form.addressDetails.correspondence,
      },
    },
    familyDetails: {
      spouse: {
        name: String(form.familyDetails.spouse.name || "").trim(),
        dob: String(form.familyDetails.spouse.dob || "").trim(),
        email: String(form.familyDetails.spouse.email || "")
          .trim()
          .toLowerCase(),
        mobile: String(form.familyDetails.spouse.mobile || "").replace(
          /\D/g,
          "",
        ),
      },
      children: form.familyDetails.children
        .map((child) => ({
          name: String(child.name || "").trim(),
          dob: String(child.dob || "").trim(),
          gender: String(child.gender || "").trim(),
        }))
        .filter((child) => child.name || child.dob || child.gender),
    },
    documents: {
      profileImage: form.documents.profileImage,
      idProof: form.documents.idProof
        ? {
            ...form.documents.idProof,
            proofType: form.documents.idProofType || "Aadhaar Card",
          }
        : null,
      addressProof: form.documents.addressProof
        ? {
            ...form.documents.addressProof,
            proofType: form.documents.addressProofType,
          }
        : null,
      spouseId: form.documents.spouseId || null,
    },
    acceptedTerms: form.acceptedTerms,
  });

  const handleContinue = () => {
    if (!stepOneValid) {
      showToast({
        type: "error",
        message:
          "Complete the required fields and verify your mobile number and email to continue.",
      });
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stepTwoValid) {
      showToast({
        type: "error",
        message:
          "Please complete the documents section and accept the terms before payment.",
      });
      return;
    }

    try {
      setSubmitting(true);

      const isScriptLoaded = await loadRazorpayScript();

      if (
        !isScriptLoaded ||
        typeof window === "undefined" ||
        !window.Razorpay
      ) {
        throw new Error("Unable to load Razorpay checkout right now.");
      }

      const memberDetails = buildSubmissionPayload();
      const orderData = await createMembershipPaymentOrder({
        tierId: tier.id,
        memberDetails,
      });

      const razorpay = new window.Razorpay({
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Own Holiday Club",
        description: `${tier.name} Membership`,
        order_id: orderData.order.id,
        prefill: {
          name: orderData.user?.name || fullName,
          email: orderData.user?.email || memberDetails.personalDetails.email,
          contact:
            orderData.user?.mobile || memberDetails.personalDetails.mobile,
        },
        notes: {
          membershipTierId: tier.id,
          membershipTierName: tier.name,
        },
        theme: {
          color: "#f59e0b",
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
        handler: async (paymentResponse) => {
          try {
            const verificationResult = await verifyMembershipPayment({
              tierId: tier.id,
              memberDetails,
              ...paymentResponse,
            });

            window.localStorage.setItem(
              "ohc_user_id",
              String(verificationResult?.user?._id || ""),
            );
            window.localStorage.setItem(
              "ohc_user",
              JSON.stringify(verificationResult?.user || {}),
            );
            window.dispatchEvent(new Event("ohc-auth-changed"));
            router.push("/profile?tab=payment");
          } catch (error) {
            setSubmitting(false);
            showToast({
              type: "error",
              message: error.message || "Payment verification failed.",
            });
          }
        },
      });

      razorpay.on("payment.failed", () => {
        setSubmitting(false);
        showToast({
          type: "error",
          message: "Payment failed. Please try again.",
        });
      });

      razorpay.open();
    } catch (error) {
      setSubmitting(false);
      showToast({
        type: "error",
        message: error.message || "Unable to start payment.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-4 md:pt-28 md:pb-6">
      <div className="site-width mx-auto">
        <div className="mb-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-600"
          >
            <ArrowLeft size={16} />
            Back to Membership Plans
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="px-4 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
            <div className="mb-4 grid gap-3 lg:grid-cols-3">
              <PurchaseOverviewCard
                icon={TierVisualIcon}
                label="Package Name"
                value={tier.name}
                hint={getTierAccessLabel(tier)}
                tone="featured"
              />
              <PurchaseOverviewCard
                icon={currentStep === 1 ? LoaderCircle : Sparkles}
                label="Step 1"
                value="Personal Details"
                hint="Provide your information"
                tone={currentStep === 1 ? "accent" : "default"}
              />
              <PurchaseOverviewCard
                icon={currentStep === 2 ? LoaderCircle : CreditCard}
                label="Step 2"
                value="Finalize & Pay"
                hint="Documents and payment"
                tone={currentStep === 2 ? "accent" : "default"}
              />
            </div>

            <div className="mb-6 mt-5 px-1 md:mb-7 md:mt-6">
              <div aria-hidden="true" className="h-px w-full bg-slate-200" />
            </div>

            {feedback.message ? (
              <div
                className={`mb-3 rounded-xl border px-3 py-2 text-sm font-medium ${
                  feedback.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-3">
              {currentStep === 1 ? (
                <MembershipPurchaseStepOne
                  form={form}
                  mobileState={mobileState}
                  emailState={emailState}
                  updatePersonal={updatePersonal}
                  updateContact={updateContact}
                  updateAddress={updateAddress}
                  updateAddressFields={updateAddressFields}
                  setMobileState={setMobileState}
                  setEmailState={setEmailState}
                  sendOtp={sendOtp}
                  verifyOtp={verifyOtp}
                  familyEnabled={familyEnabled}
                  updateSpouse={updateSpouse}
                  updateChild={updateChild}
                  addChild={addChild}
                  setForm={setForm}
                />
              ) : (
                <MembershipPurchaseStepTwo
                  form={form}
                  familyEnabled={familyEnabled}
                  updateSpouse={updateSpouse}
                  updateChild={updateChild}
                  addChild={addChild}
                  updateDocumentType={updateDocumentType}
                  handleFileChange={handleFileChange}
                  setForm={setForm}
                  baseUrl={baseUrl}
                />
              )}

              {currentStep === 1 && (
                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-center">
                  <label className="flex items-start gap-3 text-[14px] text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.acceptedTerms}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          acceptedTerms: event.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <span className="leading-5">
                        I agree to the <span className="font-semibold text-slate-800">Terms & Conditions</span>
                      </span>
                      <a
                        href="/OHCTerms.pdf"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 rounded bg-[#C8102E]/10 px-2 py-0.5 text-[11px] font-bold text-[#C8102E] hover:bg-[#C8102E]/20 transition-colors"
                      >
                        View PDF
                      </a>
                    </span>
                  </label>
                </div>
              )}

              <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
                {currentStep === 2 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    disabled={isBusy}
                    className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[12px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-500 transition hover:border-amber-200 hover:text-amber-600 disabled:opacity-60"
                  >
                    <ArrowLeft size={16} />
                    Back to step 1
                  </button>
                ) : null}

                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={isBusy}
                    className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[12px] bg-amber-500 px-6 text-[14px] font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isBusy}
                    className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[12px] bg-amber-500 px-6 text-[14px] font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <CreditCard size={16} />
                    )}
                    {submitting ? "Processing..." : "Continue to Payment"}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function PurchaseOverviewCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}) {
  const toneClasses =
    tone === "featured"
      ? {
          card: "bg-[#FEF2F2]/50 border-[#FEE2E2]",
          label: "text-[#C8102E]",
          accent: "bg-[#C8102E]",
        }
      : tone === "accent"
        ? {
            card: "bg-[#ECFDF5]/50 border-[#D1FAE5]",
            label: "text-emerald-700",
            accent: "bg-emerald-500",
          }
        : {
            card: "bg-[#FFFBEB]/50 border-[#FEF3C7]",
            label: "text-amber-700",
            accent: "bg-amber-500",
          };

  return (
    <div
      className={`rounded-none border-2 p-3 flex flex-col justify-between h-24 shadow-sm transition ${toneClasses.card}`}
    >
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-wider ${toneClasses.label}`}>
          {label}
        </p>
        <div className={`h-0.5 w-8 mt-1 ${toneClasses.accent}`}></div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-xl font-black text-slate-900 leading-none">
          {value}
        </h3>
        {hint && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

function parseCurrencyAmount(value) {
  const normalized = String(value || "").replace(/[^0-9.]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

function formatCurrencyAmount(value, fallback = "") {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return String(fallback || "").trim();
  }

  return `Rs${new Intl.NumberFormat("en-IN").format(amount)}`;
}
