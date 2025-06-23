'use client'
import { useState, useEffect } from "react"
import Header from "../components/Header"
import supabase from "../hooks/supabase"
import { useRouter } from 'next/navigation'

const Profile = () => {

    const [user, setUser] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const isLoggedIn = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        isLoggedIn()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setUser(false)
    }


    return (
        <>
            <Header></Header>
            <button className="Button" onClick={() => handleSignOut()}>Cerrar sesión</button>

            {user && <p>{user.user_metadata.full_name}</p>}
            {user && <p>{user.user_metadata.email}</p>}
            {user && <p>{user.user_metadata.phone}</p>}
        </>
    )
}

export default Profile