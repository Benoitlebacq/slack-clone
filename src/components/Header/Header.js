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
import { auth, db } from "../../firebase"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { useCollection } from "react-firebase-hooks/firestore"

const Header = () => {
  const [user] = useAuthState(auth)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const [users] = useCollection(db.collection("users"))

  const handleChange = () => {
    // console.log("userID avant forEach ::: ", user.uid)
    users.forEach((e) =>
      e.data().id === user.uid ? console.log("oui") : console.log("non")
    )
    // users.docs.map((doc) => console.log(doc.data()))
    // console.log(
    //   "COLLECTION ::::: ",
    //   db.collection("users").doc("FSfxUKBdPkYB0Vo7v8wl").update()
    // )
    // .map((doc) => console.log(doc))

    setIsDarkTheme(!isDarkTheme)
    dispatch(
      changeTheme({
        theme: isDarkTheme,
      })
    )
  }

  //console.log(users?.docs.map((doc) => doc.data()))

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
        control={
          <Switch
            checked={isDarkTheme}
            onChange={handleChange}
            size="small"
            color="white"
          />
        }
        label="Dark Theme"
      />
    </HeaderContainer>
  )
}

export default Header
