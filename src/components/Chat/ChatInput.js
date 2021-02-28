import { Button } from "@material-ui/core"
import React, { useState } from "react"
import { db } from "../../firebase"
import { ChatInputContainer } from "./chat.styles"
import firebase from "firebase"

const ChatInput = ({ channelName, channelId, chatRef }) => {
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
      userImage:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGpzfGIttQMVA/profile-displayphoto-shrink_400_400/0/1551554395821?e=1620259200&v=beta&t=JxChshAzAYH0RQ9c1t-4XFN9Zp2nPIcNpagmZxToXs8",
    })

    chatRef.current.scrollIntoView({
      behavior: "smooth",
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
