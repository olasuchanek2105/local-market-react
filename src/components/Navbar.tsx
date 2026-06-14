import { Link } from "react-router"

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-600 tracking-tight">
          LocalMarket
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/listings"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Ogłoszenia
          </Link>
          <Link
            to="/listings/add"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            + Dodaj ogłoszenie
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
