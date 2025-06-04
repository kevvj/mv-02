
import Header from "@/app/components/Header"
import { ContentSP, CoursesSP } from "./hooks/useContent"
import { getFilesTable } from "@/app/upload/hooks/LoadCourseContent"
import { Excel, Pdf, Word } from "../../upload/components/DownloadItems"
import ImgItem from "../../upload/components/ImgViewer"
import { Load } from "@/app/upload/hooks/LoadCourseContent"


const CareerContent = async ({ params }) => {
    const { id } = await params
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const Content = await ContentSP()
    const Courses = await CoursesSP()

    //esta vaina da un lag que te cagas

    const FILES = await getFilesTable()

    return (
        <>
            <Header></Header>
            <div className="career-content">

                <h1>{id}</h1>
                {
                    semesters.map(item => (
                        <div key={item} className="semester">
                            <div className="semester-number">
                                <h2>Semestre {item}</h2>

                            </div>

                            <div className="semester-content">
                                {
                                    Courses.filter(c => c.semester == item && c.career == id).map(content => (

                                        <div key={content.id}>

                                            <h3>Curso: {content.name}</h3>


                                            <div>
                                                {Content.filter(d => d.course == content.name).map(item => (
                                                    <div key={item.id}>
                                                        <iframe
                                                            width="560"
                                                            height="315"
                                                            src={item.url}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />

                                                    </div>
                                                ))}

                                               
                                                {FILES.filter(f => f.course == content.name).map(file => (
                                                    //ignoren esto xD despues lo arreglo
                                                    <div key={file.id}>
                                                        <Load name={file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                                            .replace(/\s+/g, '_')
                                                            .replace(/[^a-zA-Z0-9._-]/g, '')} ></Load>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}


export default CareerContent