import { type Listing } from "../data/listings"
import { Link } from "react-router"

type ListingCardProps = {
  listing: Listing
}

const categoryColors: Record<string, string> = {
  Elektronika: "bg-blue-100 text-blue-700",
  Meble: "bg-yellow-100 text-yellow-700",
  Ubrania: "bg-pink-100 text-pink-700",
}

function ListingCard({ listing }: ListingCardProps) {
  const colorClass = categoryColors[listing.category] ?? "bg-gray-100 text-gray-700"

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-400 text-sm">
        Brak zdjęcia
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${colorClass}`}>
          {listing.category}
        </span>
        <h2 className="text-gray-900 font-semibold text-base leading-tight">
          {listing.title}
        </h2>
        <p className="text-green-600 font-bold text-lg">{listing.price} zł</p>
        <p className="text-gray-500 text-sm">{listing.city}</p>
        <Link
          to={`/listings/${listing.id}`}
          className="mt-auto text-center border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-sm font-medium py-1.5 rounded-md transition-colors"
        >
          Zobacz szczegóły
        </Link>
      </div>
    </div>
  )
}

export default ListingCard
