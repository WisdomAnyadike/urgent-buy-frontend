import React from 'react'
import { Link } from 'react-router-dom'
import NavbarComponent from '../../Components/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'
import '/src/Pages/Home /home.styles.scss'
import Footer from '../../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Animate from '../../Components/Aos/animate'
import Dropdown from 'react-bootstrap/Dropdown';
import { Icon } from '@iconify/react';
import Carousel from 'react-bootstrap/Carousel';
import Ads from '../../Components/ad/ads'







const Home = () => {
  const location = useLocation()
  const [footer, setFooter] = useState(false)

  useEffect(() => {
    if (location.pathname == '/signin') {
      setFooter(false)
    } else {
      setFooter(true)
    }
  }, [location])


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }







  return (
    <Animate>


      <div>
        {footer && <>
          <Ads />
          <div className='findus border'>
            <Dropdown>
              <Dropdown.Toggle variant="light" className='d-flex align-items-center justify-content-between' id="dropdown-basic" style={{ fontSize: "14px" }}>
                <Icon icon="mdi:instagram" width="24" height="24" style={{ color: '#000' }} /> <b className='ms-2'>Find Us </b>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"> Instagram </Dropdown.Item>
                <Dropdown.Item href="#/action-2"> Facebook </Dropdown.Item>
                <Dropdown.Item href="#/action-3"> Twitter </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>


          </div>


          <Carousel data-aos="fade-up" activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img className='images' width={'100%'} height={'540px'} src="https://baseofsweden.com/cdn/shop/articles/clean_girl_makeup_2_2200_x_1080_px_2.png?v=1677068969" alt="" />
              <Carousel.Caption>
                <p style={{ fontFamily: "cursive" }}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
              <img className='images' width={'100%'} height={'540px'} src="https://nypost.com/wp-content/uploads/sites/2/2023/08/NYPICHPDPICT000025623785.jpg" alt="" />
              <Carousel.Caption>
                <p style={{ fontFamily: "cursive" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className='images' width={'100%'} height={'540px'} src="https://www.beautypie.com/_next/image?url=https%3A%2F%2Fd2csxpduxe849s.cloudfront.net%2Fmedia%2F192DFBC7-8953-4970-B7753853A910CFA9%2F43162450-DA63-43E6-8D9E6675E2A10C16%2F0E578218-D545-412D-84D8F1332EBC20A0%2FOTF%2520BETA-japanfusion_genius_lift_elixir_gabi_190705_blog_16_9_CSL_WEB.jpg&w=1920&q=75" alt="" />
              <Carousel.Caption>
                <p style={{ fontFamily: "cursive" }} > Praesent commodo cursus magna, vel scelerisque nisl consectetur.  </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>



          <div data-aos="fade-up" className='ads' style={{ height: "200px" }}>
            <h3 data-aos="fade-up-right" style={{ fontFamily: "cursive" }}>  Chemical Free </h3>
            <h3 data-aos="flip-left" style={{ fontFamily: "cursive" }}>  Reliable </h3>
            <h3 data-aos="fade-down-left" style={{ fontFamily: "cursive" }}>   All over the world</h3>
          </div>
        </>}



        <NavbarComponent />
        <Outlet />
        {footer && <Footer />}

      </div>

    </Animate>
  )
}

export default Home