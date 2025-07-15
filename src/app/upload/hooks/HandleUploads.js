import supabase from "@/app/hooks/supabase"


//Actualizar tabla de archivos finales(los que aparecen en las carrearas y eso)
export const handleTableFile = async (name, user_id, isError, setIsError, careerSelected, courseSelected, setUrls, user) => {
    if (!careerSelected) {
        setIsError('No hay ninguna carreara seleccionada')
        return
    }
    if (!courseSelected) {
        setIsError('No hay ningun curso seleccionado')
        return
    }
    const { data, error } = await supabase
        .from('files')
        .insert([{
            name,
            user_id,
            career: careerSelected ? careerSelected.id : "",
            course: courseSelected ? courseSelected.name : ""
        }])
        .select('*')
    if (error) {
        console.log(error)
        setIsError(error)
        return
    } else {
        console.log(data)
    }

    handleDelete(name, setUrls, setIsError, user)
    setIsError('')
}

//Selecciona el archivo de almacenamiento interno
export const handleFile = (e, setFile) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
}


//Aqui se sube el archivo a la base de datos para despues ser revisada
export const uploadFile = async (file, setIsError, careerSelected, courseSelected, user, isError, setUrls, description) => {
    if (!file) {
        console.log('No hay ningún archivo seleccionado')
        setIsError('No hay ningún archivo seleccionado')
        return
    }
    if (!careerSelected) {
        console.log('No hay ninguna carrera seleccionada')
        setIsError('No hay ninguna carrera seleccionada')
        return
    }
    if (!courseSelected) {
        console.log('No hay ningún curso seleccionado')
        setIsError('No hay ningún curso seleccionado')
        return
    }
    const safeName = file.name
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9._-]/g, '')
    const filePath = `allfiles/${safeName}`
    const personalFilePath = `${user.id}/${safeName}`
    uploadFileToFolder(filePath, setIsError, file, setUrls, user)

    user.user_metadata.type === "user" && uploadFileToFolder(personalFilePath, setIsError, file, setUrls, user)

    handleAddPendingFiles(safeName, user, setIsError, careerSelected, courseSelected, description, setUrls)

    setIsError('')
}
//aaaaaaa

//Cargar el archivo a una carpeta en especifico ya sea a la general o a la personal
export const uploadFileToFolder = async (filePath, setIsError, file, setUrls, user) => {

    try {

        const { data, error } = await supabase.storage
            .from('files')
            .upload(filePath, file)
        if (error) {
            setIsError(error?.message || 'Error desconocido')
            console.log(error)
            return
        }

        setIsError('')
        handleFileList(setIsError, setUrls, user)

    } catch (err) {
        console.log(err)
        setIsError('Error inesperado')
    }
}


// Aqui carga todo lo que ese usuario tenga en su carpeta de base de datos o si es admin carga todo lo que hay en archivos pendientes
export const handleFileList = async (setIsError, setUrls, user) => {

    if (user.user_metadata.type === "user") {

        const { data, error } = await supabase.storage
            .from('files')
            .list(user.id)
        if (error) {
            console.log(error)
            setIsError(error)
            return
        }
        const urlss = data.map(file => {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`${user.id}/${file.name}`)
            if (error) {
                setIsError(error)
                return
            }
            setIsError('')
            return { name: file.name, url: data.publicUrl }
        })
        setUrls(urlss)

        console.log('se actualizó la tabla')

    }

    if (user.user_metadata.type === "admin") {

        //aqui tengo que moverle mañana

        const { data, error } = await supabase.storage
            .from('files')
            .list('allfiles')
        if (error) {
            console.log(error)
            setIsError(error)
            return
        }
        const urlss = data.map(file => {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`allfiles/${file.name}`)
            if (error) {
                setIsError(error)
                console.log('handleFileList')
                return
            }
            setIsError('')
            return { name: file.name, url: data.publicUrl }
        })
        setUrls(urlss)

        const { data: prueba1, error: pruebaError } = await supabase
            .from('pendingfiles')
            .select('*')

        if (pruebaError) {
            console.log(pruebaError)
            return
        }

        const pruebaDeUrls = prueba1.map(items => {

            const { data: prueba2, error: pruebaError2 } = supabase.storage
                .from('files')
                .getPublicUrl(`${items.user_id}/${items.name}`)

            if (pruebaError2) return

            setIsError('')
            return { name: items.name, url: prueba2.publicUrl }
        })

        setUrls(pruebaDeUrls)


        console.log(prueba1)

    }
}

//Agregar a la tabla donde están los archivos permitidos

export const handleAdd = (name, setIsError, careerSelected, courseSelected, user, isError, setUrls) => {
    handleTableFile(name, user.id, isError, setIsError, careerSelected, courseSelected, setUrls, user)
}

export const handleAddPendingFiles = async (name, user, setIsError, careerSelected, courseSelected, description, setUrls) => {

    if (!careerSelected) {
        setIsError('No hay ninguna carreara seleccionada')
        return
    }
    if (!courseSelected) {
        setIsError('No hay ningun curso seleccionado')
        return
    }

    const user_id = user.id

    const { error } = await supabase.from('pendingfiles').insert([{
        name,
        user_id,
        career: careerSelected ? careerSelected.id : "",
        course: courseSelected ? courseSelected.name : "",
        description
    }])

    if (error) {
        setIsError(error)
        console.log('handleAddPendingFiles')
        return
    } else {
        setIsError('')
        handleFileList(setIsError, setUrls, user)
    }
}


//Eliminar ya sea de la personal para usuarios o eliminar en todas partes para los admins
export const handleDelete = async (name, setUrls, setIsError, user) => {


    if (user.user_metadata.type === "user") {
        const { data, error } = await supabase.storage
            .from('files')
            .remove([`${user.id}/${name}`])

        if (error) {
            setIsError(error)
            return
        } else {
            setIsError('')
        }

        const { data: data2, error: error2 } = await supabase
            .from('pendingfiles')
            .delete().eq('name', name)

        if (error2) {
            setIsError(error2)
            return
        } else {
            setIsError('')
        }
    }

    if (user.user_metadata.type === "admin") {

        const { data, error } = await supabase
            .from('pendingfiles')
            .delete().eq('name', name)

        if (error) {
            console.log(error)
        } else {
            setIsError('')
        }

        console.log(data)
    }

    handleFileList(setIsError, setUrls, user)
}