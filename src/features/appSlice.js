import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    themeIsDark: false,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId
    },
    changeTheme: (state, action) => {
      state.themeIsDark = action.payload.themeIsDark
    },
  },
})

export const { enterRoom } = appSlice.actions
export const { changeTheme } = appSlice.actions

export const selectRoomId = (state) => state.app.roomId
export const selectTheme = (state) => state.app.themeIsDark

export default appSlice.reducer
