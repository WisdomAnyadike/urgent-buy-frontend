import { createSlice } from "@reduxjs/toolkit";

 export const LikeSlice = createSlice({
    name:'like',
    initialState:{
        isLiked : false
    } ,
    reducers:{
        setIsLiked: (state , action)=> {
            const element = action.payload
            if (element.classList.contains('likebutton')) {
                element.classList.remove('likebutton') 
              }else{
                element.classList.add('likebutton')
              }
        }
    }
 })

 export const {setIsLiked} = LikeSlice.actions
 export default LikeSlice.reducer