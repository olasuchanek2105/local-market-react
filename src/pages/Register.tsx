import { useState } from "react";

function Register(){
    const [user, setUser] = useState({ email: "", username: "", password: "" })

    async function handleSubmit(event: any) {
        event.preventDefault()
        await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
        })
        setUser({ email: "", username: "", password: "" })
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
            <div>
            <input
              type="text"
              placeholder="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />

            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
            >
                Zarejestruj
            </button>
            </div>
            </form>
        </div>


    )
}
export default Register