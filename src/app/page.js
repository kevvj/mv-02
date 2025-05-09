'use client'
import { useRouter } from 'next/navigation'



export default function Home() {
  const router = useRouter()
  return (
    <div className='container'>
    <button onClick={()=>router.push('/auth/sign-in')}>LogIn</button>
    </div>
  );
}
