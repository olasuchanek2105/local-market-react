import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth"

type UserProfile = {
    id: number,
    email: string,
    username: string,
    listings: { id: number, title: string, price: number, city: string, category: string }[]
}

function Profile(){

    const {user, token} = useAuth()
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

    useEffect(()=>{
        async function fetchUser() {
            const response = await fetch('http://localhost:3000/user/me', {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
            })
            if (!response.ok){
                throw new Error("Nie udało się pobrać danych o użytkowniku")
            }
            const data = await response.json()
            setUserProfile(data)
            
        }
        fetchUser()
    }, [])

    if (!userProfile) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-400">
                Ładowanie...
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Mój profil</h1>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Dane konta</h2>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                    <div className="flex gap-2">
                        <span className="font-medium text-gray-700">Nazwa użytkownika:</span>
                        <span>{userProfile.username}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span>{userProfile.email}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Moje ogłoszenia ({userProfile.listings.length})
                </h2>
                {userProfile.listings.length === 0 ? (
                    <p className="text-sm text-gray-400">Nie masz jeszcze żadnych ogłoszeń.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {userProfile.listings.map((listing) => (
                            <Link key={listing.id} to={`/listings/${listing.id}`} className="flex justify-between items-center border border-gray-100 rounded-md px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-medium text-gray-800">{listing.title}</p>
                                    <p className="text-gray-500">{listing.city} · {listing.category}</p>
                                </div>
                                <span className="font-bold text-green-600">{listing.price} zł</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile