import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth"

function Navbar() {
  const { user, token, logout } = useAuth()

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

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Witaj, <span className="font-medium text-gray-900">{user.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Zaloguj
                </Link>
                <Link
                  to="/auth/register"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Zarejestruj się
                </Link>
              </div>
            )}

          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
