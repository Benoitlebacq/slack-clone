import React, { useState } from "react"
import {
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  HeaderAvatar,
  Headersearch,
} from "./header.styles"
import { useDispatch, useSelector } from "react-redux"
import { changeTheme, selectTheme } from "../../features/appSlice"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const Header = () => {
  const [user] = useAuthState(auth)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const handleChange = () => {
    setIsDarkTheme(!isDarkTheme)
    dispatch(
      changeTheme({
        theme: isDarkTheme,
      })
    )
  }

  return (
    <HeaderContainer darkTheme={!theme}>
      <HeaderLeft>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => auth.signOut()}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <Headersearch darkTheme={!theme}>
        <input placeholder="search" />
        <SearchIcon />
      </Headersearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
      <FormControlLabel
        control={<Switch checked={isDarkTheme} onChange={handleChange} />}
        label="Dark Theme"
      />
    </HeaderContainer>
  )
}

export default Header
