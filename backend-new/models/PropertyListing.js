const mongoose = require("mongoose");

const listingPhotoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      default: "",
      trim: true,
    },
    size: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      default: "",
      trim: true,
    },
    publicId: {
      type: String,
      default: "",
      trim: true,
    },
    resourceType: {
      type: String,
      default: "",
      trim: true,
    },
    format: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

const propertyListingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    photos: {
      type: [listingPhotoSchema],
      default: [],
    },
    status: {
      type: String,
      default: "pending",
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("PropertyListing", propertyListingSchema);
