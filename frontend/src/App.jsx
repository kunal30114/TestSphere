import { useState } from 'react'
import './App.css'
import StudentRegister from './components/Student/StudentRegister.jsx'
import TeacherRegister from './components/Teacher/TeacherRegister.jsx'
import TeacherLogin from './components/Teacher/TeacherLogin.jsx'
import LandingPage from './components/Hero/Hero.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
    </>
  )
}

export default App
