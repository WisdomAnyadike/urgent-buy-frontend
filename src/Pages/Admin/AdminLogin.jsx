import React from 'react'
import '/src/Pages/Admin/adminLogin.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { admitAdmin } from '../../../services/admin'

const AdminLogin = () => {

  const [EMAIL, setEmail] = useState('')
  const [PASSWORD, setPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const AdminObject = {
      EMAIL,
      PASSWORD
    }
    const result = await admitAdmin(AdminObject);
    if (result && result.message) {
      alert(result.message);
    } else {
      alert('An unknown error occurred.');
    }
    if (result && result.status === 'success') {
      navigate('/admin');
    }
  }
 

  return (
    <div >
      <section class="h-100 gradient-form " style={{ backgroundColor: '#eee' }}>
        <div class=" py-5 h-100">
          <div className=''>
            <div class="w-100 d-flex align-items-center justify-content-center">
              <div class="card rounded-3 text-black w-75">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4 ">

                      <div class="text-center">
                      

                      </div>

                      <form>


                        <div class="mb-4 flex-column d-flex align-items-start ">
                          <label class="ms-1" for="form2Example11"> <i>Email Address </i> </label>
                          <input onChange={(e) => setEmail(e.target.value)} type="email" id="form2Example11" class="form-control"
                            placeholder="enter email address" />

                        </div>

                        <div class="mb-4 flex-column d-flex align-items-start ">
                          <label class="ms-1" for="form2Example11"> <i> Password </i></label>
                          <input onChange={(e) => setPassword(e.target.value)} type="email" id="form2Example11" class="form-control"
                            placeholder="enter password" />

                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button onClick={(e) => handleSubmit(e)} class="btn btn-block fa-lg gradient-custom-2 mb-3 text-light" type="button">
                            Log
                            in</button>

                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Forgot password?</p>
                          <button type="button" class="btn btn-outline-danger">Create new</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 class="mb-4">We are more than just a company</h4>
                      <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin