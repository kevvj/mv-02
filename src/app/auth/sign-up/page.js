'use client';
import React, { useState } from 'react'
import { signIn } from '../../hooks/uselogin'
import { useRouter } from 'next/navigation'

export default function LogIn() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const router = useRouter()

    const handle = async (e) => {
        e.preventDefault()
        router.push('/auth/sign-in')

    }

    return (
        <div className="auth-container">
            <form>

                <h2>Registro</h2>

                <div className="input-auth">

                    <div className="input"><span>Nombres</span>
                        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="input"><span>Apellidos</span>
                        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="input"><span>Correo</span>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="input"><span>Contraseña</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="input"><span>Confirmar contraseña</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className='input-checkbox'>
                        <input type='checkbox'></input><span>Acepto términos y condiciones</span>
                    </div>



                    <span className="error-input" style={{ display: error && "block" }} >Error en la contraseña o correo</span>
                </div>

                <div className="input-buttons">
                    <button onClick={handle}>Registro</button>
                </div>

            </form>
        </div>
    )
}