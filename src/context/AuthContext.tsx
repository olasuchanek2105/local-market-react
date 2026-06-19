import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

type AuthContextType = {
    user: userType | null,
    token: string | null,
    login: (newToken: string, newUser: userType) => void
}

const defaultValue = {
    user : null,
    token: null,
    login: ()=> {}
}
type userType = {
    id: number,
    email: string,
    username: string
}

export const AuthContext = createContext<AuthContextType>(defaultValue)

function AuthProvider({ children }: { children: ReactNode }){
    const [token, setToken] = useState("")
    const [user, setUser] = useState<userType>({id: 0, email: "", username: ""})

    function login(newToken: string, newUser: userType ){
        setToken(newToken)
        setUser(newUser)
    }

    return (
        <AuthContext.Provider value={{ user, token, login }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider