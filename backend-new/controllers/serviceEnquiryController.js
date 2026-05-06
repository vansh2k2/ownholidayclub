const ServiceEnquiry = require("../models/ServiceEnquiry");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create new service enquiry
// @route   POST /api/service-enquiries
// @access  Public
exports.createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ServiceEnquiry.create(req.body);
  res.status(201).json({
    success: true,
    data: enquiry,
  });
});

// @desc    Get all service enquiries (Admin)
// @route   GET /api/service-enquiries/admin
// @access  Private/Admin
exports.getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await ServiceEnquiry.find().sort({ createdAt: -1 });
  
  // Calculate stats
  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    pending: enquiries.filter(e => e.status === 'pending').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    resolved: enquiries.filter(e => e.status === 'resolved').length
  };

  res.status(200).json({
    success: true,
    data: enquiries,
    stats
  });
});

// @desc    Update enquiry status
// @route   PUT /api/service-enquiries/:id/status
// @access  Private/Admin
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const enquiry = await ServiceEnquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  res.status(200).json({
    success: true,
    data: enquiry,
  });
});

// @desc    Delete enquiry
// @route   DELETE /api/service-enquiries/:id
// @access  Private/Admin
exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ServiceEnquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  res.status(200).json({
    success: true,
    message: "Enquiry removed",
  });
});
