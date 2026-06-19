
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

function Login() {
    const [user, setUser] = useState({ email: "", password: "" })
    const [success, setSuccess] = useState(false)
    const [notFound, setNotFound] = useState(false)
    
    const {login} = useAuth()

    async function handleSubmit(event: any) {
        event.preventDefault()
        try{
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error("Nie udalo sie zalogowac")
            }     
                
            const data = await response.json()
            const {token, ...restUser} = data

            login(token, restUser)

            setUser({ email: "", password: "" })
            setSuccess(true)   
            setNotFound(false)    
        }
        catch(e) {
            setSuccess(false)
            setNotFound(true)
        }
        
    }

    const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
    const labelClass = "block text-sm font-medium text-gray-700 mb-1"

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Logowanie</h1>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className={labelClass}>Nazwa użytkownika</label>
                        <input
                            type="text"
                            placeholder="np. jan_kowalski"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Hasło</label>
                        <input
                            type="password"
                            placeholder="hasło"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className={inputClass}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
                    >
                        Zaloguj
                    </button>
                </form>

                {success && (
                    <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md px-4 py-3">
                        Udało się zalogować!
                    </div>
                )}
                
                {notFound && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
                        Nie udało się zalogować!
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login