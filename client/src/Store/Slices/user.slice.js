import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail: null,
  isLoading:true
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
    }
  },
})

export const {setUserDetail,setIsLoading} = userSlice.actions

export default userSlice.reducer