import React from 'react'
import { Link } from 'react-router-dom'
import '/src/Components/Footer/footer.styles.scss'



const Footer = () => {

  return (


    <footer className="text-center text-dark foot w-100 p-0 " style={{ fontWeight: "bolder" }} >




      <div data-aos="slide-right" className="text-center d-flex border-top justify-content-center pt-4 flex-wrap ">

        <div className="col-md-2 mb-2 " style={{ width: "200px" }}>
          <h6 className="text-uppercase font-weight-bold">
            <a href="#!" className="text-dark">About us</a>
          </h6>
        </div>



        <div className="col-md-2 mb-2" style={{ width: "200px" }}>
          <h6 className="text-uppercase font-weight-bold">
            <a href="#!" className="text-dark">Awards</a>
          </h6>
        </div>



        <div className="col-md-2 mb-2" style={{ width: "200px" }}>
          <h6 className="text-uppercase font-weight-bold">
            <a href="#!" className="text-dark">Help</a>
          </h6>
        </div>



       

      </div>




      <hr className='my-4' />


      <section className="mb-2">
        <div className=" d-flex justify-content-center">
          <div className="col-lg-8">
            <p className='mt-4 mb-4'>
             Follow us on social media for style inspiration and exclusive discounts. Elevate your skin with UrgentBuy today!
            </p>
          </div>
        </div>
      </section>



      <section className="text-center mb-4">
        <a href="" className="text-dark me-4">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="text-dark me-4">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="text-dark me-4">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="text-dark me-4">
          <i className="fab fa-instagram"></i>
        </a>

      </section>





      <div

        className="text-center d-flex align-items-center justify-content-center "
        style={{ backgroundColor: "black", height: '70px' }}
      >

        <p className='m-0 p-0 text-white'>

          &copy; 2024 . All Rights Reserved.
        </p>

      </div>

    </footer>



  )
}

export default Footer