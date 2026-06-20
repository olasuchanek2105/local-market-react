import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type AuthContextType = {
    user: userType | null,
    token: string | null,
    login: (newToken: string, newUser: userType) => void,
    logout: () => void
}

const defaultValue = {
    user : null,
    token: null,
    login: ()=> {},
    logout: ()=> {}
}
type userType = {
    id: number,
    email: string,
    username: string
}

export const AuthContext = createContext<AuthContextType>(defaultValue)

function AuthProvider({ children }: { children: ReactNode }){
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<userType| null>(null)

    useEffect(()=> {
        const localToken = localStorage.getItem('token')
        const localUser = localStorage.getItem('user')
        if (!localToken || !localUser){
            return;
        }
        setToken(localToken)
        setUser(JSON.parse(localUser))

    },[])

    function login(newToken: string, newUser: userType ){
        setToken(newToken)
        setUser(newUser)
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    function logout() {
        setToken(null)
        setUser(null)

        localStorage.removeItem('token')
        localStorage.removeItem('user')

    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider