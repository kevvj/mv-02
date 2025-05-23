
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Header from "@/app/components/Header"

const CareerContent = async ({ params }) => {
    const { id } = await params
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
                                    Courses.filter(c => c.semester == item).map(content => (

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

const Courses = [{ id: 1, name: "Calculo 1", semester: "1", career: "Engineering" },
{ id: 2, name: "Calculo 2", semester: "2", career: "Engineering" },
{ id: 3, name: "Calculo 3", semester: "3", career: "Engineering" },
{ id: 4, name: "Calculo 4", semester: "4", career: "Engineering" },
{ id: 4, name: "Calculo 5", semester: "2", career: "Engineering" },

]

const Content = [
    { id: 1, name: "Video educativo", semester: "1", career: "Engineering", url: "https://www.youtube.com/embed/7GXDmXndP8Y", course: "Calculo 1" },
    { id: 2, name: "Video educativo", semester: "1", career: "Engineering", url: "https://www.youtube.com/embed/U7L2XmS7dl0", course: "Calculo 4" },
    { id: 3, name: "Video educativo", semester: "1", career: "Engineering", url: "https://www.youtube.com/embed/6ai3-qgyulY", course: "Calculo 3" },
    { id: 4, name: "Video educativo", semester: "2", career: "Engineering", url: "https://www.youtube.com/embed/aVNa-J8iB5I", course: "Calculo 2" },
    { id: 5, name: "Video educativo", semester: "2", career: "Engineering", url: "https://www.youtube.com/embed/0SSkMnP-3IQ", course: "Calculo 5" },
    { id: 6, name: "Video educativo", semester: "2", career: "Engineering", url: "https://www.youtube.com/embed/6ai3-qgyulY", course: "Calculo 3" },
    { id: 7, name: "Video educativo", semester: "3", career: "Engineering", url: "https://www.youtube.com/embed/aVNa-J8iB5I", course: "Calculo 2" }]

export default CareerContent