
import Header from "@/app/components/Header"
import { ContentSP } from "./hooks/useContent"
import { CoursesSP } from "./hooks/useContent"


const CareerContent = async ({ params }) => {
    const { id } = await params
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const Content = await ContentSP()
    const Courses = await CoursesSP()

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

// const Courses = [
//     { id: 1, name: "Calculo I", semester: "1", career: "Engineering" },
//     { id: 2, name: "Matemática I", semester: "1", career: "Engineering" },
//     { id: 3, name: "Introducción a la Ingeniería", semester: "1", career: "Engineering" },
//     { id: 4, name: "Química General", semester: "1", career: "Engineering" },
//     { id: 5, name: "Comunicación Oral y Escrita", semester: "1", career: "Engineering" },
  
//     { id: 6, name: "Calculo II", semester: "2", career: "Engineering" },
//     { id: 7, name: "Física I", semester: "2", career: "Engineering" },
//     { id: 8, name: "Álgebra Lineal", semester: "2", career: "Engineering" },
//     { id: 9, name: "Programación I", semester: "2", career: "Engineering" },
//     { id: 10, name: "Dibujo Técnico", semester: "2", career: "Engineering" },
  
//     { id: 11, name: "Calculo III", semester: "3", career: "Engineering" },
//     { id: 12, name: "Física II", semester: "3", career: "Engineering" },
//     { id: 13, name: "Estructuras Discretas", semester: "3", career: "Engineering" },
//     { id: 14, name: "Programación II", semester: "3", career: "Engineering" },
//     { id: 15, name: "Electrónica Básica", semester: "3", career: "Engineering" },
  
//     { id: 16, name: "Ecuaciones Diferenciales", semester: "4", career: "Engineering" },
//     { id: 17, name: "Mecánica", semester: "4", career: "Engineering" },
//     { id: 18, name: "Bases de Datos", semester: "4", career: "Engineering" },
//     { id: 19, name: "Sistemas Operativos", semester: "4", career: "Engineering" },
//     { id: 20, name: "Probabilidad y Estadística", semester: "4", career: "Engineering" },
  
//     { id: 21, name: "Calculo Numérico", semester: "5", career: "Engineering" },
//     { id: 22, name: "Termodinámica", semester: "5", career: "Engineering" },
//     { id: 23, name: "Redes de Computadoras", semester: "5", career: "Engineering" },
//     { id: 24, name: "Ingeniería de Software I", semester: "5", career: "Engineering" },
//     { id: 25, name: "Simulación", semester: "5", career: "Engineering" },
  
//     { id: 26, name: "Dinámica", semester: "6", career: "Engineering" },
//     { id: 27, name: "Electromagnetismo", semester: "6", career: "Engineering" },
//     { id: 28, name: "Sistemas Digitales", semester: "6", career: "Engineering" },
//     { id: 29, name: "Ingeniería de Software II", semester: "6", career: "Engineering" },
//     { id: 30, name: "Seguridad Informática", semester: "6", career: "Engineering" },
  
//     { id: 31, name: "Control Automático", semester: "7", career: "Engineering" },
//     { id: 32, name: "Inteligencia Artificial", semester: "7", career: "Engineering" },
//     { id: 33, name: "Gestión de Proyectos", semester: "7", career: "Engineering" },
//     { id: 34, name: "Minería de Datos", semester: "7", career: "Engineering" },
//     { id: 35, name: "Instrumentación", semester: "7", career: "Engineering" },
  
//     { id: 36, name: "Robótica", semester: "8", career: "Engineering" },
//     { id: 37, name: "Internet de las Cosas", semester: "8", career: "Engineering" },
//     { id: 38, name: "Emprendimiento Tecnológico", semester: "8", career: "Engineering" },
//     { id: 39, name: "Taller de Innovación", semester: "8", career: "Engineering" },
//     { id: 40, name: "Simulación de Procesos", semester: "8", career: "Engineering" },
  
//     { id: 41, name: "Ingeniería de Requisitos", semester: "9", career: "Engineering" },
//     { id: 42, name: "Arquitectura de Software", semester: "9", career: "Engineering" },
//     { id: 43, name: "Diseño de Interfaces", semester: "9", career: "Engineering" },
//     { id: 44, name: "Electiva Profesional I", semester: "9", career: "Engineering" },
//     { id: 45, name: "Seminario de Tesis", semester: "9", career: "Engineering" },
  
//     { id: 46, name: "Trabajo de Grado", semester: "10", career: "Engineering" },
//     { id: 47, name: "Ética Profesional", semester: "10", career: "Engineering" },
//     { id: 48, name: "Electiva Profesional II", semester: "10", career: "Engineering" },
//     { id: 49, name: "Gestión Ambiental", semester: "10", career: "Engineering" },
//     { id: 50, name: "Evaluación de Proyectos", semester: "10", career: "Engineering" },

//     { id: 51, name: "Matematicas", semester: "1", career: "Economy" },
//   ]
  



export default CareerContent