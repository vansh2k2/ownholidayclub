"use client";

import React, { useEffect, useState } from "react";
import BottomCta from "./BottomCta";
import Gallery from "./Gallery";
import Hero from "./Hero";
import LeadForm from "./LeadForm";
import Modal from "./Modal";
import Overview from "./Overview";
import Properties from "./Properties";
import QuickFacts from "./QuickFacts";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchDestinationById } from "@/lib/destinations";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);
const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DestinationDetailPage({ destinationId }) {
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
    location: "",
    fromLocation: "",
    toLocation: "",
    message: "",
  });
  const [activeModal, setActiveModal] = useState(null);
  const [modalFilter, setModalFilter] = useState("All");
  const [formStep, setFormStep] = useState("initial");
  const [formError, setFormError] = useState("");
  const [destinationData, setDestinationData] = useState(null);

  useEffect(() => {
    const loadDestination = async () => {
      const nextDestination = await fetchDestinationById(destinationId);

      if (nextDestination) {
        setDestinationData(nextDestination);
      }
    };

    loadDestination();
  }, [destinationId]);

  if (!destinationData) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-3">
            Destination not found
          </h1>
          <p className="text-slate-500">
            This destination is not available from the API right now.
          </p>
        </div>
      </div>
    );
  }

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
    const location = String(formData.location || "").trim();
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
      // travelType is optional for destination enquiries
    }

    setFormStep("submitting");
    setFormError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
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
          location,
          fromLocation: String(formData.fromLocation || "").trim(),
          toLocation: String(formData.toLocation || "").trim(),
          message,
          destinationId: destinationData?._id,
          destinationName: destinationData?.name || "",
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
          location: "",
          fromLocation: "",
          toLocation: "",
          message: "",
        });
        setFormError("");
      }, 6000);
    } catch (error) {
      setFormStep("initial");
      setFormError(error.message || "Unable to submit your inquiry.");
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden">
      <Hero
        destinationData={destinationData}
        onImageError={handleImageError}
      />
      <QuickFacts destinationData={destinationData} />
      <LeadForm
        destinationData={destinationData}
        formData={formData}
        formStep={formStep}
        formError={formError}
        handleInputChange={handleInputChange}
        handleSubmitLead={handleSubmitLead}
      />
      <Overview destinationData={destinationData} />
      <Gallery
        destinationData={destinationData}
        onImageError={handleImageError}
      />
      <Properties
        destinationData={destinationData}
        setActiveModal={setActiveModal}
        setModalFilter={setModalFilter}
        onImageError={handleImageError}
      />
      <BottomCta
        destinationData={destinationData}
        onScrollToForm={scrollToForm}
      />
      {activeModal && (
        <Modal
          activeModal={activeModal}
          destinationData={destinationData}
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
