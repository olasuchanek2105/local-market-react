import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Listing } from "../data/listings";
import { useAuth } from "../hooks/useAuth";

const categoryColors: Record<string, string> = {
  Elektronika: "bg-blue-100 text-blue-700",
  Meble: "bg-yellow-100 text-yellow-700",
  Ubrania: "bg-pink-100 text-pink-700",
}

export function ListingDetails() {
  const params = useParams();
  const [listing, setListing] = useState<Listing | null>(null)
  const [notFound, setNotFound] = useState(false)
  const {user, token} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(`http://localhost:3000/listings/${params.id}`)
      if (!response.ok) {
        setNotFound(true)
        return
      }
      const data = await response.json()
      if (data.message) {
        setNotFound(true)
      } else {
        setListing(data)
      }
    }
    fetchListing()
  }, [params.id])

  async function handleDelete(){

    try{
    
      const response = await fetch(`http://localhost:3000/listings/${params.id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
      })
      if (!response.ok) {
        throw new Error("Token nieaktywny")
      }   

      navigate('/listings')

    }
    catch(e){

    }
  
  }

  if (notFound) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Nie znaleziono ogłoszenia</p>
        <Link to="/listings" className="text-green-600 hover:underline text-sm mt-4 inline-block">
          Wróć do ogłoszeń
        </Link>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-400">
        Ładowanie...
      </div>
    )
  }

  const colorClass = categoryColors[listing.category] ?? "bg-gray-100 text-gray-700"

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/listings" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block">
        ← Wróć do ogłoszeń
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-400">
          Brak zdjęcia
        </div>
        <div className="p-6 flex flex-col gap-4">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${colorClass}`}>
            {listing.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
          <p className="text-3xl font-bold text-green-600">{listing.price} zł</p>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Miasto:</span>
              <span>{listing.city}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700">Kategoria:</span>
              <span>{listing.category}</span>
            </div>
          </div>
          {user && listing.userId === user.id && (
              <button onClick={handleDelete}>Usuń ogłoszenie</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
