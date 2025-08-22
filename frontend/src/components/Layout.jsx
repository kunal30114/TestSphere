import React from 'react'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
import Hero from './Hero/Hero.jsx'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default Layout