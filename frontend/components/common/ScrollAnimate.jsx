"use client";

import React, { useEffect, useRef, useState } from "react";


const VARIANTS = {
  cinematic: {
    transition:
      "transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) transform-gpu",
    hidden: {
      "fade-up": "opacity-0 translate-y-16 blur-[4px]",
      "fade-in": "opacity-0 scale-95 blur-[2px]",
      "reveal-left": "opacity-0 -translate-x-16 blur-[4px]",
      "reveal-right": "opacity-0 translate-x-16 blur-[4px]",
      "zoom-out": "opacity-0 scale-110 blur-[4px]",
      default: "opacity-0 translate-y-10",
    },
    visible: "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  },
  homeHero: {
    transition: "transition-all duration-1000 ease-out transform-gpu",
    hidden: {
      "fade-up": "opacity-0 translate-y-10 scale-95",
      "fade-in": "opacity-0 scale-90",
      "zoom-in": "opacity-0 scale-75",
      default: "opacity-0",
    },
    visible: "opacity-100 translate-y-0 scale-100",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  },
  homeStandard: {
    transition: "transition-all duration-1000 ease-out transform-gpu",
    hidden: {
      "fade-up": "opacity-0 translate-y-10",
      "zoom-in": "opacity-0 scale-90",
      "fade-in": "opacity-0",
      default: "opacity-0 translate-y-10",
    },
    visible: "opacity-100 translate-y-0 scale-100",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  },
  homeGallery: {
    transition:
      "transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) transform-gpu",
    hidden: {
      "fade-up": "opacity-0 translate-y-16 scale-95",
      "zoom-in": "opacity-0 scale-90 blur-sm",
      "fade-in": "opacity-0",
      default: "opacity-0 translate-y-10",
    },
    visible: "opacity-100 translate-y-0 scale-100 blur-0",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  },
  homeDestination: {
    transition:
      "transition-all duration-[1000ms] cubic-bezier(0.25, 1, 0.5, 1)",
    hidden: {
      "fade-up": "opacity-0 translate-y-12",
      "zoom-in": "opacity-0 scale-95 translate-y-4",
      "fade-in": "opacity-0",
      default: "opacity-0 translate-y-10",
    },
    visible: "opacity-100 translate-y-0 scale-100",
    threshold: 0.1,
    rootMargin: "0px",
    triggerOnce: true,
  },
  homeMembership: {
    transition:
      "transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)",
    hidden: {
      "fade-up": "opacity-0 translate-y-20",
      "reveal-left": "opacity-0 -translate-x-full",
      "zoom-out": "opacity-0 scale-110",
      default: "opacity-0",
    },
    visible: "opacity-100 translate-y-0 translate-x-0 scale-100",
    threshold: 0.1,
    rootMargin: "0px",
    triggerOnce: true,
  },
};

export default function ScrollAnimate({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  variant = "cinematic",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  const config = VARIANTS[variant] ?? VARIANTS.cinematic;
  const { threshold, rootMargin, triggerOnce, transition, hidden, visible } =
    config;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce) {
          if (entry.isIntersecting) setIsVisible(true);
        } else {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold, rootMargin },
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, triggerOnce]);

  const getAnimationClass = () => {
    if (!isVisible) {
      return hidden[animation] ?? hidden.default ?? "opacity-0";
    }
    return visible;
  };

  return (
    <div
      ref={domRef}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} ${transition} ${getAnimationClass()}`}
    >
      {children}
    </div>
  );
}
