'use client';
import React, { useState } from 'react'
import supabase from './hooks/supabase'
import { signIn } from './hooks/uselogin';

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handle = async (e) => {
    e.preventDefault()

    const response = await signIn(email, password)

    response === 'Usuario autenticado' ? setIsLoggedIn(true) : setError(true)

  }



  return (
    <div className="container">
      <form>

        <h2>Iniciar Sesión</h2>

        <div className="input-login">
          <div className="input"><span>Correo</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="input"><span>Contraseña</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <span className="error-input" style={{ display: error && "block" }} >Error en la contraseña o correo</span>
        </div>

        <div className="input-buttons">
          <button onClick={handle}>Iniciar</button>
          <button>Registro</button>
        </div>

      </form>
    </div>
  );
}
