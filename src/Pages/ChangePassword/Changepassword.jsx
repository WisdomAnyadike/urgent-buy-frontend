import React from 'react'
import '/src/Pages/ChangePassword/changepassword.styles.scss'
import { useState } from 'react'
import {toast , ToastContainer} from 'react-toastify'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Changepassword = () => {
const {canChangePassword} = useSelector(state => state.PasswordSlice)
const navigate = useNavigate()


   
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#*])[A-Za-z0-9@#*]{8,}$/

    const passwordChange = async(e) => {
   
        e.preventDefault()
        console.log('red');
  
   if ( !passwordRegex.test(password) || !passwordRegex.test(confirmPassword)){
        toast.error('Password must be at least 8 characters , with at least a number & special character')
      }  else  if (password !== confirmPassword || confirmPassword !== password){
        toast.error('Passwords do not match')
       } 
      else{
        try {
          const res = await axios.post('http://localhost:4000/Api/User/changePassword' , {Password: password} 
           ) 
          if (res.data.status === 'okay') {
            toast.success(res.data.message)  
         setTimeout(()=> {
          navigate('/signin')
         },3000)
           

          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      }

      


  return (
    <div className="mainDiv">
    {canChangePassword === true ?  <div className="cardStyle">
      <form >
        
      <img src="/src/assets/C0EEF199-A578-4A12-90A1-0CE418B54686-removebg-preview.png" alt="BootstrapBrain Logo" width="175" height="150"/>
        
        <h2 className="formTitle">
          Change your account password
        </h2>
        
      <div className="inputDiv">
        <label className="inputLabel" htmlFor="password">New Password</label>
        <input className='inpute' onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" required/>
      </div>
        
      <div className="inputDiv">
        <label  className="inputLabel " htmlFor="confirmPassword">Confirm Password</label>
        <input className='inpute' onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      
      <div className="buttonWrapper">
        <button type="submit" onClick={(e)=>passwordChange(e)}  className="submitButton pure-button pure-button-primary d-flex align-items-center justify-content-center">
          <span>Continue</span>
       
        </button>
        <ToastContainer/>
      </div>
        
    </form>
    </div>  : ''}
   
  </div>
  )
}

export default Changepassword