const getValidDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getHolidayBookingEffectiveDate = (booking = {}) =>
  getValidDate(booking?.checkIn) ||
  getValidDate(booking?.requestedAt) ||
  getValidDate(booking?.createdAt);

const mapHolidayBookingsToSlots = (holidayBookings = [], holidaySlots = []) => {
  const bookings = Array.isArray(holidayBookings) ? holidayBookings : [];
  const slots = Array.isArray(holidaySlots) ? holidaySlots : [];
  const validSlotNumbers = new Set(slots.map((slot) => slot.slotNumber));
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
      effectiveDate: getHolidayBookingEffectiveDate(booking),
    }))
    .filter((entry) => !assignments[entry.index] && entry.effectiveDate)
    .sort((left, right) => left.effectiveDate.getTime() - right.effectiveDate.getTime())
    .forEach((entry) => {
      const matchingSlot = slots.find(
        (slot) =>
          !usedSlotNumbers.has(slot.slotNumber) &&
          entry.effectiveDate >= slot.validFrom &&
          entry.effectiveDate < slot.validTo,
      );

      if (matchingSlot) {
        claimSlot(matchingSlot.slotNumber, entry.index);
      }
    });

  const remainingSlotNumbers = slots
    .map((slot) => slot.slotNumber)
    .filter((slotNumber) => !usedSlotNumbers.has(slotNumber));

  bookings.forEach((_, index) => {
    if (assignments[index] || remainingSlotNumbers.length === 0) {
      return;
    }

    claimSlot(remainingSlotNumbers.shift(), index);
  });

  return bookings.map((booking, index) => ({
    booking,
    slotNumber: assignments[index] || null,
  }));
};

const membershipStartDate = new Date("2026-06-02T00:00:00.000Z");

const holidaySlots = Array.from({ length: 5 }, (_, index) => {
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

const existingHolidayBookings = [
  {
    checkIn: "2026-06-03T11:57:00",
    checkOut: "2026-06-08T11:57:00",
    slotNumber: 1
  },
  {
    checkIn: "2027-06-03T11:57:00",
    checkOut: "2027-06-08T11:57:00",
    slotNumber: 2
  }
];

const mapped = mapHolidayBookingsToSlots(existingHolidayBookings, holidaySlots);
console.log("Mapped slots:", mapped);
const slotNumber = 3;
const hasError = mapped.some((entry) => entry.slotNumber === slotNumber);
console.log("Already requested error?", hasError);
