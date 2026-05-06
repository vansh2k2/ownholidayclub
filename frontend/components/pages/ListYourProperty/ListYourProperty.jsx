"use client";

import React, { useState } from "react";
import Benefits from "./Benefits";
import Faq from "./Faq";
import Form from "./Form";
import Hero from "./Hero";
import {
  BedDouble,
  Building,
  Coffee,
  MapPin,
  Sparkles,
  Users,
  Waves,
  Wifi,
} from "lucide-react";
import { createImageFallback } from "@/lib/createImageFallback";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024;

const toBase64Photo = (file) =>
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

// Fallback image handler
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

// Partner FAQ Data
const partnerFaqs = [
  {
    q: "What are the setup or listing fees?",
    a: "Zero. We operate on a pure performance-based model. There are no upfront fees, listing costs, or hidden maintenance charges to join our portfolio. We only earn when we successfully deliver elite guests to your property.",
  },
  {
    q: "Do I have to give up control of my inventory?",
    a: "Absolutely not. You retain full control over your allocation. You simply provide us with a live dynamic allotment or a fixed number of rooms per month, and you can manage blackout dates through our dedicated partner portal.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payments are fully secured and disbursed directly to your account 30 days prior to the guest's arrival. You never have to worry about collections or cancellations.",
  },
  {
    q: "What type of guests will I be receiving?",
    a: "Our members are highly vetted, affluent travelers (families, executives, and couples) who value luxury and respect premium properties. Our partners consistently report that Own Holiday Club members are among their highest-spending and lowest-maintenance guests.",
  },
];

const AMENITIES_LIST = [
  { id: "pool", label: "Infinity Pool", icon: <Waves size={16} /> },
  { id: "spa", label: "Luxury Spa", icon: <Sparkles size={16} /> },
  { id: "wifi", label: "High-Speed Wi-Fi", icon: <Wifi size={16} /> },
  { id: "dining", label: "Fine Dining", icon: <Coffee size={16} /> },
  { id: "gym", label: "Fitness Center", icon: <Building size={16} /> },
  {
    id: "room_service",
    label: "24/7 Room Service",
    icon: <BedDouble size={16} />,
  },
  { id: "beach", label: "Private Beach Access", icon: <MapPin size={16} /> },
  { id: "concierge", label: "Dedicated Concierge", icon: <Users size={16} /> },
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
    city: "",
    country: "",
    description: "",
    basePrice: "",
    amenities: [],
    photos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const toggleAmenity = (id) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id],
    }));
    setFormError("");
  };

  const handleMockFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const oversizedFile = files.find((file) => file.size > MAX_PHOTO_SIZE_BYTES);

      if (oversizedFile) {
        setFormError(`${oversizedFile.name} is too large. Please keep each image under 2MB.`);
        return;
      }

      const newPhotos = files.map((file) => ({
        file,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }));
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }));
      setFormError("");
    }
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
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
        formData.city &&
        formData.country
      );
    if (step === 3) return formData.amenities.length > 0;
    return true;
  };

  const handleNext = (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (validateStep() && step < 4) {
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
    if (!validateStep() && step < 4) return;

    setFormStatus("submitting");
    setFormError("");

    try {
      const photos = await Promise.all(
        formData.photos.map((photo) => toBase64Photo(photo.file)),
      );

      const response = await fetch(`${API_BASE_URL}/api/property-listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          propertyName: formData.propertyName,
          propertyType: formData.propertyType,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          description: formData.description,
          basePrice: formData.basePrice,
          amenities: formData.amenities,
          photos,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit listing.");
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
        city: "",
        country: "",
        description: "",
        basePrice: "",
        amenities: [],
        photos: [],
      });
    } catch (error) {
      setFormStatus("idle");
      setFormError(error.message || "Unable to submit listing.");
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
        amenitiesList={AMENITIES_LIST}
        onInputChange={handleInputChange}
        onToggleAmenity={toggleAmenity}
        onMockFileUpload={handleMockFileUpload}
        onRemovePhoto={removePhoto}
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
