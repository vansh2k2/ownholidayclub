export const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

export const defaultProfile = {
  membershipId: "",
  name: "",
  email: "",
  mobile: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  anniversary: "",
  occupation: "",
  residenceAddress: {
    addressLine: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    pin: "",
  },
  officeAddress: {
    addressLine: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    pin: "",
  },
  spouse: {
    name: "",
    dob: "",
  },
  familyMembers: [],
  documents: {
    profileImage: {},
    idProof: {},
    addressProof: {},
  },
  membership: {
    tierId: "",
    name: "",
    status: "Inactive",
    duration: "",
    baseDurationYears: 0,
    bonusYears: 0,
    totalDurationYears: 0,
    validUntil: "",
    nightsPerYear: "",
    nightsRemaining: 0,
    purchasedAt: "",
    purchasePrice: "",
    cardCode: "",
  },
  holidayBookings: [],
  payments: [],
};

export const normaliseProfile = (user = {}) => ({
  ...defaultProfile,
  ...user,
  residenceAddress: {
    ...defaultProfile.residenceAddress,
    ...(user.residenceAddress || {}),
  },
  officeAddress: {
    ...defaultProfile.officeAddress,
    ...(user.officeAddress || {}),
  },
  spouse: {
    ...defaultProfile.spouse,
    ...(user.spouse || {}),
  },
  documents: {
    ...defaultProfile.documents,
    ...(user.documents || {}),
  },
  membership: {
    ...defaultProfile.membership,
    ...(user.membership || {}),
  },
  holidayBookings: Array.isArray(user.holidayBookings)
    ? user.holidayBookings
    : [],
  familyMembers: Array.isArray(user.familyMembers) ? user.familyMembers : [],
  payments: Array.isArray(user.payments) ? user.payments : [],
});

export const formatPaymentAmount = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format((Number(amount || 0) || 0) / 100);

export const formatPaymentDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const getYearsFromText = (value) =>
  Number(String(value || "").match(/(\d+)/)?.[1] || 0);

export const getPaymentDurationLabel = (payment = {}) => {
  const years = getYearsFromText(payment.period);
  const tierId = String(payment.membershipTierId || "").trim().toLowerCase();
  const tierName = String(payment.membershipTierName || "").trim().toLowerCase();
  const isGoldenTier = tierId === "ohc-golden" || tierName.includes("golden");

  if (years > 0) {
    if (isGoldenTier && years === 20) {
      return "23 Years";
    }

    return `${years} Years`;
  }

  return payment.period || "Membership";
};

export const formatHolidayDateTime = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatHolidayDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getHolidayQuota = (membership = {}) =>
  Number(membership?.totalDurationYears || 0) ||
  getYearsFromText(membership?.duration);

const getValidDate = (value) => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

export const getMembershipStartDate = (membership = {}, payments = []) => {
  const matchingPayment = (Array.isArray(payments) ? payments : []).find((payment) => {
    const paymentTierId = String(payment?.membershipTierId || "").trim().toLowerCase();
    const paymentTierName = String(payment?.membershipTierName || "")
      .trim()
      .toLowerCase();
    const membershipTierId = String(membership?.tierId || "").trim().toLowerCase();
    const membershipName = String(membership?.name || "").trim().toLowerCase();

    return (membershipTierId && paymentTierId === membershipTierId) ||
      (membershipName && paymentTierName === membershipName);
  });

  return (
    getValidDate(membership?.purchasedAt) ||
    getValidDate(matchingPayment?.paidAt) ||
    getValidDate((Array.isArray(payments) ? payments : [])[0]?.paidAt)
  );
};

