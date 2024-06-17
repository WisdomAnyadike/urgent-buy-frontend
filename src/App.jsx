import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopPage from './Pages/Shop page/ShopPage'
import Home from './Pages/Home /Home'
import DirectoryPage from './Components/Directory Page/DirectoryPage'
import SignIn from './Pages/Sign In page/SignIn'
import Shop from './Pages/Shop/Shop'
import Dashboard from './Pages/Dashboard/Dashboard'
import Checkout from './Pages/Checkout/Checkout'
import Settings from './Pages/Settings /Settings'
import Forgotpassword from './Pages/ForgotPassword/Forgotpassword'
import Changepassword from './Pages/ChangePassword/Changepassword'
import Adminpage from './Pages/Admin/Adminpage'
import AdminLogin from './Pages/Admin/AdminLogin'
import Error from './Components/404/error'
import ProductShowcase from './Pages/seemore/seemore'

const App = () => {
  return (

    <Routes>
    <Route path='/' element={<Home/>}>

    <Route index element={<DirectoryPage/>}/> 
    <Route path='/category/:category' element={<ShopPage/>}/> 
    <Route path='/signin' element={<SignIn/>}/> 
    <Route path='/dashboard' element={<Dashboard/>}/> 
    <Route path='/shop' element={<Shop/>}/> 
    <Route path='/checkout' element={<Checkout/>}/> 
    <Route path='/settings' element={<Settings/>}/> 
    <Route path='/item' element={<ProductShowcase/>}/> 
   </Route>
   <Route  path='*' element={<Error/>} />
   <Route path='/forgotpassword' element={<Forgotpassword/>}/> 
   <Route path='/changepassword' element={<Changepassword/>}/>
   <Route  path='/admin' element={<Adminpage/>} />
   <Route  path='/adminLogin' element={<AdminLogin/>} />
    </Routes>
  )
}

export default App