'use client'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import supabase from '../hooks/supabase'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'

const Header = () => {
    const [isLoad, setIsLoad] = useState(false)
    const [user, setUser] = useState(false)

    const router = useRouter()



    useEffect(() => {
        const isLoggedIn = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        isLoggedIn()
        setIsLoad(true)
    }, [])

    //aqui la mayoria de cosas faltan
    return (
        <header className='header'>
            <span className='icon' onClick={() => router.push('/')}>

                {isLoad && <FontAwesomeIcon icon={faGraduationCap} />}
                UnicorHub</span>

            <ul className='header-nav'>
                <li>Material</li>
                <li>Recursos</li>
                <li onClick={() => router.push('/upload')}>Documentos</li>
                <li>Biblioteca</li>
                <li>Foro</li>
            </ul>

            <input type="text" className='header-search'></input>
            {!user ? <button onClick={() => router.push('/auth/sign-in')} className='header-login'>LogIn</button> : 
            <div onClick={() => router.push('/auth/sign-in')} className='header-icon'>
                <FontAwesomeIcon icon={faCircleUser} size='2x'></FontAwesomeIcon >
            </div>
            }
        </header>
    )
}

export default Header