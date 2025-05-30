'use client'
import { useState } from "react"
import supabase from "../hooks/supabase"
import { Excel, Pdf, Word } from "./components/DownloadItems"

const UploadFile = () => {

    const [file, setFile] = useState(null)
    const [pruebaDeUrl, setPruebaDeUrl] = useState(null)

    const handleFile = (e) => {
        const selectedFile = e.target.files[0]

        setFile(selectedFile)
    }

    const uploadFile = async () => {
        if (!file) {
            console.log('No hay ningún archivo seleccionado')
            return
        }
        const {
            data: { user }
        } = await supabase.auth.getUser()
        if (!user) {
            console.log('Usuario no identificado')
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
        } else {
            console.log('Archivo subido')
        }
    }

    const handleFileList = async (folder) => {
        const { data, error } = await supabase.storage
            .from('files')
            .list(folder)

        if (error) {
            console.log(error)
            return
        }

        const urls = data.map(file => {
            const { data, error } = supabase.storage
                .from('files')
                .getPublicUrl(`${folder}/${file.name}`)

            return { name: file.name, url: data.publicUrl }
        })

        console.log(urls)
        setPruebaDeUrl(urls[8].url)
    }

    return (
        <div className="upload-file-container">

            <label className="upload-file" htmlFor="fileInput">Seleccionar archivo</label>
            <input id="fileInput" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpeg,.png,.jpg" style={{ display: "none" }} onChange={(e) => handleFile(e)} />

            <div>Prueba de archivo seleccionado: {file && file.name}</div>

            <button onClick={() => uploadFile()}>Subir archivo</button>
            
            <Pdf></Pdf>
            <Word></Word>
            <Excel></Excel>
        </div>
    )
}

export default UploadFile