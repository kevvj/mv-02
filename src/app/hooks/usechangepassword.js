import supabase from './supabase'

export const requestPasswordReset = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
  
    if (error) {
      throw new Error(error.message)
    }
    
    console.log("correo de restablecimiento enviado")
    return 'Correo de restablecimiento enviado'
    
  }