import supabase from './supabase'

export const signUp = async (name, lastName, email, password) => {



    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                lastName:lastName,
                type:"user",
            }
        }
    })

    if (error) {
        console.error('Error al registrarse:', error)
    } else {
        console.log('Usuario registrado:', data)

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'USER_UPDATED') {
                console.log(session?.user?.email_confirmed_at ? 'Correo verificado' : 'Correo no verificado')
            }
        })

    }
}