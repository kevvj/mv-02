
import { useRouter } from 'next/navigation'
import { CareerSP } from '../career/[id]/hooks/useContent'
import { useEffect, useState } from 'react'
const Main = () => {

    const [careers, setCareers] = useState([])

    useEffect(() =>{
        const getCareers = async () =>{
          const result = await CareerSP()
          setCareers(result)
        }

        getCareers()
    },[])

    //esperen lo meto a la base de datos

    

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