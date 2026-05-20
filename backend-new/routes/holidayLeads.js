const express = require("express");

const HolidayLead = require("../models/HolidayLead");
const asyncHandler = require("../utils/asyncHandler");
const { normaliseEmail, normaliseMobile } = require("../utils/security");
const { sendLeadNotificationEmail } = require("../utils/email");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normaliseName = (value) => String(value || "").trim().replace(/\s+/g, " ");
const normaliseText = (value) => String(value || "").trim().replace(/\s+/g, " ");

const normaliseSource = (value) =>
  String(value || "home-hero")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "home-hero";

const normaliseContextType = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const name = normaliseName(req.body?.name);
    const email = normaliseEmail(req.body?.email);
    const phone = normaliseMobile(req.body?.phone);
    const contextType = normaliseContextType(req.body?.contextType);
    const contextName = normaliseText(req.body?.contextName);
    const message = normaliseText(req.body?.message);
    const source = normaliseSource(req.body?.source);
    const checkInInput = normaliseText(req.body?.checkIn);
    const checkOutInput = normaliseText(req.body?.checkOut);
    const adults =
      req.body?.adults === undefined || req.body?.adults === null || req.body?.adults === ""
        ? 0
        : Number(req.body?.adults);
    const kids =
      req.body?.kids === undefined || req.body?.kids === null || req.body?.kids === ""
        ? 0
        : Number(req.body?.kids);
    let checkIn = null;
    let checkOut = null;

    if (name.length < 2) {
      return res.status(400).json({
        message: "A valid name is required.",
      });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        message: "A valid email address is required.",
      });
    }

    if (phone.length !== 10) {
      return res.status(400).json({
        message: "A valid 10-digit phone number is required.",
      });
    }

    if (checkInInput || checkOutInput) {
      if (!checkInInput || !checkOutInput) {
        return res.status(400).json({
          message: "Both check-in and check-out are required.",
        });
      }

      checkIn = new Date(checkInInput);
      checkOut = new Date(checkOutInput);

      if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
        return res.status(400).json({
          message: "Please provide valid check-in and check-out values.",
        });
      }

      if (checkOut <= checkIn) {
        return res.status(400).json({
          message: "Check-out must be later than check-in.",
        });
      }
    }

    if (!Number.isInteger(adults) || adults < 0) {
      return res.status(400).json({
        message: "Adults must be a valid number.",
      });
    }

    if (!Number.isInteger(kids) || kids < 0) {
      return res.status(400).json({
        message: "Kids must be a valid number.",
      });
    }

    const lead = await HolidayLead.create({
      name,
      email,
      phone,
      contextType,
      contextName,
      checkIn,
      checkOut,
      adults,
      kids,
      message,
      source,
      status: "new",
    });

    try {
      await sendLeadNotificationEmail({
        leadType: contextType === 'callback-request' ? "Callback Request" : "Holiday Lead",
        leadDetails: {
          "Name": name,
          "Email": email,
          "Phone": phone,
          "Source": source,
          "Context": contextName || contextType,
          "Adults": adults,
          "Kids": kids,
          "Check In": checkIn ? checkIn.toLocaleDateString() : "",
          "Check Out": checkOut ? checkOut.toLocaleDateString() : "",
        },
        message: message,
      });
    } catch (mailErr) {
      console.error("Failed to send lead email:", mailErr);
    }

    return res.status(201).json({
      message: "Lead submitted successfully.",
      lead,
    });
  }),
);

// @route   GET /api/holiday-leads
// @desc    Get all leads (admin)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const leads = await HolidayLead.find().sort({ createdAt: -1 });
    res.json({ success: true, leads });
  })
);

// @route   DELETE /api/holiday-leads/:id
// @desc    Delete a lead (admin)
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const lead = await HolidayLead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }
    res.json({ success: true, message: "Lead deleted successfully." });
  })
);

// @route   PUT /api/holiday-leads/:id
// @desc    Update lead status (admin)
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const lead = await HolidayLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }
    res.json({ success: true, lead });
  })
);

module.exports = router;
