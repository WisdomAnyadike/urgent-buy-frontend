import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
    
  return (
 
  
    <footer className="text-center text-white mt-5" style={{	
        background: 'linear-gradient(to right, #2b2e32 60%, #4e05b2)'}}>
 
   
        <section className="">
        
          <div className="text-center d-flex justify-content-center pt-4 flex-wrap ">

            <div className="col-md-2 mb-2 " style={{width:"200px"}}>
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white">About us</a>
              </h6>
            </div>

  

            <div className="col-md-2 mb-2" style={{width:"200px"}}>
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white">Products</a>
              </h6>
            </div>

  

            <div className="col-md-2 mb-2" style={{width:"200px"}}>
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white">Awards</a>
              </h6>
            </div>

  

            <div className="col-md-2 mb-2" style={{width:"200px"}}>
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white">Help</a>
              </h6>
            </div>
         
  
        
            <div className="col-md-2 mb-2" style={{width:"200px"}}>
              <h6 className="text-uppercase font-weight-bold">
                <a href="#!" className="text-white">Contact</a>
              </h6>
            </div>
   
          </div>
       
        </section>
   
  
        <hr className='my-4' />
  
    
        <section className="mb-2">
          <div className=" d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
              Welcome to UrgentBuy, your ultimate destination for trendy and affordable clothing!  Enjoy hassle-free shopping with fast delivery and easy returns.  Follow us on social media for style inspiration and exclusive discounts. Elevate your wardrobe with UrgentBuy today!


              </p>
            </div>
          </div>
        </section>
        
  
    
        <section className="text-center mb-4">
          <a href="" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="text-white me-4">
            <i className="fab fa-github"></i>
          </a>
        </section>
      
  
     
  
     
      <div
           className="text-center d-flex align-items-center justify-content-center p-3"
           style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
           >
       
	<p className='m-0 p-0 pt-2'>
		Created  by
		<Link className='links' to="http://linkedin.com/in/wisdom-anyadike-935870240" > anyacodes </Link>
		- Check how I created this 
		<Link className='links' to="https://github.com/WisdomAnyadike/Urgent-Buy-E-commerce-WebApp"> here </Link>.
    &copy; 2024 Anyadike Wisdom Chidubem. All Rights Reserved.
	</p>

      </div>

    </footer>
  


  )
}

export default Footer