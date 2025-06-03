'use client';
import React, { useState } from 'react'
import { signIn } from '../../hooks/uselogin'
import { useRouter } from 'next/navigation'
import { signUp } from '@/app/hooks/useregister'
import { requestPasswordReset } from '@/app/hooks/usechangepassword';

export default function LogIn() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const[name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter()

    const handle = async (e) => {
        e.preventDefault()

        signUp(name, lastName, email, password)
        alert("Acepta en tu correo si pusiste todo bien🤖🤖🤖")


    }

    return (
        <div className="auth-container">
            <form>

                <h2>Registro</h2>

                <div className="input-auth">

                    <div className="input"><span>Nombres</span>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="input"><span>Apellidos</span>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>

                    <div className="input"><span>Correo</span>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="input"><span>Contraseña</span>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="input"><span>Confirmar contraseña</span>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className='input-checkbox'>
                        <input type='checkbox'></input><span>Acepto términos y condiciones</span>
                    </div>



                    <span className="error-input" style={{ display: error && "block" }} >Error</span>
                </div>

                <div className="input-buttons">
                    <button onClick={handle}>Registro</button>
                    {/* <button onClick={(e) =>{
                        requestPasswordReset("kevinjvillalba774@gmail.com")
                        e.preventDefault()
                        }} style={{width:"170px"}}>Cambiar contraseña</button> */}
                </div>

            </form>
        </div>
    )
}