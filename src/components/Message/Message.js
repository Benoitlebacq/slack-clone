import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectTheme } from "../../features/appSlice"
import { MessageContainer, MessageInfo } from "./message.styles"
import EditIcon from "@material-ui/icons/Edit"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../firebase"
import { Button } from "@material-ui/core"
import { useCollection } from "react-firebase-hooks/firestore"
import CloseIcon from "@material-ui/icons/Close"

const Message = ({
  message,
  timestamp,
  user,
  userImage,
  userId,
  channelId,
}) => {
  const themeIsDark = useSelector(selectTheme)
  const [input, setInput] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [loggedUser] = useAuthState(auth)
  const [rooms] = useCollection(db.collection("rooms"))

  const handleEdit = () => {
    setInput(input)
    setEditMode(!editMode)
  }
  const sendMessage = (e) => {
    e.preventDefault()
    // find the matching message in the database and change it.
    rooms
      .doc(channelId)
      .collection("messages")
      .forEach((docu) => {
        if (docu.data().message === message) {
          db.collection("rooms")
            .doc(channelId)
            .collection("messages")
            .doc(docu.id)
            .update({
              message: input,
            })
          setEditMode(false)
        }
      })
  }

  return (
    <MessageContainer darkTheme={themeIsDark}>
      <img src={userImage} alt={user} />
      <MessageInfo darkTheme={themeIsDark}>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        {!editMode ? (
          <p>{message}</p>
        ) : (
          <form>
            <input
              value={input || message}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <Button hidden type="submit" onClick={sendMessage}>
              SEND
            </Button>
          </form>
        )}
      </MessageInfo>
      {loggedUser.uid === userId && editMode ? (
        <CloseIcon onClick={() => setEditMode(!editMode)} />
      ) : (
        <EditIcon onClick={handleEdit} />
      )}
    </MessageContainer>
  )
}

export default Message
