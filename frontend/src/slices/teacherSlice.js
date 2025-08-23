import {createSlice} from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
  name : 'teacher',
  initialState : {
    isLoggedIn : false,
    user : null
  },
  reducers : {
    userStatus : (state,action)=>{
        state.isLoggedIn = action.payload
    },
    setUser : (state,action)=>{
        state.user = action.payload
    }
  }
})

export const {userStatus , setUser} = teacherSlice.actions
export default teacherSlice.reducer