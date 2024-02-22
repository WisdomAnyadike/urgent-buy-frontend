import {configureStore} from '@reduxjs/toolkit'
import  DropSlicer  from './Dropdownslice'
import Userslice from './Userslice'
import PasswordSlice  from './Changepassslice'



export const Store = configureStore({
    reducer: {
         DropSlicer ,
         Userslice , 
         PasswordSlice
         
        }    
})


