import React from "react"
import { LoginContainer, LoginInnerContainer } from "./login.styles"
import { Button } from "@material-ui/core"
import { auth, provider, db } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { useDispatch } from "react-redux"
import {
  changeUserPhotoURL,
  changeUserDisplayName,
  changeUserId,
} from "../../features/appSlice"

function Login() {
  const [users] = useCollection(db.collection("users"))
  const dispatch = useDispatch()

  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const usersArray = []
        const user = []
        users.docs.map((doc) => usersArray.push(doc.data()))
        const userAlreadyExists = usersArray.map((userInArray, i) => {
          if (usersArray[i].id === result.user.uid) {
            user.push(usersArray[i])
            return true
          } else return false
        })
        if (userAlreadyExists.indexOf(true) !== -1) {
          console.log(" ----  ::::::::::", user[0])
          return (
            dispatch(
              changeUserDisplayName({
                userDisplayName: user[0].userName,
              })
            ),
            dispatch(
              changeUserPhotoURL({
                userPhotoURL: user[0].photoURL,
              })
            ),
            dispatch(
              changeUserId({
                userId: user[0].id,
              })
            )
          )
        } else {
          return (
            db.collection("users").add({
              userName: result.user.displayName,
              isDarkTheme: false,
              id: result.user.uid,
              photoURL: result.user.photoURL,
            }),
            dispatch(
              changeUserDisplayName({
                userDisplayName: result.user.displayName,
              })
            ),
            dispatch(
              changeUserPhotoURL({
                userPhotoURL: result.user.photoURL,
              })
            ),
            dispatch(
              changeUserId({
                userId: result.user.uid,
              })
            )
          )
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
