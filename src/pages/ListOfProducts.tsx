import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import type { Listing } from "../data/listings";

function ListOfProducts() {
  const [listingsList, setListingsList] = useState<Listing[]>([])
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch('http://localhost:3000/listings');
      if (!response.ok) {
        throw new Error("Nie udało się pobrać ogłoszeń");
      }
      const data = await response.json();
      setListingsList(data)
    }
    fetchListings()
  }, [])

  const categoryList = [...new Set(listingsList.map(listing => listing.category))];
  const cityList = [...new Set(listingsList.map(listing => listing.city))];
  const pricesList = [100, 300, 1000]

  const filteredProducts = listingsList.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = selectedCategory === "" || listing.category === selectedCategory
    const matchesCity = selectedCity === "" || listing.city === selectedCity
    const matchesPrices = selectedPriceRange === "" || listing.price <= Number(selectedPriceRange)
    return matchesCategory && matchesSearch && matchesCity && matchesPrices
  })

  const selectClass = "border border-gray-300 rounded-md text-sm px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ogłoszenia</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Szukaj ogłoszenia..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="border border-gray-300 rounded-md text-sm px-3 py-2 flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={selectClass}>
          <option value="">Wszystkie kategorie</option>
          {categoryList.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={selectClass}>
          <option value="">Wszystkie miasta</option>
          {cityList.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} className={selectClass}>
          <option value="">Wszystkie ceny</option>
          {pricesList.map((price) => (
            <option key={price} value={price}>Poniżej {price} zł</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} ogłoszeń</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Brak ogłoszeń spełniających kryteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListOfProducts
