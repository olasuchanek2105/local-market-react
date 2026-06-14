import { Route, Routes } from "react-router"
import ListOfProducts from "./pages/ListOfProducts"
import { ListingDetails } from "./pages/ListingDetails"
import AddListing from "./pages/AddListing"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<ListOfProducts />} />
        <Route path="/listings" element={<ListOfProducts />} />
        <Route path="/listings/add" element={<AddListing />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
    </div>
  )
}

export default App
