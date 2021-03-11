import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    themeIsDark: false,
    userDisplayName: "",
    userPhotoURL: "",
    userId: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId
    },
    changeTheme: (state, action) => {
      state.themeIsDark = action.payload.themeIsDark
    },
    changeUserDisplayName: (state, action) => {
      state.userDisplayName = action.payload.userDisplayName
    },
    changeUserPhotoURL: (state, action) => {
      state.userPhotoURL = action.payload.userPhotoURL
    },
    changeUserId: (state, action) => {
      state.userId = action.payload.userId
    },
  },
})

export const { enterRoom } = appSlice.actions
export const { changeTheme } = appSlice.actions
export const { changeUserDisplayName } = appSlice.actions
export const { changeUserPhotoURL } = appSlice.actions
export const { changeUserId } = appSlice.actions

export const selectRoomId = (state) => state.app.roomId
export const selectTheme = (state) => state.app.themeIsDark
export const selectUserDisplayName = (state) => state.app.userDisplayName
export const selectUserPhotoURL = (state) => state.app.userPhotoURL
export const selectUserId = (state) => state.app.userId

export default appSlice.reducer
