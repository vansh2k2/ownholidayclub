"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export default function Hero() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 400], [0, 45]);
  const heroOp = useTransform(scrollY, [0, 320], [1, 0.58]);

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/hero-images/page/Services?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            setHeroData(resData.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero image for Services", error);
      }
    };
    fetchHeroData();
  }, []);

  const backgroundImage = heroData?.backgroundImage || "/contact.jpg";
  const altText = heroData?.imageAltText || "Services";
  const title = heroData?.title || "Our";
  const highlightedText = heroData?.highlightedText || "Services.";
  const shortDescription = heroData?.shortDescription || "Experience world-class hospitality and personalized experiences crafted just for you.";

  return (
    <section
      style={{
        position: "relative",
        height: "60vh",
        minHeight: 400,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          scale: heroScale,
          y: heroY,
          opacity: heroOp,
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,8,5,0.56)",
          }}
        />
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-.02em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {title}{" "}
            {highlightedText && (
              <em
                style={{ color: "#f5b843", fontWeight: 800, fontStyle: "italic" }}
              >
                {highlightedText}
              </em>
            )}
          </h1>
          {shortDescription && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.62)",
                fontSize: 14,
                maxWidth: 450,
                margin: "0 auto",
                lineHeight: 1.78,
              }}
            >
              {shortDescription}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}