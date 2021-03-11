import React, { useState } from "react"
import { Edit } from "@material-ui/icons"
import { storage, db, auth } from "../firebase"
import { Button, Modal } from "@material-ui/core"
import {
  ModalContainer,
  ModalHeader,
  ModalInputsContainer,
  GridContainer,
  UploadContainer,
} from "./UpdateUserInfos.styles"
import { Input } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { useDispatch, useSelector } from "react-redux"
import {
  selectTheme,
  selectUserDisplayName,
  selectUserPhotoURL,
  selectUserId,
  changeUserDisplayName,
  changeUserPhotoURL,
  changeUserId,
} from "../features/appSlice"
import { useCollection } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const UpdateUserInfos = () => {
  const userDisplayName = useSelector(selectUserDisplayName)
  const userPhotoURL = useSelector(selectUserPhotoURL)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progressBar, setProgressBar] = useState(0)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [open, setOpen] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [users] = useCollection(db.collection("users"))
  const [user] = useAuthState(auth)

  const themeIsDark = useSelector(selectTheme)

  // This Function Finds user and Changes Display Namein firebase database
  const changeUserDisplayNameFunction = (doc, id, displayName) => {
    if (doc.data().id === id) {
      return (
        db.collection("users").doc(doc.id).update({
          userName: displayName,
        }),
        setTextInput(""),
        dispatch(
          changeUserDisplayName({
            userDisplayName: displayName,
          })
        )
      )
    }
    return
  }

  // This Function Finds user and Changes PhotoUrl firebase database
  const changeUserPhotoURLFonction = (doc, id, url) => {
    if (doc.data().id === id) {
      return (
        db.collection("users").doc(doc.id).update({
          photoURL: url,
        }),
        setTextInput("")
      )
    }
    return
  }

  const submitDisplayName = (e) => {
    e.preventDefault()
    users.docs.forEach((doc) =>
      changeUserDisplayNameFunction(doc, user.uid, textInput)
    )
  }

  const submitPhotoURL = (url) => {
    users.docs.forEach((doc) => changeUserPhotoURLFonction(doc, userId, url))
    dispatch(
      changeUserPhotoURL({
        userPhotoURL: url,
      })
    )
  }

  const handleChangeInputFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file["type"]
      const validImageType = ["image/gif", "image/jpeg", "image/png"]
      if (validImageType.includes(fileType)) {
        setError("")
        setImage(file)
      }
    } else {
      setError("Please select an image to upload")
    }
  }

  const handleUploadFile = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)

      uploadTask.on(
        "state.changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransfered / snapshot.totalBytes) * 100
          )
          setProgressBar(progress)
        },
        (error) => {
          setError(error)
        },
        () =>
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url)
              submitPhotoURL(url)
              setProgressBar(0)
              setSuccess("Your Profil Picture has been successfully uploaded")
            })
      )
    } else {
      setError("Please chosse an image to upload")
    }
  }

  return (
    <>
      <Edit onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          height: 350,
          width: "40%",
          backgroundColor: "white",
          marginTop: "20vh",
          marginLeft: "35%",
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <h3>Change user informations</h3>
            <hr />
          </ModalHeader>
          <ModalInputsContainer>
            <GridContainer>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="User Name"
                    value={textInput || ""}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </Grid>
              </Grid>
            </GridContainer>
            <GridContainer>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: themeIsDark ? "#323232" : "#3f0f40",
                    color: "white",
                  }}
                  onClick={(e) => submitDisplayName(e)}
                >
                  ok
                </Button>
              </Grid>
            </GridContainer>
            <UploadContainer>
              <p style={{ color: "crimson", fontSize: "1rem" }}>{error}</p>
              <p style={{ color: "blue", fontSize: "1rem" }}>{success}</p>
              <Input type="file" onChange={handleChangeInputFile} />
              <Button
                style={{
                  backgroundColor: themeIsDark ? "#323232" : "#3f0f40",
                  color: "white",
                }}
                onClick={handleUploadFile}
              >
                ok
              </Button>
              {progressBar > 0 && <progress value={progressBar} max="100" />}
            </UploadContainer>
          </ModalInputsContainer>
        </ModalContainer>
      </Modal>
    </>
  )
}

export default UpdateUserInfos
