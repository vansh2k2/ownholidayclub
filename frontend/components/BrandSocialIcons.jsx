import { useId } from "react";

export const FacebookBrandIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#1877F2" />
    <path
      fill="#FFFFFF"
      d="M36.7 53V34.8h6.1l1-7.1h-7.1V23c0-2 .6-3.4 3.5-3.4h3.8v-6.3c-.7-.1-2.9-.3-5.4-.3-5.4 0-9.1 3.3-9.1 9.4v5.3h-6.2v7.1h6.2V53h7.2Z"
    />
  </svg>
);

export const InstagramBrandIcon = ({ className = "" }) => {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="14%" x2="86%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="35%" stopColor="#DD2A7B" />
          <stop offset="68%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill={`url(#${gradientId})`} />
      <rect
        x="18"
        y="18"
        width="28"
        height="28"
        rx="9"
        stroke="#FFFFFF"
        strokeWidth="4"
      />
      <circle cx="32" cy="32" r="7" stroke="#FFFFFF" strokeWidth="4" />
      <circle cx="45" cy="19" r="3.2" fill="#FFFFFF" />
    </svg>
  );
};

export const XBrandIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#000000" />
    <path
      fill="#FFFFFF"
      d="M17 16h10.5l8.1 10.6L45 16h3.9L37.4 29.3 49 48H38.5l-8.7-11.4L19.9 48H16l12.3-14.5L17 16Zm12.3 4.5h-3.6l16.1 23h3.6l-16.1-23Z"
    />
  </svg>
);

export const LinkedInBrandIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect x="4" y="4" width="56" height="56" rx="12" fill="#0A66C2" />
    <circle cx="20" cy="22" r="4" fill="#FFFFFF" />
    <path
      fill="#FFFFFF"
      d="M16 28h8v20h-8V28Zm12 0h7.6v2.7h.1c1.1-2 3.7-3.7 7.6-3.7 8.1 0 9.7 5.1 9.7 11.8V48h-8V39.8c0-3.9-.1-8.8-5.4-8.8-5.4 0-6.2 4.2-6.2 8.6V48h-8V28Z"
    />
  </svg>
);

export const YouTubeBrandIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect x="6" y="14" width="52" height="36" rx="12" fill="#FF0033" />
    <path fill="#FFFFFF" d="M28 24.5 42 32l-14 7.5v-15Z" />
  </svg>
);

export const SOCIAL_LINKS = [
  {
    icon: FacebookBrandIcon,
    label: "Facebook",
    link: "https://www.facebook.com/ownholidayclub/",
  },
  {
    icon: InstagramBrandIcon,
    label: "Instagram",
    link: "https://www.instagram.com/ownholidayclub/",
  },
  {
    icon: XBrandIcon,
    label: "X",
    link: "https://x.com/ownholidayclub",
  },
  {
    icon: LinkedInBrandIcon,
    label: "LinkedIn",
    link: "https://in.linkedin.com/company/own-holiday-club",
  },
  {
    icon: YouTubeBrandIcon,
    label: "YouTube",
    link: "https://www.youtube.com/@OwnHolidayclub",
  },
];
