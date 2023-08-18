import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

const initialState: any = {
  UserInfo: {},
  SessionUser: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserInfo: (state, action) => {
      state.UserInfo = action.payload
    },
    setSessionUser: (state, action) => {
      state.SessionUser = action.payload
    }
  }
})

export const { setUserInfo, setSessionUser } = userSlice.actions

export const selectUserInfo = (state: RootState) => state.user.UserInfo

export default userSlice.reducer
