import { Link } from "react-router-dom";
import { Ticket, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Ticket className="w-4 h-4 text-black" />
              </div>
              <span className="font-syne font-bold text-xl tracking-tight">
                Ticket<span className="font-light">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm font-dm leading-relaxed">
              Your pass to unforgettable Nigerian events. Discover, book, and
              experience the best of live entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "Browse Events", to: "/events" },
                { label: "My Tickets", to: "/my-tickets" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-dm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm font-dm text-gray-400">
                <Mail className="w-4 h-4 shrink-0" />
                support@tickethub.ng
              </li>
              <li className="flex items-center gap-2 text-sm font-dm text-gray-400">
                <Phone className="w-4 h-4 shrink-0" />
                +234 800 123 4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-dm text-gray-500">
            &copy; TicketHub. All rights reserved.
          </p>
          <p className="text-xs font-dm text-gray-600">
            Built for Nigerian events
          </p>
        </div>
      </div>
    </footer>
  );
}
