import { formatProdErrorMessage } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '/src/Pages/ForgotPassword/forgotpassword.styles.scss'
import {toast , ToastContainer} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCanChangePassword } from '../../Components/Redux/Changepassslice'



const Forgotpassword = () => {
const dispatch = useDispatch()
 const navigate = useNavigate()
const [otp , setOtp] = useState('')
const [ OtpChecker , setOtpChecker]  = useState('')
   const [isClicked , setisClicked ] = useState(false)

const [Email , setEmail] = useState('')

const handleSubmit = async(e)=> {
    e.preventDefault()
try {
    const res = await axios.post('http://localhost:4000/Api/User/getOtp' , {Email})

    if (res.data.status === 'okay' ) {
        toast.success(res.data.message)
        setOtpChecker(res.data.userOtp)
     setisClicked(true)
     setTimeout(()=> {
        setisClicked(false)
     }, 30000)


    }
} catch (error) {
    toast.error(error.response.data.message)
}

}


const handleValidate = (e)=> {
    e.preventDefault()
    if (otp !== '' &&  OtpChecker !== ''){
        if (OtpChecker == otp){
            toast.success('Success!Proceed to Change Password')
           dispatch(setCanChangePassword())

            setTimeout(()=>{
                navigate('/changePassword')
            },3000)
          
        }else {
            toast.error('Invalid Otp')
        }

    }

}




  return (
    <div className="bg-light d-flex justify-content-center align-items-center" style={{height:"100vh"}} >
    <div className="contain"  >
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div className="bg-white p-4 p-md-5 rounded shadow-sm">
            <div className="row gy-3 mb-5">
              <div className="col-12">
                <div className="text-center">
                  <a href="#!">
                    <img src="/src/assets/C0EEF199-A578-4A12-90A1-0CE418B54686-removebg-preview.png" alt="BootstrapBrain Logo" width="175" height="150"/>
                  </a>
                </div>
              </div>
              <div className="col-12">
                <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">Provide the email address associated with your account to recover your password.</h2>
              </div>
            </div>
            <form action="#!">
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text" style={{width:"20%"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </span>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" name="email" id="email" required/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button onClick={(e)=>handleSubmit(e)} className="btn btn-lg "  style={{backgroundColor:"#7f0bf9" , color:"white" , fontSize:"15px"}} type="submit">Reset Password  </button>
                    <ToastContainer/>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-12">
                <hr className="mt-5 mb-4 border-secondary-subtle"/>
                <div className="d-flex gap-4 justify-content-center">
                  <Link to="/signin" className="link-secondary text-decoration-none">Log In</Link>
                  <Link to="/signin" className="link-secondary text-decoration-none">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      


    </div>
    
 
    <div class={`position-fixed w-100 Otp ${isClicked ? 'd-flex' : 'd-none'} bg-light justify-content-center align-items-center`} style={{zIndex:'20', height:"100vh"}}>
    <a href="#!" className='position-absolute' style={{top:"0" , left:"10"}}>
                    <img src="/src/assets/C0EEF199-A578-4A12-90A1-0CE418B54686-removebg-preview.png" alt="BootstrapBrain Logo" width="145" height="130"/>
                  </a>
    <div class="position-relative" >
        <div class="card card1 p-5 text-center mt-5 pt-4" style={{width:"fit-content" ,  height:"fit-content"}}>
            <h6 className='mb-3'>Please enter the one time password <br/> to verify your account</h6>
            <div className='mb-2'> <span>A code has been sent to</span> <small>*******{Email.length > 1 ? Email.slice(4, Email.length) : ''}</small> </div>
            <b> Code expires in 30 seconds</b>
            <div id="otp" class=" d-flex flex-row justify-content-center mt-2"> 

            <input onChange={(e)=>setOtp(e.target.value)} pattern='\d*' class="m-2 text-center border-0 outline-0  rounded" type="password" id="first" maxlength="6" style={{fontSize:'20px', fontWeight:900 , letterSpacing:"3px"}}  />
            
             
             </div>
            <div class="mt-4"> <button onClick={(e)=> handleValidate (e)}  class="btn px-4 validate" style={{backgroundColor:'#fe1e70', color:'white'}}>Validate</button> </div>
        </div>
    </div>
</div>
  </div>
          
  )
}

export default Forgotpassword


