"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { api } from "@/lib/api";

// Floating mini bubble component
const MiniBubble = ({ color, style }) => (
  <div
    style={{
      position: "absolute",
      width: style.size,
      height: style.size,
      borderRadius: "50%",
      background: color,
      opacity: 0,
      animation: `floatBubble ${style.duration}s ease-in-out ${style.delay}s infinite`,
      left: style.left,
      bottom: style.bottom,
      pointerEvents: "none",
      zIndex: 0,
      filter: "blur(0.5px)",
    }}
  />
);

const SocialSidebar = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ambientBubbles, setAmbientBubbles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 200);

    // Fetch social links from backend
    const fetchSocialLinks = async () => {
      try {
        const response = await api.get("/api/social-media");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setSocialLinks({
            facebook: data.facebook || "https://facebook.com",
            instagram: data.instagram || "https://instagram.com",
            twitter: data.twitter || "https://twitter.com",
            linkedin: data.linkedin || "https://linkedin.com",
            youtube: data.youtube || "https://youtube.com",
          });
        }
      } catch (error) {
        console.error("Error fetching social media links:", error);
      }
    };
    fetchSocialLinks();

    // Generate ambient bubbles that float up constantly
    const bubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: `${Math.random() * 6 + 3}px`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      left: `${Math.random() * 90}%`,
      bottom: `${Math.random() * 10}%`,
      color: `hsla(${Math.random() * 360}, 70%, 75%, 0.5)`,
    }));
    setAmbientBubbles(bubbles);
  }, []);

  if (!mounted) return null;

  const normalizeUrl = (url) => {
    if (!url) return "";
    let u = url.trim();
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    return "https://" + u;
  };

  const safeHref = (url) => (url?.trim() ? normalizeUrl(url) : "#");

  const socialData = [
    {
      icon: Facebook,
      url: socialLinks.facebook,
      bg: "#1877F2",
      softBg: "rgba(24, 119, 242, 0.12)",
      glow: "rgba(24, 119, 242, 0.4)",
      label: "Facebook",
    },
    {
      icon: Instagram,
      url: socialLinks.instagram,
      bg: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
      softBg: "rgba(225, 48, 108, 0.12)",
      glow: "rgba(225, 48, 108, 0.4)",
      label: "Instagram",
    },
    {
      icon: Twitter,
      url: socialLinks.twitter,
      bg: "#1DA1F2",
      softBg: "rgba(29, 161, 242, 0.12)",
      glow: "rgba(29, 161, 242, 0.4)",
      label: "Twitter",
    },
    {
      icon: Youtube,
      url: socialLinks.youtube,
      bg: "#FF0000",
      softBg: "rgba(255, 0, 0, 0.10)",
      glow: "rgba(255, 0, 0, 0.35)",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      url: socialLinks.linkedin,
      bg: "#0A66C2",
      softBg: "rgba(10, 102, 194, 0.12)",
      glow: "rgba(10, 102, 194, 0.4)",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes entryBounce {
          0% { transform: translateX(60px) scale(0.4); opacity: 0; }
          60% { transform: translateX(-6px) scale(1.08); opacity: 1; }
          80% { transform: translateX(4px) scale(0.97); }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }

        @keyframes floatBubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: 0.7; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-90px) scale(0.3); opacity: 0; }
        }

        @keyframes burstBubble {
          0% { transform: scale(0) translateY(0); opacity: 0.8; }
          60% { transform: scale(1.4) translateY(-14px); opacity: 0.5; }
          100% { transform: scale(0.1) translateY(-28px); opacity: 0; }
        }

        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0 var(--glow); }
          50% { box-shadow: 0 0 0 7px transparent; }
        }

        @keyframes wobble {
          0% { transform: rotate(0deg) scale(1.12); }
          25% { transform: rotate(-8deg) scale(1.14); }
          50% { transform: rotate(6deg) scale(1.12); }
          75% { transform: rotate(-4deg) scale(1.13); }
          100% { transform: rotate(0deg) scale(1.12); }
        }

        @keyframes tooltipIn {
          0% { transform: translateY(-50%) translateX(10px) scale(0.85); opacity: 0; }
          100% { transform: translateY(-50%) translateX(0) scale(1); opacity: 1; }
        }

        @keyframes sidebarFloat {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50% { transform: translateY(-50%) translateY(-5px); }
        }

        .sidebar-wrap {
          animation: sidebarFloat 5s ease-in-out infinite;
        }

        .social-item {
          opacity: 0;
          animation: entryBounce 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: calc(var(--i) * 0.09s + 0.2s);
          position: relative;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          border: 2px solid rgba(255,255,255,0.35);
          overflow: visible;
          text-decoration: none;
        }

        .social-btn:hover {
          animation: wobble 0.5s ease;
          box-shadow: 0 6px 22px var(--glow), 0 2px 8px rgba(0,0,0,0.15);
        }

        /* Halo ring */
        .halo {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.5px solid;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          animation: none;
        }

        .social-item:hover .halo {
          opacity: 0.5;
          animation: pulse-soft 1.8s ease-in-out infinite;
        }

        /* Burst bubbles on hover */
        .burst-wrap {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          overflow: visible;
        }

        .burst-dot {
          position: absolute;
          border-radius: 50%;
          width: 5px;
          height: 5px;
          opacity: 0;
          pointer-events: none;
        }

        .social-item:hover .burst-dot {
          animation: burstBubble 0.7s ease-out forwards;
        }

        .burst-dot:nth-child(1) { top: -2px; left: 50%; animation-delay: 0s; }
        .burst-dot:nth-child(2) { top: 10%; right: -2px; animation-delay: 0.05s; }
        .burst-dot:nth-child(3) { bottom: 10%; right: -2px; animation-delay: 0.10s; }
        .burst-dot:nth-child(4) { bottom: -2px; left: 50%; animation-delay: 0.07s; }
        .burst-dot:nth-child(5) { bottom: 10%; left: -2px; animation-delay: 0.12s; }
        .burst-dot:nth-child(6) { top: 10%; left: -2px; animation-delay: 0.03s; }

        /* Tooltip */
        .tipbox {
          position: absolute;
          right: calc(100% + 14px);
          top: 50%;
          transform: translateY(-50%) translateX(10px) scale(0.85);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #fff;
          background: rgba(20, 20, 30, 0.88);
          padding: 6px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 20;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .tipbox::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 9px;
          height: 9px;
          background: rgba(20, 20, 30, 0.88);
          border-top: 1px solid rgba(255,255,255,0.1);
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .social-item:hover .tipbox {
          opacity: 1;
          transform: translateY(-50%) translateX(0) scale(1);
        }

        /* Glass panel behind all icons */
        .sidebar-glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 32px;
          border: 1.5px solid rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px rgba(120,120,180,0.13), 0 2px 8px rgba(0,0,0,0.07);
          padding: 10px 6px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient float dots inside glass */
        .ambient-dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: floatBubble var(--dur) ease-in-out var(--del) infinite;
          opacity: 0;
        }
      `}</style>

      <div
        className="hidden lg:block fixed right-0 top-1/2 z-50 sidebar-wrap"
        style={{ transform: "translateY(-50%)" }}
      >
        <div className="sidebar-glass">
          {/* Ambient bubbles inside the glass panel */}
          {ambientBubbles.map((b) => (
            <div
              key={b.id}
              className="ambient-dot"
              style={{
                width: b.size,
                height: b.size,
                background: b.color,
                "--dur": `${b.duration}s`,
                "--del": `${b.delay}s`,
                left: b.left,
                bottom: b.bottom,
              }}
            />
          ))}

          {socialData.map((social, i) => {
            const Icon = social.icon;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                className="social-item"
                style={{ "--i": i, "--glow": social.glow }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Halo ring */}
                <div
                  className="halo"
                  style={{ borderColor: social.glow }}
                />

                {/* Main button */}
                <a
                  href={safeHref(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  style={{
                    background: social.bg,
                    "--glow": social.glow,
                    boxShadow: isHovered
                      ? `0 5px 20px ${social.glow}`
                      : `0 3px 10px rgba(0,0,0,0.12)`,
                  }}
                >
                  {/* Burst bubbles */}
                  <div className="burst-wrap">
                    {[...Array(6)].map((_, j) => (
                      <div
                        key={j}
                        className="burst-dot"
                        style={{ background: social.glow }}
                      />
                    ))}
                  </div>

                  <Icon
                    size={16}
                    style={{
                      color: "#fff",
                      strokeWidth: 2.5,
                      position: "relative",
                      zIndex: 2,
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
                    }}
                  />
                </a>

                {/* Tooltip */}
                <div className="tipbox">{social.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;
