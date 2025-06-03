'use client'
import { useState } from "react"
import supabase from "../hooks/supabase"
import { Excel, Pdf, Word } from "./components/DownloadItems"
import { useEffect } from "react"
import ImgItem from "./components/ImgViewer"

const UploadFile = () => {

    const [file, setFile] = useState(null)
    const [user, setUser] = useState(null)
    const [urls, setUrls] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                console.log('Usuario no encontrado')
                alert('Usuario no loggeado')
            } else {
                setUser(user)
                handleFileList(user.id)
            }
        }

        fetchUser()

    }, [])

    const handleFile = (e) => {
        const selectedFile = e.target.files[0]

        setFile(selectedFile)
    }

    const uploadFile = async () => {
        if (!file) {
            console.log('No hay ningún archivo seleccionado')
            return
        }

        const safeName = file.name
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '')

        const filePath = `allfiles/${safeName}`
        const personalFilePath = `${user.id}/${safeName}`


        uploadFileToFolder(filePath)
        uploadFileToFolder(personalFilePath)

        handleFileList(user.id)
    }

    const uploadFileToFolder = async (filePath) => {
        const { data, error } = await supabase.storage
            .from('files')
            .upload(filePath, file)

        if (error) {
            console.log('Error:', error)
            alert('Error:', error)
        } else {
            console.log('Archivo subido')
            alert('Se subió bien, recarga la pagina xD')
        }
    }

    const handleFileList = async (folder) => {
        const { data, error } = await supabase.storage
            .from('files')
            .list('allfiles')

        if (error) {
            console.log(error)
            return
        }

        const urlss = data.map(file => {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`allfiles/${file.name}`)

            return { name: file.name, url: data.publicUrl }
        })

        setUrls(urlss)
    }

    return (
        <div className="upload-file-container">

            <label className="upload-file" htmlFor="fileInput">Seleccionar archivo</label>
            <input id="fileInput" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpeg,.png,.jpg" style={{ display: "none" }} onChange={(e) => handleFile(e)} />

            <div>Prueba de archivo seleccionado: {file && file.name}</div>

            <button onClick={() => uploadFile()}>Subir archivo</button>

          
            <div>
                {urls && urls.map(item =>(
                    <div key ={item.url}>
                        {item.url.endsWith('.pdf') && <Pdf href={item.url} name={item.name}></Pdf>}
                        {item.url.endsWith('.docx') && <Word href={item.url} name={item.name}></Word>}
                        {item.url.endsWith('.csv') && <Excel href={item.url} name={item.name}></Excel>}
                        {item.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && <ImgItem src={item.url}></ImgItem>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UploadFile