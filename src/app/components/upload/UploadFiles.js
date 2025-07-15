'use client'
import { useState } from "react"
import supabase from "../../hooks/supabase"
import { useEffect } from "react"
import { Load } from "./LoadCourseContent"
import { ContentSP, CoursesSP, CareerSP } from "../../career/[id]/hooks/useContent"
import { handleFile, uploadFile, handleFileList, handleAdd, handleDelete } from "../../upload/hooks/HandleUploads"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import LoadSpinner from "../Loader"

const UploadFiles = () => {
    const [file, setFile] = useState(null)
    const [user, setUser] = useState(null)
    const [urls, setUrls] = useState(null)
    const [isError, setIsError] = useState("")
    const [courses, setCourses] = useState([])
    const [careers, setCareers] = useState([])
    const [courseSelected, setCourseSelected] = useState(null)
    const [careerSelected, setCareerSelected] = useState(null)
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setIsError('El usuario no está loggeado')
            } else {
                setUser(user)
                handleFileList(setIsError, setUrls, user)
                setIsError('')
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
        setIsLoad(true)
    }, [])



    return (
        <>
            <div className="view-options-container">
                <select onChange={e => {
                    e.target.value ? setCareerSelected(JSON.parse(e.target.value)) : setCareerSelected(null)

                }}>

                    <option value="">Carrera</option>

                    {careers.map(item => (
                        <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                    ))}

                </select>

                <select onChange={e => {
                    e.target.value ? setCourseSelected(JSON.parse(e.target.value)) : setCourseSelected(null)
                }}>

                    <option value="">Curso</option>

                    {careerSelected && courses.filter(f => f.career == careerSelected.id).map(item => (
                        <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                    ))}

                    {!careerSelected && courses.map(item => (
                        <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                    ))}

                </select>
            </div>

            <div className="upload-file-container">

                <label className="upload-file" htmlFor="fileInput">Seleccionar archivo</label>
                <input id="fileInput" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpeg,.png,.jpg" style={{ display: "none" }} onChange={(e) => handleFile(e, setFile)} />

                <div>Prueba de archivo seleccionado: {file && file.name}</div>

                <button onClick={() => uploadFile(file, setIsError, careerSelected, courseSelected, user, isError, setUrls, "descripción ejemplo")}>Subir archivo</button>

                {isError && <p>{isError}</p>}


                <div>
                    {urls && urls.map(item => (
                        <div key={item.url} className="load-item">
                            {isLoad ? <Load name={item.name}></Load>
                            :
                            <LoadSpinner></LoadSpinner>}
                            
                            <div className="load-items-description">
                                <div className="load-items-name">
                                </div>
                                <div className="load-items-trashicon">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.name, setUrls, setIsError, user)}></FontAwesomeIcon>
                                </div>

                                {user.user_metadata.type === "admin" && <div className="load-items-checkicon">
                                    <FontAwesomeIcon icon={faCircleCheck} onClick={() => handleAdd(
                                        item.name, setIsError, careerSelected, courseSelected, user, isError, setUrls
                                    )}></FontAwesomeIcon>
                                </div>}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default UploadFiles