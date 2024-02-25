import { createSlice } from "@reduxjs/toolkit";

export const NotifySlice = createSlice({
    name:'notification' , 
    initialState: {
        notifyArr : []
    } , 
    reducers: {
        setNotifyArr : (state , action) => {
            
               

            state.notifyArr.unshift(action.payload)
        } , 
        setNotifyArrEmpty: (state ) => {
            state.notifyArr = []

        }
    }
})


export const { setNotifyArr , setNotifyArrEmpty } = NotifySlice.actions
export default NotifySlice.reducer