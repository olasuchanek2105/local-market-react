import { useParams, useNavigate  } from "react-router"
import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"


function EditListing() {
  const [listing, setListing] = useState({ title: "", price: 0, city: "", category: "" })
  const [success, setSuccess] = useState(false)
  const [tokenNotValid, setTokenNotValid] = useState(false)
  const {token} = useAuth()
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(`http://localhost:3000/listings/${params.id}`)
      if (!response.ok) {
        return
      }

      const data = await response.json()
      if (data.message) {
      } 
      else {
        setListing(data)
      }
    }
    fetchListing()
  }, [params.id])


  async function handleSubmit(event: any) {
    event.preventDefault()

    try{
    
      const response = await fetch(`http://localhost:3000/listings/${params.id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json"},
        body: JSON.stringify(listing)
      })
      if (!response.ok) {
        throw new Error("Token nieaktywny")
      }   
      setListing({ title: "", price: 0, city: "", category: "" })
      setSuccess(true)
      setTokenNotValid(false)

      navigate(`/listings/${params.id}`)

    }
    catch(e){
      setSuccess(false)
      setTokenNotValid(true)
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edytuj ogłoszenie</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className={labelClass}>Tytuł</label>
            <input
              type="text"
              placeholder="np. iPhone 13 128GB"
              value={listing.title}
              onChange={(e) => setListing({ ...listing, title: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Cena (zł)</label>
            <input
              type="number"
              placeholder="np. 1500"
              value={listing.price || ""}
              onChange={(e) => setListing({ ...listing, price: Number(e.target.value) })}
              className={inputClass}
              required
              min={0}
            />
          </div>

          <div>
            <label className={labelClass}>Miasto</label>
            <input
              type="text"
              placeholder="np. Kraków"
              value={listing.city}
              onChange={(e) => setListing({ ...listing, city: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Kategoria</label>
            <select
              value={listing.category}
              onChange={(e) => setListing({ ...listing, category: e.target.value })}
              className={inputClass}
              required
            >
              <option value="">Wybierz kategorię</option>
              <option value="Elektronika">Elektronika</option>
              <option value="Meble">Meble</option>
              <option value="Ubrania">Ubrania</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
          >
            Edytuj ogłoszenie
          </button>
        </form>

        {success && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-4 py-3">
            Ogłoszenie zostało dodane!
          </div>
        )}
        {tokenNotValid && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
              Nie można dodać ogłoszenia, proszę się zalogować
          </div>
        )}
      </div>
    </div>
  )
}

export default EditListing
