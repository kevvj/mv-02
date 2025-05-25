'use client'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const Header = ()=>{
    const router = useRouter()

    //aqui la mayoria de cosas faltan
    return(
        <header className='header'>
        <span className='icon' onClick={()=> router.push('/')}><FontAwesomeIcon icon={faGraduationCap} />UnicorHub</span>

        <ul className='header-nav'>
            <li>Material</li>
            <li>Recursos</li>
            <li>Documentos</li>
            <li>Biblioteca</li>
            <li>Foro</li>
        </ul>

        <input type="text" className='header-search'></input>
        <button onClick={()=>router.push('/auth/sign-in')} className='header-login'>LogIn</button>
        </header>
    )
}

export default Header