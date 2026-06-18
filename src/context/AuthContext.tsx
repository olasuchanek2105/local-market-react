import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

const defaultValue = {
    user : null,
    token: null
}

export const AuthContext = createContext(defaultValue)

function AuthProvider({ children }: { children: ReactNode }){
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{ user, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider