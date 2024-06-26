// import {configureStore} from '@reduxjs/toolkit'
// import  DropSlicer  from './Dropdownslice'
// import Userslice from './Userslice'
// import PasswordSlice  from './Changepassslice'



// export const Store = configureStore({
//     reducer: {
//          DropSlicer ,
//          Userslice , 
//          PasswordSlice
         
//         }    
// })


import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import DropSlicer from './Dropdownslice';
import Userslice from './Userslice';
import PasswordSlice from './Changepassslice';
import { combineReducers } from '@reduxjs/toolkit';
import  NotifySlice  from './NotifySlice';
import  LikeSlice  from './Likeslice';
import itemSlice from './itemSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  DropSlicer,
  Userslice,
  PasswordSlice,
  NotifySlice,
  LikeSlice,
  itemSlice,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
