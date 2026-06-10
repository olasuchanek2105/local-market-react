import { useState } from "react";

const listings = [
  {
    id: 1,
    title: "iPhone 13",
    price: 1800,
    city: "Katowice",
    category: "Elektronika",
  },
  {
    id: 2,
    title: "Biurko IKEA",
    price: 250,
    city: "Gliwice",
    category: "Meble",
  },
  {
    id: 3,
    title: "Kurtka jeansowa",
    price: 90,
    city: "Kraków",
    category: "Ubrania",
  },
];


function ListOfProducts(){

    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("")

    const categoryList = [...new Set(listings.map(listing => listing.category))];

    const filteredProducts = listings.filter((listing) => 
    {
      const matchesSearch = listing.title
        .toLowerCase()
        .includes(searchText.toLowerCase())

      const matchesCategory =
        selectedCategory === "" || listing.category === selectedCategory

      return matchesCategory && matchesSearch
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
            
            {filteredProducts.map((listings) => (
                <div key={listings.id}> 
                <h2>{listings.title}</h2>
                <p>{listings.price}</p>
                <p>{listings.city}</p>
                <p>{listings.category}</p>
                </div>
            ))}

        </div>

    )
}

export default ListOfProducts