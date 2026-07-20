"use client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

let razorpayScriptPromise;

export const loadRazorpayScript = () => {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

export const createMembershipPaymentOrder = async ({ tierId, memberDetails }) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/membership/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tierId, memberDetails }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to create payment order.");
  }

  return data;
};

export const verifyMembershipPayment = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/payments/membership/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to verify payment.");
  }

  return data;
};
