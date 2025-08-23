import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Router, RouterProvider} from "react-router"
import TeacherRegister from './components/Teacher/TeacherRegister.jsx'
import TeacherLogin from './components/Teacher/TeacherLogin.jsx'
import StudentRegister from './components/Student/StudentRegister.jsx'
import Layout from './components/Layout.jsx'
import Hero from './components/Hero/Hero.jsx'
import Notfound from './components/NotFound/Notfound.jsx'
import Dashboard from './components/Teacher/Dashboard/Dashboard.jsx'
import GenerateTestPage from './components/Teacher/GenerateTestPage.jsx'
import PreviousTestHistory from './components/Teacher/Dashboard/PreviousTestHistory.jsx'
import TestRoom from './components/Student/TestRoom.jsx'
import { Provider } from 'react-redux'
import  {store}  from './store/store.js'
import ProtectedRoute from './ProtectedRoutes.jsx'



const router = createBrowserRouter([
  {
    path : '/',
    element: <Layout/>,
    children:[
      {
        index : true,
        element:<Hero/>
      },
      {
        path : 'teacher/registerTeacher',
        element: <TeacherRegister/>
      },
      {
        path : 'teacher/loginTeacher',
        element : <TeacherLogin/>
      },
      {
        path : 'student/StudentRegister/:id',
        element : <StudentRegister/>
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'teacher', element: <Dashboard /> },
          { path: 'teacher/generateTest', element: <GenerateTestPage /> },
          { path: 'teacher/view-results', element: <PreviousTestHistory /> },
        ],
      },
      {
        path: 'student/testRoom',
        element : <TestRoom/>
      }

    ]
  },
  {
    path: '*',
    element: <Notfound />,  
  }
])



createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
