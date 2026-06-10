import { type Listing } from "../data/listings"
import { Link } from "react-router"


type ListingCardProps = {
    listing: Listing
}


function ListingCard(props: ListingCardProps){
    console.log(props)
    return(
        <div>
            <h2>{props.listing.title}</h2>
            <p>{props.listing.price}</p>
            <p>{props.listing.city}</p>
            <p>{props.listing.category}</p>
            <Link to={`/listings/${props.listing.id}`}>
            Zobacz szczegóły
            </Link>
        </div>
    )

}

export default ListingCard