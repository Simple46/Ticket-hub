const KEY = "tickethub_bookings";

export function getBookings() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(bookings) {
  localStorage.setItem(KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event("bookingsUpdated"));
}

export function saveBooking(booking) {
  const bookings = getBookings();
  bookings.unshift(booking);
  persist(bookings);
}

export function cancelBooking(reference) {
  persist(getBookings().filter((b) => b.reference !== reference));
}

export function getTotalTickets() {
  return getBookings().reduce((sum, b) => sum + (b.quantity || 0), 0);
}

export function generateReference() {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TKT-${Date.now()}-${rand}`;
}

export function formatNaira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}
