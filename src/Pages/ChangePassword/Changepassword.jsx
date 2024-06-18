import React from 'react'
import '/src/Pages/ChangePassword/changepassword.styles.scss'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Logo from '../../Components/logo/logo';
import Preloader from '../../Components/loader/loader';


const Changepassword = () => {
  const { canChangePassword } = useSelector(state => state.PasswordSlice)
  const navigate = useNavigate()


  const [loading, isLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#*./,])[A-Za-z0-9@#*,./]{8,}$/

  const passwordChange = async (e) => {
   isLoading(true)
    e.preventDefault()
    console.log('red');

    if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
      isLoading(false)
      toast.error('Password must be at least 8 characters , with at least a number & special character')
    } else if (password !== confirmPassword || confirmPassword !== password) {
      isLoading(false)
      toast.error('Passwords do not match')
    }
    else {
      try {
        const res = await axios.post('https://blackdiamondluxe-backend-1.onrender.com/Api/User/changePassword', { Password: password }
        )
        if (res.data.status === 'okay') {
          isLoading(false)
          toast.success(res.data.message)
          setTimeout(() => {
            navigate('/signin')
          }, 3000)


        }
      } catch (error) {
        isLoading(false)
        toast.error(error.response.data.message)
      }
    }
  }




  return (
    <div className="mainDiv">
      {canChangePassword === true ? <div className="cardStyle">
        <form >

          <Logo />

          <h2 className="formTitle">
            Change your account password
          </h2>

          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">New Password</label>
            <input className='inpute' onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
          </div>

          <div className="inputDiv">
            <label className="inputLabel " htmlFor="confirmPassword">Confirm Password</label>
            <input className='inpute' onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" name="confirmPassword" />
          </div>

          <div className="buttonWrapper">
            <button type="submit" disabled={loading} onClick={(e) => passwordChange(e)} className="submitButton pure-button pure-button-primary d-flex align-items-center justify-content-center" style={{ height: "37px" }}>
              <span> {loading ? <Preloader /> : 'Continue'}</span>

            </button>
            <ToastContainer />
          </div>

        </form>
      </div> : ''}

    </div>
  )
}

export default Changepassword