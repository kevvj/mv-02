
import Header from "@/app/components/Header"
import { ContentSP } from "./hooks/useContent"
import { CoursesSP } from "./hooks/useContent"


const CareerContent = async ({ params }) => {
    const { id } = await params
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const Content = await ContentSP()
    const Courses = await CoursesSP()

    //esta vaina da un lag que te cagas

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