import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Message/Message"
import {
  ChatContainer,
  ChatHeaderRight,
  ChatHeaderLeft,
  ChatHeader,
  ChatMessages,
  ChatBottom,
} from "./chat.styles"
import {
  StarBorderOutlined,
  InfoOutlined,
  DeleteForever,
} from "@material-ui/icons"
import { selectRoomId, selectTheme } from "../../features/appSlice"
import ChatInput from "./ChatInput"
import { useDocument, useCollection } from "react-firebase-hooks/firestore"
import { db, auth } from "../../firebase"
import Welcome from "../Welcome/Welcome"
import Swal from "sweetalert2/src/sweetalert2.js"
import { enterRoom } from "../../features/appSlice"
import { useAuthState } from "react-firebase-hooks/auth"

const Chat = () => {
  const [isPopupDark, setIsPopupDark] = useState("default")
  const dispatch = useDispatch()
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId)
  const themeIsDark = useSelector(selectTheme)
  const [user] = useAuthState(auth)
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

  useEffect(() => {
    if (themeIsDark) {
      setIsPopupDark("dark")
    }
    if (!themeIsDark) {
      setIsPopupDark("default")
    }
  }, [themeIsDark])

  const enableSweetAlert2Theme = (theme) => {
    console.log(typeof theme, theme)
    document.head
      .querySelector("#swal2-theme-styles")
      .setAttribute(
        "href",
        `https://cdn.jsdelivr.net/npm/@sweetalert2/theme-${theme}/${theme}.css`
      )
  }

  const toggleAlertWithTheme = async () => {
    await Swal.fire({
      onBeforeOpen: () => enableSweetAlert2Theme(isPopupDark),
      title: `Are you sure you want to Delete the channel #${
        roomDetails?.data().name
      }?`,
      html: "<font color='red'>You won't be able to revert this!</font>",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "#d33",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Check if the user who wants to delete is the same that created the room
        if (roomDetails.data().createdBy === user.uid) {
          // Delete room in Firbase Db
          db.collection("rooms").doc(roomId).delete(roomId)
          // redirect to Welcome by selecting no room
          dispatch(
            enterRoom({
              roomId: null,
            })
          )
          Swal.fire({
            title: "Deleted",
            text: `Channel #${roomDetails?.data().name} has been deleted.`,
            icon: "success",
          })
        } else {
          Swal.fire({
            title: "Cancelled",
            text: `You can't delete channel ${
              roomDetails?.data().name
            }, because you didn't create it.`,
            color: "white",
            icon: "error",
          })
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "You can keep chatting in this channel", "error")
      }
    })
  }

  return (
    <ChatContainer darkTheme={themeIsDark}>
      {roomDetails && roomMessages ? (
        <>
          <ChatHeader darkTheme={themeIsDark}>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data()?.name}</strong>
              </h4>
              <StarBorderOutlined />
              <p>created by {roomDetails?.data()?.creatorName}</p>
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlined
                  onClick={() => alert("TODO : pop up and delete")}
                />{" "}
                <DeleteForever onClick={() => toggleAlertWithTheme()} />
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
            channelName={roomDetails?.data()?.name}
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
