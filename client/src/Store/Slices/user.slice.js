import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail: null,
  isLoading:true,
  userProject:[]
}

export const userSlice = createSlice({
  name: 'user',
  
  initialState,

  reducers: {

    setUserDetail:(state,action)=>{
      state.userDetail=action.payload
    },

    setIsLoading:(state,action)=>{
      state.isLoading=action.payload
    },

    setUserProjects:(state,action)=>{
      state.userProject=action.payload
    }

  }
})

export const {setUserDetail,setIsLoading,setUserProjects} = userSlice.actions

export default userSlice.reducer