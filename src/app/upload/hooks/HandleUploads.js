import supabase from "@/app/hooks/supabase"

export const handleTableFile = async (name, user_id, isError, setIsError, careerSelected, courseSelected) => {

    if (isError) return

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
    }

    setIsError('')

    console.log(data)
}

export const handleFile = (e, setFile) => {
    const selectedFile = e.target.files[0]

    setFile(selectedFile)
}

export const uploadFile = async (file, setIsError, careerSelected, courseSelected, user, isError, setUrls) => {

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


    uploadFileToFolder(filePath, setIsError, file)
    uploadFileToFolder(personalFilePath, setIsError, file)

    handleFileList(setIsError, setUrls)

    handleTableFile(file.name, user.id, isError, setIsError, careerSelected, courseSelected)
    setIsError('')

}

export const uploadFileToFolder = async (filePath, setIsError, file) => {
    const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file)

    if (error) {
        console.log('Error:', error)
        alert('Error:', error)
        setIsError(error)
    } else {
        console.log('Archivo subido')
        alert('Se subió bien, recarga la pagina xD')
        setIsError('')
    }
}

export const handleFileList = async (setIsError, setUrls) => {
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
            return
        }
        setIsError('')


        return { name: file.name, url: data.publicUrl }
    })

    setUrls(urlss)
}