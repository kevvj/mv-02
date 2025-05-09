import supabase from './supabase'

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error al iniciar sesión:', error)
      return error
    } else {
        console.log('Usuario autenticado:', data)
        return 'Usuario autenticado'
      
    }
  }