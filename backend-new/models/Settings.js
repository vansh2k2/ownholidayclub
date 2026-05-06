const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    logo: { type: String, default: "/logo.png" },
    footerDescription: { 
      type: String, 
      default: "Since 2012, crafting unparalleled luxury experiences — from exclusive memberships to bespoke global retreats." 
    },
    companyLinksTitle: { type: String, default: "Company Links" },
    experienceLinksTitle: { type: String, default: "Experience Links" },
    companyLinks: [
      {
        label: { type: String },
        path: { type: String }
      }
    ],
    experienceLinks: [
      {
        label: { type: String },
        path: { type: String }
      }
    ],
    officeAddress: { 
      type: String, 
      default: "Rigel Hospitality Services Pvt. Ltd. 27 C, Block A, Kailash Colony, Extension, New Delhi – 110048" 
    },
    contactPhone: { type: String, default: "+91-9871984074" },
    contactEmail: { type: String, default: "membership@ownholidayclub.com" },
    workingHours: { type: String, default: "Mon – Sat: 9:30 AM – 6:30 PM" },
    globalPresence: { type: String, default: "New Delhi · Dubai · London" },
    mapIframe: { type: String, default: "" },
    footerBgImage: { type: String, default: "/footerimage.jpg" },
    // Top Bar Settings
    topBarEmail: { type: String, default: "info@ownholidayclub.com" },
    topBarPhone: { type: String, default: "+91 98765 43210" },
    topBarMarquee: { 
      type: [String], 
      default: [
        "Explore India's Finest Destinations",
        "Exclusive Memberships for Premium Travellers",
        "50+ Destinations Across India & Abroad",
        "Luxury Stays at Members-Only Prices",
        "List Your Property with Us"
      ] 
    },
    // Footer Contact
    footerContact: {
      type: [
        {
          label: { type: String },
          content: { type: String }
        }
      ],
      default: [
        { label: "New Delhi Office", content: "Rigel Hospitality Services Pvt. Ltd. 27 C, Block A, Kailash Colony, Extension, New Delhi – 110048" },
        { label: "24/7 Concierge", content: "+91-9871984074" }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
