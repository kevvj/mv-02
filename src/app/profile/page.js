'use client'
import { useState, useEffect } from "react"
import Header from "../components/Header"
import supabase from "../hooks/supabase"
import { useRouter } from 'next/navigation'
import LogIn from "../auth/sign-in/page"

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
        router.push('/')
        await supabase.auth.signOut()
        setUser(false)
    }


    return (
        <>

            {user &&
                <div>
                    <Header></Header>
                    <button className="Button" onClick={() => handleSignOut()}>Cerrar sesión</button>
                    <p>{user.user_metadata.name}</p>
                    <p>{user.user_metadata.lastName}</p>
                    <p>{user.user_metadata.email}</p>
                    <p>{user.user_metadata.type}</p>
                    
                </div>}
        </>
    )
}

export default Profile