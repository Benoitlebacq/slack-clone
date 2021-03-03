import React, { useEffect, useRef } from "react"
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
  const darkTheme = useRef(true)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const [users] = useCollection(db.collection("users"))

  // Find User in firebase and set darkTheme value
  useEffect(() => {
    const userArray = []
    users?.forEach((e) =>
      Object.values(e.data()).includes(user.uid)
        ? userArray.push(e.data())
        : null
    )
    darkTheme.current = [...userArray][0]?.isDarkTheme
  }, [user.uid, users])

  const handleChange = () => {
    darkTheme.current = !darkTheme.current

    // Change isDarkTheme bool in firebase database
    const changeIsDarkTheme = (doc, id) => {
      if (doc.data().id === id) {
        return db.collection("users").doc(doc.id).update({
          isDarkTheme: darkTheme.current,
        })
      }
      return
    }
    users.docs.forEach((doc) => changeIsDarkTheme(doc, user.uid))

    dispatch(
      changeTheme({
        theme: !darkTheme.current,
      })
    )
  }

  return (
    <HeaderContainer darkTheme={!theme}>
      <HeaderLeft>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => alert("//TODO : PAGE DE PERSONNALISATION")}
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
          <Switch onChange={handleChange} size="small" checked={!theme} />
        }
        label="Dark Theme"
      />
    </HeaderContainer>
  )
}

export default Header
