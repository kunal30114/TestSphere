import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name : 'user',
  initialState : {},
  reducers : {
    setLogin : (state)=>{
        state.isLoggedIn = true
    },
    setLogOut : (state)=>{
        state.isLoggedIn = false
    },
    setUser : (state,action)=>{
        state.user = action.payload
    }
  }
})

export const {setLogin , setLogOut , setUser} = userSlice.actions
export default userSlice.reducer