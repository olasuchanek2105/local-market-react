import { Route, Routes } from "react-router"
import ListOfProducts from "./pages/ListOfProducts"
import { ListingDetails } from "./pages/ListingDetails"
import AddListing from "./pages/AddListing"
import Navbar from "./components/Navbar"
import AuthProvider from "./context/AuthContext"
import Register from "./pages/Register"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<ListOfProducts />} />
          <Route path="/listings" element={<ListOfProducts />} />
          <Route path="/listings/add" element={<AddListing />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/auth/register" element={<Register/>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
