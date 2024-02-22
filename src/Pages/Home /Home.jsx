import React from 'react'
import { Link } from 'react-router-dom'
import NavbarComponent from '../../Components/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'
import '/src/Pages/Home /home.styles.scss'
import Footer from '../../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'




const Home = () => {
  const location = useLocation()
  const [footer , setFooter] = useState(false)

  useEffect(() => {
    if (location.pathname == '/signin') {
      setFooter(false)
    } else {
      setFooter(true)
    }
  }, [location])


 
  
  return (
    <div>
 <NavbarComponent/>
    <Outlet/>
   {footer && <Footer/> } 
  
    </div>
  )
}

export default Home