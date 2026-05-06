"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 400], [0, 45]);
  const heroOp = useTransform(scrollY, [0, 320], [1, 0.58]);

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
          src="/contact.jpg"
          alt="Services"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            Our{" "}
            <em
              style={{ color: "#f5b843", fontWeight: 800, fontStyle: "italic" }}
            >
              Services.
            </em>
          </h1>
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
            Experience world-class hospitality and personalized experiences
            crafted just for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}