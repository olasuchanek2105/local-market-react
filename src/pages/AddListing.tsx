import { use, useEffect, useState } from "react"
import type { Listing } from "../data/listings"


function AddListing(){

    const [listing, setListing] = useState({ title: "", price: 0, city: "", category: "" })
    const [success, setSuccess] = useState(false)

    async function handleSubmit(event: any){
        event.preventDefault()

        await fetch("http://localhost:3000/listings/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(listing)
        })
        setListing({title: "", price: 0, city: "", category: ""})
        setSuccess(true)
    }


    return(

        <div>
            <h2>Dodaj ogłoszenie</h2>

            <form onSubmit={handleSubmit}>

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
            <button type="submit">Dodaj ogłoszenie</button>
            </form>
            {success && <p>Ogłoszenie zostało dodane!</p>}
        </div>
    )
}


export default AddListing