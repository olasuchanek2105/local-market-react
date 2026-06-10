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
  {
    id: 4,
    title: "Samsung Galaxy S21",
    price: 1400,
    city: "Katowice",
    category: "Elektronika",
  },
  {
    id: 5,
    title: "Laptop Lenovo ThinkPad",
    price: 2200,
    city: "Gliwice",
    category: "Elektronika",
  },
  {
    id: 6,
    title: "Słuchawki Sony WH-1000XM4",
    price: 750,
    city: "Kraków",
    category: "Elektronika",
  },
  {
    id: 7,
    title: "Monitor Dell 24 cale",
    price: 430,
    city: "Katowice",
    category: "Elektronika",
  },
  {
    id: 8,
    title: "Krzesło biurowe",
    price: 180,
    city: "Gliwice",
    category: "Meble",
  },
  {
    id: 9,
    title: "Stolik kawowy",
    price: 120,
    city: "Kraków",
    category: "Meble",
  },
  {
    id: 10,
    title: "Szafa przesuwna",
    price: 600,
    city: "Katowice",
    category: "Meble",
  },
  {
    id: 11,
    title: "Komoda biała",
    price: 350,
    city: "Gliwice",
    category: "Meble",
  },
  {
    id: 12,
    title: "Kanapa rozkładana",
    price: 900,
    city: "Kraków",
    category: "Meble",
  },
  {
    id: 13,
    title: "Bluza Nike",
    price: 110,
    city: "Katowice",
    category: "Ubrania",
  },
  {
    id: 14,
    title: "Sukienka letnia",
    price: 80,
    city: "Gliwice",
    category: "Ubrania",
  },
  {
    id: 15,
    title: "Buty Adidas",
    price: 160,
    city: "Kraków",
    category: "Ubrania",
  },
  {
    id: 16,
    title: "Płaszcz zimowy",
    price: 220,
    city: "Katowice",
    category: "Ubrania",
  },
  {
    id: 17,
    title: "Koszula oversize",
    price: 70,
    city: "Gliwice",
    category: "Ubrania",
  },
  {
    id: 18,
    title: "Tablet iPad 9 gen",
    price: 1300,
    city: "Kraków",
    category: "Elektronika",
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