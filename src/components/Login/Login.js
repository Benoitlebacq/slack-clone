import React from "react"
import { LoginContainer, LoginInnerContainer } from "./login.styles"
import { Button } from "@material-ui/core"
import { auth, provider, db } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"

function Login() {
  //const [channels, loading, error] = useCollection(db.collection("rooms"))
  const [users] = useCollection(db.collection("users"))
  //console.log(users?.docs.map((doc) => doc.data()))

  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const idArray = []
        users.docs.map((doc) => idArray.push(doc.data().id))
        if (idArray.includes(result.user.uid)) {
          return null
        } else {
          return db.collection("users").add({
            userName: result.user.displayName,
            themePreference: "white",
            id: result.user.uid,
          })
        }
      })
      .catch((error) => alert(error.message))
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
