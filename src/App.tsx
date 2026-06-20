import { Route, Routes } from "react-router"
import ListOfProducts from "./pages/ListOfProducts"
import { ListingDetails } from "./pages/ListingDetails"
import AddListing from "./pages/AddListing"
import Navbar from "./components/Navbar"
import AuthProvider from "./context/AuthContext"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<ListOfProducts />} />
          <Route path="/listings" element={<ListOfProducts />} />
            <Route path="/listings/add" element={<ProtectedRoute> <AddListing /> </ProtectedRoute>} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path= "/auth/login" element={<Login/>}></Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
