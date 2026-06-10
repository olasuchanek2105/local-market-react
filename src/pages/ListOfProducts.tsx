import { useState } from "react";
import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";

function ListOfProducts(){

    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedPriceRange, setSelectedPriceRange] = useState("")

    const categoryList = [...new Set(listings.map(listing => listing.category))];
    const cityList = [...new Set(listings.map(listings => listings.city))];
    const pricesList = [100, 300, 1000]

    const filteredProducts = listings.filter((listing) => 
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