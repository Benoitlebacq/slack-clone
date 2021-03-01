import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    theme: "light",
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId
    },
    changeTheme: (state, action) => {
      state.theme = action.payload.theme
    },
  },
})

export const { enterRoom } = appSlice.actions
export const { changeTheme } = appSlice.actions

export const selectRoomId = (state) => state.app.roomId
export const selectTheme = (state) => state.app.theme

export default appSlice.reducer
