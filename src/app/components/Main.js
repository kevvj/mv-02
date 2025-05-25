
import { useRouter } from 'next/navigation'
import { CareerSP } from '../career/[id]/hooks/useContent'
const Main = () => {

    const prueba = CareerSP()

    //esperen lo meto a la base de datos

    const careers = [
        {
            id: "Engineering", name: "Ingeniería", description: "Ingeniería es la aplicación práctica de conocimientos científicos y matemáticos para diseñar, construir y optimizar estructuras, máquinas, sistemas o procesos que solucionan problemas y mejoran la vida humana."
        },
        {
            id: "Medicine", name: "Medicina", description: "Medicina es la ciencia y práctica dedicada al diagnóstico, tratamiento y prevención de enfermedades para mejorar la salud y el bienestar de las personas."
        },
        {
            id: "Arquitecture", name: "Arquitectura", description: "Arquitectura es el arte y técnica de diseñar y construir edificios y espacios que combinan funcionalidad, estética y seguridad."
        },
        {
            id: "Law", name: "Derecho", description: "Derecho es el estudio y aplicación de normas y leyes que regulan la convivencia social y la justicia."
        },
        {
            id: "Psychology", name: "Psicología", description: "Psicología es la ciencia que estudia el comportamiento y los procesos mentales humanos para mejorar la salud mental y emocional."
        },
        {
            id: "Economy", name: "Economía", description: "Economía es el análisis de la producción, distribución y consumo de bienes y servicios para entender y mejorar el bienestar social."
        },
        {
            id: "Computer Engineering", name: "Ingeniería Informática", description: "Ingeniería Informática se enfoca en el diseño, desarrollo y mantenimiento de sistemas y software para resolver problemas tecnológicos."
        },
        {
            id: "Nursing", name: "Enfermería", description: "Enfermería es la disciplina dedicada al cuidado integral de las personas para promover la salud y asistir en la recuperación de enfermedades."
        }
    ]

    const router = useRouter()

    return (
        <div className="main">
            <div className="careers-content">
                {careers.map((item) => (
                    <div key={item.id} className="main-career" onClick={() => router.push('/career/' + item.id)}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default Main