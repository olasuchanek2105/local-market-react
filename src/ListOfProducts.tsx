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

    return(
        <div>
            {listings.map((listings) => (
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