"use client"
import { useEffect, useRef, useState } from "react"

 export const LazyLoad = ({ children, className}) => {
    const ref = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
           console.log('Componente visible')
        }
      })

      if (ref.current) obs.observe(ref.current)
      return () => obs.disconnect()
    }, [])

    
    return <div ref={ref} className={className}>{visible ? children : null}</div>
  }