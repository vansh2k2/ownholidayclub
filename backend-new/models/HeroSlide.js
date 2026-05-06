const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
      default: "Welcome to Luxury",
    },
    title1: {
      type: String,
      required: true,
      default: "Stay & Celebration",
    },
    title2: {
      type: String,
      required: true,
      default: "on Earth",
    },
    description: {
      type: String,
      required: true,
      default: "Experience the pinnacle of luxury with our exclusive members-only holiday packages.",
    },
    image: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "",
    },
    button1Text: {
      type: String,
      default: "Book Holiday",
    },
    button1Link: {
      type: String,
      default: "/",
    },
    button2Text: {
      type: String,
      default: "Memberships",
    },
    button2Link: {
      type: String,
      default: "/membership",
    },
    button3Text: {
      type: String,
      default: "Plan Event",
    },
    button3Link: {
      type: String,
      default: "/services",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
