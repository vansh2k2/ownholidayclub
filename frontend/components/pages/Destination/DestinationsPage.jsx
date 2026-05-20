"use client";

import React, { useEffect, useState } from "react";
import { Compass, Sun, Mountain, Building, Palmtree } from "lucide-react";
import Cta from "./Cta";
import Experience from "./Experience";
import Grid from "./Grid";
import Hero from "./Hero";
import Spotlight from "./Spotlight";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchDestinations } from "@/lib/destinations";

// Fallback image handler
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

const getCategoryIcon = (category) => {
  switch (category) {
    case "Mountains":
      return <Mountain size={18} />;
    case "Urban":
      return <Building size={18} />;
    case "Tropical":
      return <Palmtree size={18} />;
    case "Beaches":
      return <Sun size={18} />;
    case "Heritage":
      return <Compass size={18} />;
    default:
      return <Compass size={18} />;
  }
};

export default function Destinations() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [destinationsData, setDestinationsData] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadDestinations = async () => {
      const destinations = await fetchDestinations();
      setDestinationsData(destinations);
    };

    loadDestinations();
  }, []);

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  // Apply filtering and searching logic
  const enrichedDestinations = destinationsData.map((destination) => ({
    ...destination,
    icon: getCategoryIcon(destination.category),
  }));

  const filteredAndSearchedDestinations = enrichedDestinations.filter((dest) => {
    const matchesFilter = filter === "All" || dest.region === filter;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSearchedDestinations.length / itemsPerPage,
  );
  const currentDestinations = filteredAndSearchedDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden luxury-destinations-container">
      <Hero
        onImageError={handleImageError}
        destinationCount={enrichedDestinations.length}
      />
      <Grid
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentDestinations={currentDestinations}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onImageError={handleImageError}
      />
      <Spotlight
        onImageError={handleImageError}
        featuredDestination={
          enrichedDestinations.find(
            (destination) =>
              destination.slug === "maldives" ||
              destination._id === "maldives" ||
              destination.id === "maldives"
          ) || enrichedDestinations[0]
        }
      />
      <Experience onImageError={handleImageError} />
      <Cta />
    </div>
  );
}
