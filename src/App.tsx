import { Route, Routes } from "react-router"
import ListOfProducts from "./pages/ListOfProducts"
import { ListingDetails } from "./pages/ListingDetails"
import AddListing from "./pages/AddListing"

function App() {
  return(
    // <div><ListOfProducts/> 
    // </div>
  <Routes>
    <Route path="/" element={<ListOfProducts />} />
    <Route path="/listings" element={<ListOfProducts />} />
    <Route path="/listings/:id" element={<ListingDetails />} />
    <Route path="/listings/add" element={< AddListing />} />
  </Routes>
  )

}

export default App
