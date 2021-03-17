import React from "react"
import { useSelector } from "react-redux"
import { selectTheme } from "../../features/appSlice"
import { MessageContainer, MessageInfo } from "./message.styles"
import EditIcon from "@material-ui/icons/Edit"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"

const Message = ({ message, timestamp, user, userImage, userId }) => {
  const themeIsDark = useSelector(selectTheme)

  const [loggedUser] = useAuthState(auth)

  const handleEdit = (message) => {
    console.log("edit", message)
  }

  return (
    <MessageContainer darkTheme={themeIsDark}>
      <img src={userImage} alt={user} />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
      {loggedUser.uid === userId && (
        <EditIcon onClick={() => handleEdit(message)} />
      )}
    </MessageContainer>
  )
}

export default Message
