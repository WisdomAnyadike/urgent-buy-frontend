import { createSlice } from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';

export const DropSlicer = createSlice({
    name: "isDropping",
    initialState: {
        value: false,
        cartArr: [] 

    },
    reducers: {
        setDropOpen: (state) => {
            state.value = !state.value
        },
        setCartArr: (state, action) => {
            const { _id } = action.payload
            console.log(action.payload);
            const existingObjIndex = state.cartArr.findIndex(obj => _id === obj._id);

            if (existingObjIndex === -1) {
                // If object with id does not exist, push the new object to cartArr
                state.cartArr.push(action.payload);
                toast.success(`${action.payload.productName} added to cart`)
               
            } else {
                // If object with id exists, increment its quantity by 1
                const existingObj = state.cartArr[existingObjIndex];
                state.cartArr[existingObjIndex] = {
                    ...existingObj,
                    quantity: (existingObj.quantity || 0) + 1 // Increment quantity or set to 1 if undefined
                };

                toast.success(`${existingObj.productName} added to cart`)
            }

        }, 
        decreaseQuantity : (state , action) => {
            const { _id } = action.payload
            console.log(action.payload);
            const existingObjIndex = state.cartArr.findIndex(obj => _id === obj._id);

          
               
                const existingObj = state.cartArr[existingObjIndex];
                state.cartArr[existingObjIndex] = {
                    ...existingObj,
                    quantity: (existingObj.quantity  || 1 ) - 1 // decrement quantity or set to 0 if undefined
                };
             
            




        }, 
        removeItem: (state , action)=> {
            const { _id } = action.payload
            console.log(action.payload);
            const existingObjIndex = state.cartArr.findIndex(obj => _id === obj._id);

          
            state.cartArr.splice(existingObjIndex , 1);    
             

        },
        emptyCart : (state) => {
            state.cartArr = []
        }


    }

})

export const { setDropOpen, setCartArr , decreaseQuantity , removeItem , emptyCart } = DropSlicer.actions
export default DropSlicer.reducer