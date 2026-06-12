import { useParams } from "react-router";
import { listings } from "../data/listings";


export function ListingDetails(){
    const params = useParams();

    const listing = listings.find(listing => listing.id === Number(params.id))

    if (!listing){
        return;
    } 

    return(
        <div>
            <h1>Szczegoly ogloszenia</h1>
            <h2>{listing.title}</h2>
            <p>Miasto: {listing.city}</p>
            <p>Cena: {listing.price} złotych</p>
            <p>Kategoria: {listing.category}</p>
        </div>
    )
}

export default ListingDetails