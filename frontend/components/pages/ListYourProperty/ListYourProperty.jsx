"use client";

import React, { useState } from "react";
import Benefits from "./Benefits";
import Faq from "./Faq";
import Form from "./Form";
import Hero from "./Hero";
import { createImageFallback } from "@/lib/createImageFallback";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

// Fallback image handler
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

// Partner FAQ Data
const partnerFaqs = [
  {
    q: "How does the lead pricing work?",
    a: "We offer flexible lead packages including Pay-Per-Lead and Monthly Subscriptions. Once you submit your application, our team will contact you with specific pricing based on your destination and property type.",
  },
  {
    q: "How will I receive the leads?",
    a: "Approved partners receive verified leads directly to their registered email address and WhatsApp number in an easy-to-read format, including all guest requirements.",
  },
  {
    q: "Are the leads exclusive?",
    a: "Depending on your selected package, leads can be exclusive or shared among a highly limited pool of premium partners in your destination.",
  },
  {
    q: "What type of guests will I be receiving?",
    a: "Our members are highly vetted, affluent travelers (families, executives, and couples) who value luxury and respect premium properties. Our partners consistently report that Own Holiday Club members are among their highest-spending guests.",
  },
];

export default function ListProperty() {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success
  const [formError, setFormError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    propertyType: "",
    address: "",
    targetDestination: "",
    leadPackage: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const validateStep = () => {
    if (step === 1)
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone
      );
    if (step === 2)
      return (
        formData.propertyName &&
        formData.propertyType &&
        formData.targetDestination
      );
    if (step === 3) return formData.leadPackage;
    return true;
  };

  const handleNext = (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (validateStep() && step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep() && step < 3) return;

    setFormStatus("submitting");
    setFormError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/property-listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit partnership request.");
      }

      setFormStatus("success");
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyName: "",
        propertyType: "",
        address: "",
        targetDestination: "",
        leadPackage: "",
        description: "",
      });
    } catch (error) {
      setFormStatus("idle");
      setFormError(error.message || "Unable to submit partnership request.");
    }
  };

  const resetFormStatus = () => {
    setFormStatus("idle");
    setFormError("");
  };

  const scrollToForm = () => {
    document
      .getElementById("partner-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden luxury-property-container">
      <Hero onImageError={handleImageError} onScrollToForm={scrollToForm} />
      <Benefits />
      <Form
        formStatus={formStatus}
        formError={formError}
        step={step}
        formData={formData}
        onInputChange={handleInputChange}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        onReset={resetFormStatus}
        validateStep={validateStep}
      />
      <Faq partnerFaqs={partnerFaqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
    </div>
  );
}
