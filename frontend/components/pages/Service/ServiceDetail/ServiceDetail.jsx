"use client";

import React, { useEffect, useState } from "react";
import ServiceDetailBottomCtaSection from "./BottomCta";
import ServiceDetailGallerySection from "./Gallery";
import ServiceDetailHeroSection from "./Hero";
import ServiceDetailLeadForm from "./LeadForm";
import ServiceDetailModal from "./Modal";
import ServiceDetailOverviewSection from "./Overview";
import ServiceDetailQuickFacts from "./QuickFacts";
import ServiceDetailSubEvents from "./SubEvents";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchServiceById } from "@/lib/services";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);
const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ServiceDetailPage({ serviceId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    kids: "0",
    travelType: "",
    budget: "",
    fromLocation: "",
    toLocation: "",
    subEvent: "",
    marriageDate: "",
    message: "",
  });
  const [activeModal, setActiveModal] = useState(null);
  const [modalFilter, setModalFilter] = useState("All");
  const [formStep, setFormStep] = useState("initial");
  const [formError, setFormError] = useState("");
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const nextService = await fetchServiceById(serviceId);
      if (nextService) {
        setServiceData(nextService);
      }
    };

    loadService();
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : name === "adults" || name === "kids"
            ? value.replace(/\D/g, "")
            : value,
    }));
  };

  const scrollToForm = () => {
    document
      .getElementById("inquiry-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    const name = String(formData.name || "").trim();
    const email = String(formData.email || "").trim().toLowerCase();
    const phone = String(formData.phone || "").replace(/\D/g, "");
    const checkIn = String(formData.checkIn || "").trim();
    const checkOut = String(formData.checkOut || "").trim();
    const adults = Number(formData.adults || 0);
    const kids = Number(formData.kids || 0);
    const travelType = String(formData.travelType || "").trim();
    const budget = String(formData.budget || "").trim();
    const fromLocation = String(formData.fromLocation || "").trim();
    const toLocation = String(formData.toLocation || "").trim();
    const message = String(formData.message || "").trim();

    if (name.length < 2) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (phone.length !== 10) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!checkIn || !checkOut) {
      setFormError("Please select both check-in and check-out.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setFormError("Check-out must be later than check-in.");
      return;
    }

    if (!Number.isInteger(adults) || adults <= 0) {
      setFormError("Please enter a valid number of adults.");
      return;
    }

    if (!Number.isInteger(kids) || kids < 0) {
      setFormError("Please enter a valid number of kids.");
      return;
    }

    if (!travelType) {
      setFormError("Please select a travel type.");
      return;
    }

    setFormStep("submitting");
    setFormError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/service-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          checkIn,
          checkOut,
          adults,
          kids,
          travelType,
          budget,
          fromLocation,
          toLocation,
          message,
          marriageDate: formData.marriageDate || "",
          serviceName: formData.subEvent ? `${serviceData?.title || ""} - ${formData.subEvent}` : serviceData?.title || "",
          subEvent: formData.subEvent || "",
          serviceId: serviceData?._id || null,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit your inquiry.");
      }

      setFormStep("success");
      setTimeout(() => {
        setFormStep("initial");
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          adults: "2",
          kids: "0",
          travelType: "",
          budget: "",
          fromLocation: "",
          toLocation: "",
          subEvent: "",
          marriageDate: "",
          message: "",
        });
        setFormError("");
      }, 3000);
    } catch (error) {
      setFormStep("initial");
      setFormError(error.message || "Unable to submit your inquiry.");
    }
  };

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-3">
            Service not found
          </h1>
          <p className="text-slate-500">
            This service is not available from the API right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden">
      <ServiceDetailHeroSection
        serviceData={serviceData}
        onImageError={handleImageError}
      />
      <ServiceDetailQuickFacts serviceData={serviceData} selectedSubEvent={formData.subEvent} />
      
      {/* Overview/Experience Section First */}
      <ServiceDetailOverviewSection serviceData={serviceData} />
      
      {/* Sub Categories Second */}
      <ServiceDetailSubEvents 
        serviceData={serviceData}
        onSelectCategory={(subEvent) => {
          setFormData(prev => ({ 
            ...prev, 
            subEvent: subEvent.title,
            message: `I would like to inquire about the ${subEvent.title} package.` 
          }));
          scrollToForm();
        }}
      />
      
      {/* Lead Form Third */}
      <ServiceDetailLeadForm
        serviceData={serviceData}
        formData={formData}
        formStep={formStep}
        formError={formError}
        handleInputChange={handleInputChange}
        handleSubmitLead={handleSubmitLead}
      />
      
      <ServiceDetailGallerySection
        serviceData={serviceData}
        onImageError={handleImageError}
      />

      <ServiceDetailBottomCtaSection
        serviceData={serviceData}
        onScrollToForm={scrollToForm}
      />
      {activeModal && (
        <ServiceDetailModal
          activeModal={activeModal}
          serviceData={serviceData}
          modalFilter={modalFilter}
          onImageError={handleImageError}
          scrollToForm={scrollToForm}
          setActiveModal={setActiveModal}
          setModalFilter={setModalFilter}
        />
      )}
    </div>
  );
}
