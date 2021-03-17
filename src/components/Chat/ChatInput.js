import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { db } from "../../firebase"
import { ChatInputContainer } from "./chat.styles"
import firebase from "firebase"
import { useSelector } from "react-redux"
import {
  selectTheme,
  selectUserPhotoURL,
  selectUserDisplayName,
  selectUserId,
} from "../../features/appSlice"

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState(null)
  const themeIsDark = useSelector(selectTheme)
  const userPhotoURL = useSelector(selectUserPhotoURL)
  const userDisplayName = useSelector(selectUserDisplayName)
  const userId = useSelector(selectUserId)

  const sendMessage = (e) => {
    e.preventDefault()

    if (!channelId) {
      return false
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: userDisplayName,
      userImage: userPhotoURL,
      userId: userId,
    })

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    })

    setInput("")
  }
  return (
    <ChatInputContainer darkTheme={themeIsDark}>
      <form>
        <input
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Send a Message to #${channelName}`}
          autoFocus
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput
