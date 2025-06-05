'use client'
import { useState } from "react"
import supabase from "../hooks/supabase"
import { useEffect } from "react"
import { Load } from "./hooks/LoadCourseContent"
import Header from "../components/Header"
import { ContentSP, CoursesSP, CareerSP } from "../career/[id]/hooks/useContent"

const UploadFile = () => {

    const [file, setFile] = useState(null)
    const [user, setUser] = useState(null)
    const [urls, setUrls] = useState(null)

    const [isError, setIsError] = useState(false)

    const [courses, setCourses] = useState([])
    const [careers, setCareers] = useState([])

    const [courseSelected, setCourseSelected] = useState(null)
    const [careerSelected, setCareerSelected] = useState(null)





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

        const fetchContent = async () => {
            const Content = await ContentSP()
            const Courses = await CoursesSP()
            const Careers = await CareerSP()

            setCourses(Courses)
            setCareers(Careers)
        }

        fetchContent()
        fetchUser()
    }, [])

    const handleTableFile = async (name, user_id) => {


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
            setIsError(true)
            return
        }

        console.log(data)
    }

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

        handleTableFile(file.name, user.id)


    }

    const uploadFileToFolder = async (filePath) => {
        const { data, error } = await supabase.storage
            .from('files')
            .upload(filePath, file)

        if (error) {
            console.log('Error:', error)
            alert('Error:', error)
            setIsError(true)
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
            setIsError(true)
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
        <>
            <Header></Header>

            <select onChange={e => {
                setCareerSelected(JSON.parse(e.target.value))
            }}>

                <option value={"null"}>Carrera</option>

                {careers.map(item => (
                    <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                ))}

            </select>

            <select onChange={e => setCourseSelected(JSON.parse(e.target.value))}>

                <option value={"null"}>Curso</option>

                {careerSelected && courses.filter(f => f.career == careerSelected.id).map(item => (
                    <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                ))}

                {!careerSelected && courses.map(item => (
                    <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                ))}

            </select>

            <div className="upload-file-container">

                <label className="upload-file" htmlFor="fileInput">Seleccionar archivo</label>
                <input id="fileInput" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpeg,.png,.jpg" style={{ display: "none" }} onChange={(e) => handleFile(e)} />

                <div>Prueba de archivo seleccionado: {file && file.name}</div>

                <button onClick={() => uploadFile()}>Subir archivo</button>


                <div>
                    {urls && urls.map(item => (
                        <div key={item.url}>
                            <Load name={item.name}></Load>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default UploadFile