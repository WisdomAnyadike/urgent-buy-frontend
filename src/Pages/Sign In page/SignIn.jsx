import axios from 'axios'
import '/src/Pages/Sign In page/signin.styles.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Userslice, { fetchError, fetchingUser, setUserObj } from '../../Components/Redux/Userslice'






const SignIn = () => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isPassword, setIsText] = useState(true)



	const formik = useFormik({
		initialValues: {
			FullName: '',
			Email: '',
			Password: ''
		}, validationSchema: yup.object({
			FullName: yup.string().min(5, 'Must be at least 5 characters').required('Name is required'),
			Email: yup.string().email('Must be a valid email').required('Email is required'),
			Password: yup.string().matches('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#*])[A-Za-z0-9@#*]{8,}$', 'Must be a strong password').required('Password is required')

		}), onSubmit: async (value) => {
			setIsLoading(true)
			try {
				const res = await axios.post('https://urgent-buy-backend.onrender.com/Api/User/signup', value)
				if (res.data.status == 'success') {
					setIsLoading(false)
					alert(res.data.message)
					const container = document.getElementById('container');
					container.classList.remove("right-panel-active");
				} else {
					setIsLoading(false)
					alert('Unable to create account')
				}
			} catch (error) {
				setIsLoading(false)
				alert(error.response.data.message)
			}


		}

	})



	const formik2 = useFormik({
		initialValues: {
			Email: '',
			Password: ''
		}, validationSchema: yup.object({
			Email: yup.string().email('Must be a valid email').required('Email is required'),
			Password: yup.string().required('Password is required')

		}), onSubmit: async (value) => {
			dispatch(fetchingUser())
			setIsLoading(true)

			try {
				const res = await axios.post('https://urgent-buy-backend.onrender.com/Api/User/login', value)
				if (res.data.status == 'success') {
					setIsLoading(false)
					toast.success(res.data.message)
					dispatch(setUserObj(res.data.findUser))
					localStorage.setItem('urgentBuyToken', res.data.genToken)
					setTimeout(() => {
						navigate('/dashboard')
					}, 5000)

				} else {
					setIsLoading(false)
					toast.error(res.data.message)
				}
			} catch (error) {

				if (error.response.data.status == 'notcreated') {
					setIsLoading(false)
					toast.error(error.response.data.message)
					dispatch(fetchError(error.response.data.message))
					setTimeout(() => {
						const container = document.getElementById('container');
						container.classList.add("right-panel-active");
					}, 5000)

				} else {
					setIsLoading(false)
					toast.error(error.response.data.message)
				}

			}
		}

	})






	const signuserin = () => {
		const container = document.getElementById('container');
		container.classList.remove("right-panel-active");
	}
	const signuserup = () => {
		const container = document.getElementById('container');
		container.classList.add("right-panel-active");
	}






	const userObj = useSelector(state => state.Userslice.userObj)
	console.log(userObj);





	return (


		<div className="container " id="container">
			<div className="form-container sign-up-container">
				<form onSubmit={formik.handleSubmit} action="#">
					<h1 className='customer-text1' style={{ minWidth: "160px" }}>Create Account</h1>

					<span className='mb-3 customer-text1 ' style={{ fontFamily: 'monospace' }}>Already have an account ? Sign in</span>
					<input onBlur={formik.handleBlur} name='FullName' onChange={formik.handleChange} type="text rounded" placeholder="Name" />
					<small className='customer-text1 text-danger d-flex justify-content-start w-100' style={{ minWidth: "160px" }}><small>{formik.touched.FullName && formik.errors.FullName ? formik.errors.FullName : ''}</small></small>
					<input onBlur={formik.handleBlur} name='Email' onChange={formik.handleChange} type="email" placeholder="Email" />
					<small className='customer-text1 text-danger d-flex justify-content-start w-100' style={{ minWidth: "160px" }}><small>{formik.touched.Email && formik.errors.Email ? formik.errors.Email : ''}</small></small>


					<input onBlur={formik.handleBlur} name='Password' onChange={formik.handleChange} type={isPassword ? 'password' : 'text'} placeholder="Password" />

					<small className='customer-text1 text-danger d-flex justify-content-start w-100' style={{ minWidth: "160px" }}><small>{formik.touched.Password && formik.errors.Password ? formik.errors.Password : ''}</small></small>
					<button type='submit' disabled={isLoading} className='rounded mt-4 buttonClass d-flex align-items-center justify-content-center'  style={{ backgroundColor: "#4e04b2", border: '1px solid #4e04b2', minWidth: "150px" , height:"50px" }} >{isLoading ? <div class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div> : 'Sign Up'}</button>


				</form>

			</div>
			<div className="form-container sign-in-container">
				<form onSubmit={formik2.handleSubmit} action="#">
					<h1 className='customer-text1' style={{ minWidth: "160px" }}>Sign in</h1>

					<span className='mb-3 customer-text1' style={{ fontFamily: 'monospace' }} > Dont have an account? Sign up</span>
					<input onBlur={formik2.handleBlur} name='Email' onChange={formik2.handleChange} type="email" placeholder="Email" />
					<small className='customer-text1 text-danger d-flex justify-content-start w-100' style={{ minWidth: "160px" }}><small>{formik2.touched.Email && formik2.errors.Email ? formik2.errors.Email : ''}</small></small>
					<input onBlur={formik2.handleBlur} name='Password' onChange={formik2.handleChange} type="password" placeholder="Password" />
					<small className='customer-text1 text-danger d-flex justify-content-start w-100' style={{ minWidth: "160px" }}><small>{formik2.touched.Password && formik2.errors.Password ? formik2.errors.Password : ''}</small></small>
					<Link style={{ minWidth: "180px" }} className='m-0 p-0 mt-2' to="/adminLogin"> Login as Admin? </Link>
					<Link style={{ minWidth: "180px" }} className='pb-0 mb-0' to="/forgotpassword">Forgot your password?</Link>

					<button type='submit' disabled={isLoading} className='rounded mt-4 buttonClass d-flex align-items-center justify-content-center' style={{ minWidth: "160px" ,height:'50px' }} >{isLoading ? <div class="spinner-border text-light" role="status">
						<span class="visually-hidden">Loading...</span>
					</div> : 'Sign In'}</button>
					<div style={{ zIndex: 90 }}> <ToastContainer
						zIndex={90}
						position='bottom-left'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover /></div>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1 > Welcome Back!</h1>
						<p >To keep connected with us please login with your personal info</p>
						<button className="ghost rounded buttonClass" style={{ minWidth: "150px" }} id="signIn" onClick={signuserin}> Sign In</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p >Enter your personal details and start journey with us</p>
						<button className="ghost rounded buttonClass" style={{ minWidth: "150px" }} id="signUp" onClick={signuserup}>
							Sign Up	 </button>
					</div>
				</div>
			</div>
		</div>





	)
}

export default SignIn