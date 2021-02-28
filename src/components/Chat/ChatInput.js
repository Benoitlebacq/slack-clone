import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { db } from "../../firebase"
import { ChatInputContainer } from "./chat.styles"
import firebase from "firebase"

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState(null)

  const sendMessage = (e) => {
    e.preventDefault()

    if (!channelId) {
      return false
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Benoit Lebacq",
      userImage: "../../images/webexpho.jpg",
    })

    setInput("")
  }
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput
