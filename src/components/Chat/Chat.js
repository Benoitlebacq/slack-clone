import React, { useEffect, useRef } from "react"
import Message from "../Message/Message"
import {
  ChatContainer,
  ChatHeaderRight,
  ChatHeaderLeft,
  ChatHeader,
  ChatMessages,
  ChatBottom,
} from "./chat.styles"
import { StarBorderOutlined, InfoOutlined } from "@material-ui/icons"
import { useSelector } from "react-redux"
import { selectRoomId, selectTheme } from "../../features/appSlice"
import ChatInput from "./ChatInput"
import { useDocument, useCollection } from "react-firebase-hooks/firestore"
import { db } from "../../firebase"
import Welcome from "../Welcome/Welcome"

const Chat = () => {
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId)
  const theme = useSelector(selectTheme)
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  )
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  )

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [roomId, loading])

  return (
    <ChatContainer darkTheme={!theme}>
      {roomDetails && roomMessages ? (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data()
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      ) : (
        <Welcome />
      )}
    </ChatContainer>
  )
}

export default Chat
