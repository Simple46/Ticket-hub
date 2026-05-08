import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate, formatNaira, formatTime } from "../utils/storage";

export default function EventCard({ event }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-syne font-semibold px-3 py-1 rounded-full">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-syne font-bold text-lg text-black leading-snug mb-3">
          {event.name}
        </h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-dm">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>
              {formatDate(event.date)} · {formatTime(event.time)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-dm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-dm">From</p>
            <p className="font-syne font-bold text-black text-base">
              {formatNaira(event.regularPrice)}
            </p>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-1.5 bg-black text-white text-sm font-dm font-medium px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Get Tickets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
