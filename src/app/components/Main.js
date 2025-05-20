import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

const Main = () => {
    const careers = [
        {
            id: 1, name: "Ingeniería", description: "Ingeniería es la aplicación práctica de conocimientos científicos y matemáticos para diseñar, construir y optimizar estructuras, máquinas, sistemas o procesos que solucionan problemas y mejoran la vida humana."
        },
        {
            id: 2, name: "Medicina", description: "Medicina es la ciencia y práctica dedicada al diagnóstico, tratamiento y prevención de enfermedades para mejorar la salud y el bienestar de las personas."
        },
        {
            id: 3, name: "Arquitectura", description: "Arquitectura es el arte y técnica de diseñar y construir edificios y espacios que combinan funcionalidad, estética y seguridad."
        },
        {
            id: 4, name: "Derecho", description: "Derecho es el estudio y aplicación de normas y leyes que regulan la convivencia social y la justicia."
        },
        {
            id: 5, name: "Psicología", description: "Psicología es la ciencia que estudia el comportamiento y los procesos mentales humanos para mejorar la salud mental y emocional."
        },
        {
            id: 6, name: "Economía", description: "Economía es el análisis de la producción, distribución y consumo de bienes y servicios para entender y mejorar el bienestar social."
        },
        {
            id: 7, name: "Ingeniería Informática", description: "Ingeniería Informática se enfoca en el diseño, desarrollo y mantenimiento de sistemas y software para resolver problemas tecnológicos."
        },
        {
            id: 8, name: "Enfermería", description: "Enfermería es la disciplina dedicada al cuidado integral de las personas para promover la salud y asistir en la recuperación de enfermedades."
        }
    ]

    return (
        <div className="main">
            <div className="careers-content">
                {careers.map((item) => (
                    <div key={item.id} className="main-career">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default Main