import { createSlice } from "@reduxjs/toolkit";

export  const Userslice = createSlice({
    name: 'user', 
    initialState: {
        isFetching: false,
        userObj : {} , 
        fetchingError : null
    } , 
    reducers: { 
        fetchingUser: (state)=> {
           state.isFetching = true
            state.userObj = {}  
           state.fetchingError = null
        },
        setUserObj : (state , action) => {
            state.isFetching = false
            state.userObj =  action.payload
            state.fetchingError = null
        }, 
        fetchError: (state , action)=> {
            state.isFetching = false
            state.userObj =  {}
            state.fetchingError = action.payload
        }

    }
})

export const { fetchingUser , setUserObj , fetchError} = Userslice.actions
export default Userslice.reducer