const parseStayAllowance = (value) => {
  const match = String(value || "").match(
    /(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i,
  );

  if (!match) {
    return {
      nights: 6,
      days: 7,
      label: "6 Nights / 7 Days",
    };
  }

  return {
    nights: Number(match[1]) || 6,
    days: Number(match[2]) || 7,
    label: `${Number(match[1]) || 6} Nights / ${Number(match[2]) || 7} Days`,
  };
};

export const getStayAllowance = (membership = {}, slotNumber = 1) => {
  if (Array.isArray(membership.features) && membership.features.length >= 1) {
    const parseFeature = (f) => {
      const match = String(f).match(/(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?(?:\s*for\s*(\d+)\s*Years?)?/i);
      if (!match) return null;
      return {
        nights: Number(match[1]),
        days: Number(match[2]),
        years: Number(match[3]) || 1,
        label: `${Number(match[1])} Nights / ${Number(match[2])} Days`
      };
    };

    const p1 = parseFeature(membership.features[0]);
    const p2 = parseFeature(membership.features[1]);

    if (p1) {
      if (slotNumber <= p1.years) return p1;
      if (p2 && slotNumber <= (p1.years + p2.years)) return p2;
      return p2 || p1;
    }
  }

  const tierId = String(membership?.tierId || "").trim().toLowerCase();
  const tierName = String(membership?.name || "").trim().toLowerCase();

  if (tierId === "ohc-privilege" || tierName.includes("privilege")) {
    if (slotNumber <= 3) {
      return {
        nights: 3,
        days: 4,
        label: "3 Nights / 4 Days",
      };
    }

    return {
      nights: 4,
      days: 5,
      label: "4 Nights / 5 Days",
    };
  }

  return parseStayAllowance(membership?.nightsPerYear);
};

const getBookingEffectiveDate = (booking = {}) =>
  getValidDate(booking?.checkIn) ||
  getValidDate(booking?.requestedAt) ||
  getValidDate(booking?.createdAt);

export const mapHolidayBookingsToSlotNumbers = (holidayBookings = [], slots = []) => {
  const bookings = Array.isArray(holidayBookings) ? holidayBookings : [];
  const slotEntries = Array.isArray(slots) ? slots : [];
  const validSlotNumbers = new Set(slotEntries.map((slot) => slot.slotNumber));
  const assignments = new Array(bookings.length).fill(null);
  const usedSlotNumbers = new Set();

  const claimSlot = (slotNumber, bookingIndex) => {
    if (
      !Number.isInteger(slotNumber) ||
      slotNumber <= 0 ||
      !validSlotNumbers.has(slotNumber) ||
      usedSlotNumbers.has(slotNumber)
    ) {
      return false;
    }

    assignments[bookingIndex] = slotNumber;
    usedSlotNumbers.add(slotNumber);
    return true;
  };

  bookings.forEach((booking, index) => {
    claimSlot(Number(booking?.slotNumber || 0), index);
  });

  bookings
    .map((booking, index) => ({
      booking,
      index,
      effectiveDate: getBookingEffectiveDate(booking),
    }))
    .filter((entry) => !assignments[entry.index] && entry.effectiveDate)
    .sort((left, right) => left.effectiveDate.getTime() - right.effectiveDate.getTime())
    .forEach((entry) => {
      const matchingSlot = slotEntries.find(
        (slot) =>
          !usedSlotNumbers.has(slot.slotNumber) &&
          entry.effectiveDate >= slot.validFrom &&
          entry.effectiveDate < slot.validTo,
      );

      if (matchingSlot) {
        claimSlot(matchingSlot.slotNumber, entry.index);
      }
    });

  const remainingSlotNumbers = slotEntries
    .map((slot) => slot.slotNumber)
    .filter((slotNumber) => !usedSlotNumbers.has(slotNumber));

  bookings.forEach((_, index) => {
    if (assignments[index] || remainingSlotNumbers.length === 0) {
      return;
    }

    claimSlot(remainingSlotNumbers.shift(), index);
  });

  return bookings.map((booking, index) => ({
    ...booking,
    slotNumber: assignments[index] || null,
  }));
};

export const getHolidayAccessSlots = (
  { membership = {}, payments = [] } = {},
  holidayBookings = [],
) => {
  const totalHolidayQuota = getHolidayQuota(membership);
  const membershipStartDate = getMembershipStartDate(membership, payments);

  if (totalHolidayQuota <= 0 || !membershipStartDate) {
    return [];
  }

  const slots = Array.from({ length: totalHolidayQuota }, (_, index) => {
    const validFrom = new Date(membershipStartDate);
    validFrom.setFullYear(validFrom.getFullYear() + index);

    const validTo = new Date(membershipStartDate);
    validTo.setFullYear(validTo.getFullYear() + index + 1);

    return {
      slotNumber: index + 1,
      validFrom,
      validTo,
    };
  });

  const mappedBookings = mapHolidayBookingsToSlotNumbers(holidayBookings, slots);
  const bookingsBySlotNumber = new Map();

  mappedBookings.forEach((booking) => {
    if (booking?.slotNumber && !bookingsBySlotNumber.has(booking.slotNumber)) {
      bookingsBySlotNumber.set(booking.slotNumber, booking);
    }
  });

  return slots.map((slot) => ({
    ...slot,
    booking: bookingsBySlotNumber.get(slot.slotNumber) || null,
  }));
};

export const formatDateTimeLocalValue = (value) => {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (number) => String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
