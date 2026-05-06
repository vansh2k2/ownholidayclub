const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const requireCmsAdmin = require("../middleware/requireCmsAdmin");

const router = express.Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET ALL MEMBERS
router.get(
  "/",
  requireCmsAdmin,
  asyncHandler(async (req, res) => {
    const members = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Members fetched successfully.",
      members,
    });
  })
);

// GET SINGLE MEMBER
router.get(
  "/:id",
  requireCmsAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid member ID." });
    }

    const member = await User.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    res.status(200).json({
      message: "Member fetched successfully.",
      member,
    });
  })
);

// DELETE MEMBER
router.get(
  "/delete/:id", // Supporting both GET/DELETE just in case, but standard is DELETE
  requireCmsAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid member ID." });
    }

    const deletedMember = await User.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found." });
    }

    res.status(200).json({
      message: "Member deleted successfully.",
    });
  })
);

router.delete(
  "/:id",
  requireCmsAdmin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid member ID." });
    }

    const deletedMember = await User.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found." });
    }

    res.status(200).json({
      message: "Member deleted successfully.",
    });
  })
);

module.exports = router;
