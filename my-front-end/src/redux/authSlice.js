import { createSlice } from "@reduxjs/toolkit"
import produce from "immer"

const authSlice = createSlice({
  name: "auth",
  initialState: { refreshToken: null,isLoggedIn: false },
  reducers: {
    saveRefreshToken: (state, action) => {
        // console.log(action.payload)
      state.refreshToken = action.payload
    },
    returnRefreshToken: (state) => {
        return state.refreshToken
    },
    logIn: (state) => {
        state.isLoggedIn = true
    },
    logOut: (state) => {
        state.isLoggedIn = false
  }
}
})

export const { saveRefreshToken,returnRefreshToken,logIn,logOut } = authSlice.actions

export default authSlice.reducer