import { use, useState } from "react"
import type { Listing } from "../data/listings"


function AddListing(){

    const [listing, setListing] = useState({ title: "", price: 0, city: "", category: "" })

    return(

        <div>
            <h2>Dodaj ogłoszenie</h2>

            <input type="text" 
            placeholder="Tytuł"
            value={listing.title}
            onChange={(event) => setListing({...listing, title: event.target.value})}

            />

            <input type="text" 
            placeholder="Cena"
            value={listing.price}
            onChange={(event) => setListing({...listing, price: Number(event.target.value)})}

            />
          
            <input type="text" 
            placeholder="Miasto"
            value={listing.city}
            onChange={(event) => setListing({...listing, city: event.target.value})}
            />
          
            <input type="text" 
            placeholder="Kategoria"
            value={listing.category}
            onChange={(event) => setListing({...listing, category: event.target.value})}
            />

        </div>
    )
}


