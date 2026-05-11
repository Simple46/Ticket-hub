import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  Ticket,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import QRCodeDisplay from "../components/QRCodeDisplay.jsx";
import { formatDate, formatNaira, formatTime } from "../utils/storage";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  // If someone lands here without booking state, send them away
  useEffect(() => {
    if (!booking) navigate("/events", { replace: true });
  }, [booking, navigate]);

  if (!booking) return null;

  const details = [
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "Date",
      value: formatDate(booking.eventDate),
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Time",
      value: formatTime(booking.eventTime),
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "Location",
      value: booking.eventLocation,
    },
    {
      icon: <Ticket className="w-4 h-4" />,
      label: "Ticket Type",
      value: `${booking.ticketType === "vip" ? "VIP" : "Regular"} × ${booking.quantity}`,
    },
    {
      icon: <User className="w-4 h-4" />,
      label: "Attendee",
      value: booking.attendeeName,
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: booking.email,
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Phone",
      value: booking.phone,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* ── Success header ── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-black mb-2">
              Booking Confirmed!
            </h1>
            <p className="font-dm text-gray-500 text-base">
              Your tickets for{" "}
              <span className="font-semibold text-black">
                {booking.eventName}
              </span>{" "}
              are all set.
            </p>
          </div>

          {/* ── Main card ── */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6">
            {/* Reference banner */}
            <div className="bg-black px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-dm text-xs text-gray-400 mb-0.5">
                  Booking Reference
                </p>
                <p className="font-syne font-bold text-white text-lg tracking-widest">
                  {booking.reference}
                </p>
              </div>
              <span
                className={`text-xs font-dm font-semibold px-3 py-1.5 rounded-full ${
                  booking.ticketType === "vip"
                    ? "bg-amber-600 text-white"
                    : "bg-green-600 text-gray-300"
                }`}
              >
                {booking.ticketType === "vip" ? "VIP" : "Regular"}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left — booking details */}
                <div>
                  <h2 className="font-syne font-bold text-xl text-black mb-5">
                    {booking.eventName}
                  </h2>

                  <div className="flex flex-col gap-4">
                    {details.map((d) => (
                      <div key={d.label} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gray-500">
                          {d.icon}
                        </div>
                        <div>
                          <p className="font-dm text-xs text-gray-400">
                            {d.label}
                          </p>
                          <p className="font-dm text-sm font-medium text-black">
                            {d.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total paid */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="font-dm text-xs text-gray-400 mb-1">
                      Total Paid
                    </p>
                    <p className="font-syne font-extrabold text-3xl text-black">
                      {formatNaira(booking.totalPaid)}
                    </p>
                  </div>
                </div>

                {/* Right — QR code */}
                <div className="flex flex-col items-center justify-start pt-2">
                  <QRCodeDisplay booking={booking} size={180} />

                  {/* Perforated divider */}
                  <div className="w-full flex items-center gap-2 my-5">
                    <div className="w-4 h-4 rounded-full bg-gray-100 -ml-10 shrink-0" />
                    <div className="flex-1 border-t-2 border-dashed border-gray-200" />
                    <div className="w-4 h-4 rounded-full bg-gray-100 -mr-10 shrink-0" />
                  </div>

                  {/* Ticket stub info */}
                  <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-center">
                    <p className="font-syne font-bold text-sm text-black">
                      {booking.quantity} ×{" "}
                      {booking.ticketType === "vip" ? "VIP" : "Regular"} Ticket
                      {booking.quantity > 1 ? "s" : ""}
                    </p>
                    <p className="font-dm text-xs text-gray-400 mt-0.5">
                      Scan at the venue entrance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Info notice ── */}
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-3 mb-8">
            <span className="text-lg shrink-0">
              <Lightbulb />
            </span>
            <p className="font-dm text-sm text-gray-500 leading-relaxed">
              Save a screenshot of this page or visit{" "}
              <span className="font-semibold text-black">My Tickets</span>{" "}
              anytime to retrieve your QR code. Your reference number is{" "}
              <span className="font-mono font-semibold text-black">
                {booking.reference}
              </span>
              .
            </p>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/my-tickets"
              className="flex items-center justify-center gap-2 bg-black text-white font-dm font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              View My Tickets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/events"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-black font-dm font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
