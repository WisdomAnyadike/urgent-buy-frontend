import React, { useEffect } from 'react'
import '/src/Pages/Settings /settings.styles.scss'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserObj } from '../../Components/Redux/Userslice';
import { formatDistanceToNow } from 'date-fns';
import TimeAgo from '../../Components/Time/Timeago';
import Ads from '../../Components/ad/ads';
import Preloader from '../../Components/loader/loader';



const Settings = () => {
  const navigate = useNavigate()
  const userObj = useSelector(state => state.Userslice.userObj)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const token = localStorage.getItem("urgentBuyToken")
  const [isLoading1, setisLoading1] = useState(false)
  const [isLoading2, setisLoading2] = useState(false)
  const [isLoading3, setisLoading3] = useState(false)

  const dispatch = useDispatch()
  const [picture, setPicture] = useState('https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg')

  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const editFullName = (e) => {
    dispatch(setUserObj({ ...userObj, FullName: e.target.value.toLowerCase() }))

  }
  const editEmail = (e) => {
    dispatch(setUserObj({ ...userObj, Email: e.target.value.toLowerCase() }))
  }

  const [userTransactions, setUserTransactions] = useState([]);
  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const res = await axios.get('https://ecommerce-backend-pq9c.onrender.com/Api/Transaction/getUserTransactions', {
          headers: {
            'Authorization': `Bearer ${token}`,
            "content-type": "application/json"
          }
        });

        if (res.data.status === 'okay') {
          console.log(res);
          setUserTransactions(res.data.data);
        } else {
          setUserTransactions([]);
        }
      } catch (error) {
        console.error('Error fetching user transactions:', error);
        setUserTransactions([]);
      }
    };

    fetchUserTransactions();
  }, [token]);



  const editPicture = (e) => {
    let pic
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', (e) => {
      pic = e.target.result
      setPicture(pic.toString())
      dispatch(setUserObj({ ...userObj, Picture: pic }))

    })

    if (file) {
      reader.readAsDataURL(file)
    }



  }



  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#*])[A-Za-z0-9@#*]{8,}$/

  const changePassword = async (event) => {
    setisLoading2(true)

    event.preventDefault()
    console.log('red');

    if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
      setisLoading2(false)
      toast.error('Password must be at least 8 characters , with at least a number & special character')
      
    } else if (password !== confirmPassword || confirmPassword !== password) {
      setisLoading2(false)
      toast.error('Passwords do not match')
      
    }
    else {
      try {
        const res = await axios.post('https://ecommerce-backend-pq9c.onrender.com/Api/User/editPassword', { Password: password }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "content-type": "application/json"
          }
        })
        if (res.data.status === 'okay') {

          toast.success(res.data.message)
          setTimeout(() => {
            setisLoading2(false)
            navigate('/dashboard')
          }, 3000)
        }
      } catch (error) {
        alert(error.response.data.message)
        setisLoading2(false)
      }
    }
  }


  const changeUserInfo = async (event) => {
    setisLoading1(true)
    event.preventDefault()
    console.log('red');

    try {
      const res = await axios.post('https://ecommerce-backend-pq9c.onrender.com/Api/User/editUserInfo', userObj, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if (res.data.status === 'okay') {
        toast.success(res.data.message)

        setTimeout(() => {
          setisLoading1(false)
          navigate('/dashboard')
        }, 3000)



      }
    } catch (error) {
      alert(error.response.data.message)
      setisLoading1(false)
    }

  }

  const handleDelete = async (e) => {
    setisLoading3(true)
    e.preventDefault()
    const verifyDelete = window.confirm("are you sure?");
    if (verifyDelete) {
      try {
        const res = await axios.post('https://ecommerce-backend-pq9c.onrender.com/Api/User/deleteUser', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "content-type": "application/json"
          }
        })

        if (res.data.status === 'okay') {
          alert(res.data.message)
          setisLoading3(false)
          localStorage.removeItem('urgentBuyToken')
          navigate('/signin')

        }

      } catch (error) {
        setisLoading3(false)
        alert(error.response.data.message)

      }
    }

  }


  const notifyArr = useSelector(state => state.NotifySlice.notifyArr)
  console.log(notifyArr);


  return (
    <>
      <Ads />
      <div className="contain d-flex align-items-start justify-content-start p-3 mt-0" style={{ marginTop: '100px', width: "100%" }}>



        <div className="row gutters-sm" style={{ width: '100vw' }}>
          <div className="col-md-4 d-none d-md-block " >
            <div className="card" >
              <div className="card-body" style={{ height: "500px" }} data-aos="fade-zoom-out" >
                <nav className="nav flex-column  nav-pills nav-gap-y-1"  >
                  <a onClick={() => handleTabClick('profile')} data-toggle="tab" className={`nav-item d-flex align-items-center  nav-link has-icon nav-link-faded ${activeTab === 'profile' ? 'active' : ''}`} style={{ backgroundColor: activeTab === 'profile' ? '#000' : 'white', color: activeTab === 'profile' ? 'white' : '#000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <b className=' ms-2'> Profile Information </b>
                  </a>
                  <a onClick={() => handleTabClick('account')} className={`nav-item nav-link has-icon nav-link-faded ${activeTab === 'account' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'account' ? '#000' : 'white', color: activeTab === 'account' ? 'white' : '#000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings mr-2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg><b className=' ms-2'> Account Settings  </b>
                  </a>
                  <a onClick={() => handleTabClick('security')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'security' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'security' ? '#000' : 'white', color: activeTab === 'security' ? 'white' : '#000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><b className=' ms-2'> Security   </b>
                  </a>
                  <a onClick={() => handleTabClick('notification')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'notification' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'notification' ? '#000' : 'white', color: activeTab === 'notification' ? 'white' : '#000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell mr-2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg><b className=' ms-2'> Notification   </b>
                  </a>
                  <a onClick={() => handleTabClick('billing')} className={`nav-item d-flex align-items-center nav-link has-icon nav-link-faded ${activeTab === 'billing' ? 'active' : ''}`} data-toggle="tab" style={{ backgroundColor: activeTab === 'billing' ? '#000' : 'white', color: activeTab === 'billing' ? 'white' : '#000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card mr-2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> <b className=' ms-2'> Payment Status  </b>
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
                    <a onClick={() => handleTabClick('profile')} data-toggle="tab" className="nav-link has-icon active"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => handleTabClick('account')} data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => handleTabClick('security')} data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => handleTabClick('notification')} data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></a>
                  </li>
                  <li className="nav-item">
                    <a onClick={() => handleTabClick('billing')} data-toggle="tab" className="nav-link has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></a>
                  </li>
                </ul>
              </div>
              <div data-aos="fade-zoom-out" className="card-body  tab-content" style={{ height: "500px" }}>
                <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`} id="profile">
                  <h6 className='d-flex align-items-center justify-content-between'>YOUR PROFILE INFORMATION       <img width={'40px'} height={'40px'} className='rounded-circle' src={userObj.Picture || picture} alt="" /> </h6>
                  <hr />
                  <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between' style={{ height: '300px' }}>
                    <div className='w-100 '>
                      <label htmlFor="fullName mb-1">Full Name</label>
                      <input type="text" className="form-control" onChange={(e) => editFullName(e)} id="fullName" aria-describedby="fullNameHelp" placeholder="Enter your fullname" value={userObj.FullName} />
                    </div>

                    <div className='w-100  mt-2'>
                      <label htmlFor="email mb-1"> Email </label>
                      <input className="form-control " onChange={(e) => editEmail(e)} value={userObj.Email} id="email" placeholder="Email" />
                    </div>

                    <div className='w-100  mt-2'>
                      <label htmlFor="picture mb-1"> Image </label>
                      <input className="form-control" type='file' onChange={(e) => editPicture(e)} id="picture" placeholder="Picture" />
                    </div>




                    <div className="form-group small text-muted mt-4">
                      All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears.
                    </div>

                    <button type="submit" disabled={isLoading1} onClick={changeUserInfo} className="btn mt-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#000", color: 'white', width: "100px", height: "37px" }}>
                      {isLoading1 ? <Preloader /> : 'Update Profile'}

                    </button>
                    <ToastContainer />

                  </form>
                </div>
                <div className={`tab-pane  ${activeTab === 'account' ? 'active' : ''}`} id="account">
                  <h6>ACCOUNT SETTINGS</h6>
                  <hr />
                  <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>


                    <div className="form-group">
                      <label className="d-block text-danger">Delete Account</label>
                      <p className="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <button onClick={(e) => handleDelete(e)} disabled={isLoading3} className="btn btn-danger d-flex align-items-center justify-content-center" style={{ width: "100px", height: "37px" }} type="button"> {isLoading3 ? <Preloader /> : 'Delete Account'}</button>
                  </form>
                </div>
                <div className={`tab-pane ${activeTab === 'security' ? 'active' : ''}`} id="security">
                  <h6>SECURITY SETTINGS</h6>
                  <hr />
                  <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between' style={{ height: "250px" }}>

                    <label className="d-block">Change Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" className="form-control mt-1" placeholder="New password" />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="text" className="form-control mt-1" placeholder="Confirm new password" />




                    <button className="btn d-flex align-items-center justify-content-center" disabled={isLoading2} onClick={changePassword} style={{ backgroundColor: "#000", color: 'white', width: "160px", height: "37px" }} type="submit">
                      {isLoading2 ? <Preloader /> : 'Confirm Password Change'}
                    </button>
                    <p className="small text-muted mt-2">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.</p>
                    <ToastContainer />
                  </form>
                  <hr />

                </div>
                <div className={`tab-pane ${activeTab === 'notification' ? 'active' : ''}`} id="notification">
                  <h6>NOTIFICATION SETTINGS</h6>
                  <hr />
                  <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>
                    <div className="w-100 mb-0">
                      <label className="d-block mb-1">Notifications</label>
                      <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm"> {notifyArr.length === 0 ? <small> No current Notifications  </small> : <div className='w-100 bg-light ' style={{ overflowY: 'scroll', maxHeight: '300px' }}> {notifyArr.map(({ message, time }) =>
                        <li className='w-100 border  d-flex align-items-center justify-content-between mb-2 p-1'> <small className='me-1'> {message.includes(userObj.FullName) ? message.replace(userObj.FullName, 'You') : message}</small>  <small className='d-flex justify-content-end align-items-center' style={{ width: "35%" }}>{<TimeAgo timestamp={time} />} </small> </li>

                      )}</div>} </div>
                    </div>

                  </form>
                </div>
                <div className={`tab-pane ${activeTab === 'billing' ? 'active' : ''}`} id="billing">
                  <h6> Check Payment Status</h6>
                  <hr />
                  <form className='d-flex flex-column align-items-start text-start p-1  justify-content-between'>
                    <div className="w-100 mb-2">
                      <label className="d-block mb-0">Payment Method</label>
                      <div className="small text-muted mb-3">You have not added a payment method</div>
                      <button className="btn" type="button" style={{ backgroundColor: "#000", color: 'white' }}>Add Payment Method</button>
                    </div>
                    <div className="w-100 mb-0">
                      <label className="d-block mb-1">Payment History</label>
                      <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm"> {userTransactions.length === 0 ? <div className="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">You have not made any payment.</div> : <div className='w-100 bg-light ' style={{ overflowY: 'scroll', maxHeight: '300px' }}> {userTransactions.map(({ transactionReference,transactionAmount , createdAt, transactionStatus }) =>
                        <li className='w-100 border  d-flex align-items-center justify-content-between mb-2 p-1'> <span className={transactionStatus === 'failed' ? 'text-danger me-1' : 'text-success me-1'}> ${transactionAmount} Reference no: {transactionReference} Status:({transactionStatus})</span>  <small className='d-flex justify-content-end align-items-center' style={{ width: "35%" }}>{<TimeAgo timestamp={createdAt} />} </small> </li>

                      )}</div>} </div>




                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings