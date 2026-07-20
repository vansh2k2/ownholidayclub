"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Compass, Heart, Music } from "lucide-react";
import ServiceCtaSection from "./Cta";
import ServiceExpertiseSection from "./Expertise";
import ServiceHeroSection from "./Hero";
import ServiceHighlightSection from "./Highlight";
import ServiceSignatureSection from "./Signature";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchServices } from "@/lib/services";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

const getServiceIcon = (title = "", category = "") => {
  const value = `${title} ${category}`.toLowerCase();

  if (value.includes("wedding")) return <Heart size={28} />;
  if (value.includes("corporate") || value.includes("business"))
    return <Briefcase size={28} />;
  if (value.includes("music") || value.includes("entertainment"))
    return <Music size={28} />;
  if (value.includes("outing") || value.includes("excursion"))
    return <Compass size={28} />;

  return <Compass size={28} />;
};

export default function Services() {
  const [signatureServices, setSignatureServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const services = await fetchServices();
      const mapped = services.map((service) => ({
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        features: Array.isArray(service.highlights) ? service.highlights : [],
        image:
          service.heroImage ||
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
        icon: getServiceIcon(service.title, service.category),
      }));

      setSignatureServices(mapped);
    };

    loadServices();
  }, []);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-slate-900 selection:text-white overflow-hidden luxury-services-container">
      <ServiceHeroSection onImageError={handleImageError} />
      <ServiceSignatureSection
        services={signatureServices}
        onImageError={handleImageError}
      />
      <ServiceExpertiseSection onImageError={handleImageError} />
      <ServiceHighlightSection />
      <ServiceCtaSection />
    </div>
  );
}
