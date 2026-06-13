import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
// import { listings } from "../data/listings";
import type { Listing } from "../data/listings";

function ListOfProducts(){

    const [listingsList, setListingsList] = useState<Listing[]>([])
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedPriceRange, setSelectedPriceRange] = useState("")



    useEffect(() => {

        async function fetchListings() {
          const response = await fetch('http://localhost:3000/listings');

          if (!response.ok){
            throw new Error("Nie udalo sie pobrac uzytkownikow");
          }

          const data = await response.json();

          setListingsList(data)

          
        }
        fetchListings()

    }, [])

    const categoryList = [...new Set(listingsList.map(listing => listing.category))];
    const cityList = [...new Set(listingsList.map(listing => listing.city))];
    const pricesList = [100, 300, 1000]

    const filteredProducts = listingsList.filter((listing) => 
    {
      const matchesSearch = listing.title
        .toLowerCase()
        .includes(searchText.toLowerCase())

      const matchesCategory =
        selectedCategory === "" || listing.category === selectedCategory

      const matchesCity =
        selectedCity === "" || listing.city === selectedCity

      const matchesPrices =
        selectedPriceRange === "" || listing.price <= Number(selectedPriceRange)

      return matchesCategory && matchesSearch && matchesCity && matchesPrices
    })
      


    return(
        <div>
            <input type="text" 
            placeholder="Szukaj Produktu..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}/>

            <select 
            value={selectedCategory} 
            onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="">Wszystkie kategorie</option>
            {categoryList.map((category)=>(
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            </select>

            <select 
              value={selectedCity} 
              onChange={(event)=> setSelectedCity(event.target.value)}>

              <option value="">Wszystkie miasta</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              </select>

              
            <select 
              value={selectedPriceRange} 
              onChange={(event)=> setSelectedPriceRange(event.target.value)}>

              <option value="">Wszystkie ceny</option>
              {pricesList.map((price) => (
                <option key={price} value={price}>
                  Poniżej {price}
                </option>
              ))}
              </select>
            
            {filteredProducts.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}

        </div>

    )
}

export default ListOfProducts