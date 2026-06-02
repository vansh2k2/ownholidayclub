fetch("http://localhost:8081/api/profile/6a1e7465bde706ba8dc9c293/holiday-bookings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    slotNumber: 3,
    place: "kalpa",
    checkIn: "2028-06-03T11:57",
    checkOut: "2028-06-08T11:57",
    adults: 2,
    kids: 2
  })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
