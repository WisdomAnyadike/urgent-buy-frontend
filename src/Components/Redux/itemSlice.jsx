import { createSlice } from "@reduxjs/toolkit";


export const itemSlice = createSlice({
    name: "isAdded",
    initialState: {
        cartObj: {}

    },
    reducers: {
        setitemObj: (state, action) => {
          state.cartObj = action.payload
        },
    }

})

export const { setitemObj } = itemSlice.actions
export default itemSlice.reducer