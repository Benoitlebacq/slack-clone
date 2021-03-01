import React from "react"
import {
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  HeaderAvatar,
  Headersearch,
} from "./header.styles"

import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"

const Header = () => {
  const [user] = useAuthState(auth)

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => auth.signOut()}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <Headersearch>
        <input placeholder="search" />
        <SearchIcon />
      </Headersearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header
