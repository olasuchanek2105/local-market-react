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

    const filteredProducts = listings.filter((listing) => listing.title.toLowerCase().includes(searchText.toLowerCase()))
    
    return(
        <div>
            <input type="text" 
            placeholder="Szukaj Produktu..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}/>
            
            {filteredProducts.map((listings) => (
                <div key={listings.id}> 
                <h2>{listings.title}</h2>
                <p>{listings.price}</p>
                <p>{listings.city}</p>
                <p>{listings.category}</p>
                </div>
            ))}


            {/* {listings.map((listings) => (
                <div key={listings.id}> 
                <h2>{listings.title}</h2>
                <p>{listings.price}</p>
                <p>{listings.city}</p>
                <p>{listings.category}</p>
                </div>
            ))} */}
        </div>

    )
}

export default ListOfProducts