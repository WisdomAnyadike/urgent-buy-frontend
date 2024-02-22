import { createSlice } from "@reduxjs/toolkit";


export const PasswordSlice = createSlice({
    name:'changepass',
    initialState: {
        canChangePassword: false
    },
    reducers:{
        setCanChangePassword: (state)=> {
            state.canChangePassword = true
        }
    }
})

export const {setCanChangePassword} = PasswordSlice.actions
export default PasswordSlice.reducer