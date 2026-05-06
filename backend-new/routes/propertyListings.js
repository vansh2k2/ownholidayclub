const express = require("express");

const PropertyListing = require("../models/PropertyListing");
const asyncHandler = require("../utils/asyncHandler");
const { uploadDocumentToCloudinary } = require("../utils/cloudinary");

const router = express.Router();

const normalisePhoto = (photo = {}) => ({
  name: String(photo?.name || "").trim(),
  type: String(photo?.type || "").trim(),
  size: Number(photo?.size || 0),
  dataUrl: String(photo?.dataUrl || "").trim(),
});

const normaliseListingPayload = (body = {}) => ({
  firstName: String(body.firstName || "").trim(),
  lastName: String(body.lastName || "").trim(),
  email: String(body.email || "").trim().toLowerCase(),
  phone: String(body.phone || "").trim(),
  propertyName: String(body.propertyName || "").trim(),
  propertyType: String(body.propertyType || "").trim(),
  address: String(body.address || "").trim(),
  city: String(body.city || "").trim(),
  country: String(body.country || "").trim(),
  description: String(body.description || "").trim(),
  basePrice: Number(body.basePrice || 0),
  amenities: Array.isArray(body.amenities)
    ? body.amenities.map((item) => String(item || "").trim()).filter(Boolean)
    : [],
  photos: Array.isArray(body.photos) ? body.photos.map(normalisePhoto) : [],
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const payload = normaliseListingPayload(req.body);

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phone ||
      !payload.propertyName ||
      !payload.propertyType ||
      !payload.city ||
      !payload.country
    ) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, phone, propertyName, propertyType, city, and country are required.",
      });
    }

    const uploadedPhotos = await Promise.all(
      payload.photos.map((photo, index) =>
        uploadDocumentToCloudinary({
          file: photo,
          folder: "ownholidayclub/property-listings",
          documentType: `photo-${index + 1}`,
        }),
      ),
    );

    const listing = await PropertyListing.create({
      ...payload,
      photos: uploadedPhotos,
      status: "pending",
    });

    return res.status(201).json({
      message: "Property listing submitted successfully.",
      listing,
    });
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const listings = await PropertyListing.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Property listings fetched successfully.",
      listings,
    });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const listing = await PropertyListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Property listing not found.",
      });
    }

    return res.status(200).json({
      message: "Property listing fetched successfully.",
      listing,
    });
  }),
);

module.exports = router;
