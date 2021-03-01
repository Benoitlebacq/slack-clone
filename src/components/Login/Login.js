import React from "react"
import { LoginContainer, LoginInnerContainer } from "./login.styles"
import { Button } from "@material-ui/core"
import { auth, provider } from "../../firebase"

function Login() {
  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider).catch((err) => alert(err.message))
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt=""
        />
        <h1>Sign In</h1>
        <p>slack-clone</p>
        <Button onClick={signIn}>Sign In With Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login
