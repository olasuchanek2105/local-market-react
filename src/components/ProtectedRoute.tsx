import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

function ProtectedRoute({children} : {children: ReactNode}){
    const {user} = useAuth()

    if (!user) {
        return <Navigate to="/auth/login"/>
    }

    return children
}
export default ProtectedRoute