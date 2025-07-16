'use client'
import Header from './components/Header'
import Main from './components/Main'
import LogIn from './auth/sign-in/page'


export default function Home() {
  
  return (
    <div className='container'>
    <Header></Header>
    <Main></Main>
    <LogIn></LogIn>
    </div>
  )
}
