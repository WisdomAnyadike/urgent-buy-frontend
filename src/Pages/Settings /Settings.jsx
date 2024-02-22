import React, { useEffect } from 'react'
import '/src/Pages/Settings /settings.styles.scss'
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserObj } from '../../Components/Redux/Userslice';


const Settings = () => {
   const navigate = useNavigate()
  const userObj = useSelector(state => state.Userslice.userObj)
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const token = localStorage.getItem("urgentBuyToken")
  
  const dispatch = useDispatch()


    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };

    const editFullName = (e)=> {
        dispatch(setUserObj({...userObj , FullName : e.target.value }))

    }
    const editEmail = (e)=> {
        dispatch(setUserObj({...userObj , Email : e.target.value }))
    }

   

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#*])[A-Za-z0-9@#*]{8,}$/

    const changePassword = async(event) => {
   
      event.preventDefault()
      console.log('red');

 if ( !passwordRegex.test(password) || !passwordRegex.test(confirmPassword)){
      toast.error('Password must be at least 8 characters , with at least a number & special character')
    }  else  if (password !== confirmPassword || confirmPassword !== password){
      toast.error('Passwords do not match')
     } 
    else{
      try {
        const res = await axios.post('http://localhost:4000/Api/User/editPassword' , {Password: password} , {
          headers:{
              'Authorization': `Bearer ${token}`,
              "content-type": "application/json"
          }
        } ) 
        if (res.data.status === 'okay') {
          toast.success(res.data.message)  
       setTimeout(()=> {
        navigate('/dashboard')
       },3000)
         
      
          
          

        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    }


    const changeUserInfo = async(event) => {
      event.preventDefault()
      console.log('red');

      try {
        const res = await axios.post('http://localhost:4000/Api/User/editUserInfo' , userObj , {
          headers:{
              'Authorization': `Bearer ${token}`,
              "content-type": "application/json"
          }
        } ) 
        if (res.data.status === 'okay') {
          toast.success(res.data.message)  
          
          setTimeout(()=> {
            navigate('/dashboard')
           },3000)
       
         

        }
      } catch (error) {
        alert(error.response.data.message)
      }
    
    }

    const handleDelete = async (e)=> {
e.preventDefault()
try {
  const res = await axios.post('http://localhost:4000/Api/User/deleteUser' , {} , {
    headers:{
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
    }} ) 

    if (res.data.status === 'okay') {
      alert(res.data.message)
      localStorage.removeItem('urgentBuyToken')
      navigate('/signin')
      
    }
  
} catch (error) {

  alert(error.response.data.message)
  
}
    }
    

  return (
    <div className="contain d-flex align-items-start justify-content-start p-3" style={{marginTop:'100px' , width:"100%"}}>


    <div className="row gutters-sm" style={{width:'100vw'}}>
      <div className="col-md-4 d-none d-md-block " >
        <div className="card" >
          <div className="card-body" >
            <nav className="nav flex-column  nav-pills nav-gap-y-1"  >
              <a onClick={() => handleTabClick('profile')} data-toggle="tab" className={`nav-item d-flex align-items-center  nav-link has-icon nav-link-faded ${ activeTab === 'profile' ? 'active' : ''}`}  style={{ backgroundColor: activeTab === 'profile' ? '#401d7e' : 'white' , color: activeTab === 'profile' ? 'white' : '#401d7e'  }}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleTabClick('profile')} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <b className=' ms-2'> Profile Information </b>
              </a>
              <a onClick={() => handleTabClick('account')} className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'account' ? 'active' : ''}`} data-toggle="tab"  style={{ backgroundColor: activeTab === 'account' ? '#401d7e' : 'white' , color: activeTab === 'account' ? 'white' : '#401d7e'  }}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleTabClick('account')} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings mr-2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg><b className=' ms-2'> Account Settings  </b>
              </a>
              <a  onClick={() => handleTabClick('security')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'security' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'security' ? '#401d7e' : 'white' , color: activeTab === 'security' ? 'white' : '#401d7e'  }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><b className=' ms-2'> Security   </b>
              </a>
              <a onClick={() => handleTabClick('notification')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'notification' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'notification' ? '#401d7e' : 'white' , color: activeTab === 'notification' ? 'white' : '#401d7e'  }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell mr-2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg><b className=' ms-2'> Notification   </b>
              </a>
              <a onClick={() => handleTabClick('billing')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'billing' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'billing' ? '#401d7e' : 'white' , color: activeTab === 'billing' ? 'white' : '#401d7e'  }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card mr-2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> <b className=' ms-2'> Billing  </b>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-header border-bottom mb-3 d-flex d-md-none">
            <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
              <li className="nav-item">
                <a href="#profile" data-toggle="tab" className="nav-link has-icon active"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
              </li>
              <li className="nav-item">
                <a href="#account" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
              </li>
              <li className="nav-item">
                <a href="#security" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></a>
              </li>
              <li className="nav-item">
                <a href="#notification" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></a>
              </li>
              <li className="nav-item">
                <a href="#billing" data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></a>
              </li>
            </ul>
          </div>
          <div className="card-body tab-content">
            <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`} id="profile">
              <h6>YOUR PROFILE INFORMATION</h6>
              <hr/>
              <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between' style={{height:'300px'}}>
              <div className='w-100'> 
              <label htmlFor="fullName mb-1">Full Name</label>
                  <input type="text" className="form-control" onChange={(e)=>editFullName(e)} id="fullName" aria-describedby="fullNameHelp" placeholder="Enter your fullname" value={userObj.FullName}/>
              </div>
                  
                 <div className='w-100'>
                 <label htmlFor="email mb-1"> Email </label>
                  <input className="form-control " onChange={(e)=>editEmail(e)} value={userObj.Email} id="email" placeholder="Email" /> 
                 </div>
                 
                
                
                <div className="form-group small text-muted">
                  All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears.
                </div>
                <button type="submit" onClick={changeUserInfo} className="btn" style={{backgroundColor:"#401d7e", color:'white'}}>Update Profile</button>
                <ToastContainer/>
          
              </form>
            </div>
            <div className={`tab-pane  ${activeTab === 'account' ? 'active' : ''}`}id="account">
              <h6>ACCOUNT SETTINGS</h6>
              <hr/>
              <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>
               
           
                <div className="form-group">
                  <label className="d-block text-danger">Delete Account</label>
                  <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <button onClick={(e)=>handleDelete(e)} className="btn btn-danger" type="button">Delete Account</button>
              </form>
            </div>
            <div className={`tab-pane ${activeTab === 'security' ? 'active' : ''}`}id="security">
              <h6>SECURITY SETTINGS</h6>
              <hr/>
              <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between' style={{height:"250px"}}>
               
                  <label className="d-block">Change Password</label>
                  <input onChange={(e)=>setPassword(e.target.value)} type="text" className="form-control mt-1" placeholder="New password"/>
                  <input onChange={(e)=>setConfirmPassword(e.target.value)} type="text" className="form-control mt-1" placeholder="Confirm new password"/>
             
           
             
                 
                  <button className="btn" onClick={changePassword} style={{backgroundColor:"#401d7e", color:'white'}} type="submit"> 
                  Confirm Password Change
                  </button>
                  <p className="small text-muted mt-2">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.</p>
              <ToastContainer/>
              </form>
              <hr/>
            
            </div>
            <div className={`tab-pane ${activeTab === 'notification' ? 'active' : ''}`} id="notification">
              <h6>NOTIFICATION SETTINGS</h6>
              <hr/>
              <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>
              <div className="w-100 mb-0">
                  <label className="d-block mb-1">Notifications</label>
                  <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm"> No current Notifications</div>
                </div>
               
              </form>
            </div>
            <div className={`tab-pane ${activeTab === 'billing' ? 'active' : ''}`} id="billing">
              <h6>BILLING SETTINGS</h6>
              <hr/>
              <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>
                <div className="w-100 mb-2">
                  <label className="d-block mb-0">Payment Method</label>
                  <div className="small text-muted mb-3">You have not added a payment method</div>
                  <button className="btn" type="button" style={{backgroundColor:"#401d7e", color:'white'}}>Add Payment Method</button>
                </div>
                <div className="w-100 mb-0">
                  <label className="d-block mb-1">Payment History</label>
                  <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">You have not made any payment.</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

  )
}

export default Settings