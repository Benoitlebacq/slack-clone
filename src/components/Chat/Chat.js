import React, { useEffect, useRef } from "react"
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
import { db } from "../../firebase"
import Welcome from "../Welcome/Welcome"
import Swal from "sweetalert2"
import { enterRoom } from "../../features/appSlice"

const Chat = () => {
  const dispatch = useDispatch()
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

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  })

  return (
    <ChatContainer darkTheme={!theme}>
      {roomDetails && roomMessages ? (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data()?.name}</strong>
              </h4>
              <StarBorderOutlined />
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlined
                  onClick={() => alert("TODO : pop up and delete")}
                />{" "}
                <DeleteForever
                  onClick={() =>
                    swalWithBootstrapButtons
                      .fire({
                        title: `Are you sure you want to Delete the channel #${
                          roomDetails?.data().name
                        }?`,
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true,
                      })
                      .then((result) => {
                        if (result.isConfirmed) {
                          // Delete room in Firbase Db
                          db.collection("rooms").doc(roomId).delete(roomId)
                          // redirect to Welcome by selecting no room
                          dispatch(
                            enterRoom({
                              roomId: null,
                            })
                          )
                          swalWithBootstrapButtons.fire(
                            "Deleted!",
                            `Channel #${
                              roomDetails?.data().name
                            } has been deleted.`,
                            "success"
                          )
                        } else if (
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          swalWithBootstrapButtons.fire(
                            "Cancelled",
                            "You can keep chatting in this channel",
                            "error"
                          )
                        }
                      })
                  }
                />
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
