import React, { useState, useEffect } from "react"
import {
  SidebarOptionContainer,
  SidebarOptionChannel,
  Hashtag,
} from "./Sidebar.styles"
import { auth, db } from "../../firebase"
import { enterRoom, selectTheme } from "../../features/appSlice"
import { useDispatch, useSelector } from "react-redux"
import { useAuthState } from "react-firebase-hooks/auth"
import Swal from "sweetalert2/src/sweetalert2.js"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  isPrivate,
  channelPassword,
  id,
  expandApps,
  expandChannels,
}) => {
  const [user] = useAuthState(auth)
  const themeIsDark = useSelector(selectTheme)
  const dispatch = useDispatch()
  const [isPopupDark, setIsPopupDark] = useState("default")

  useEffect(() => {
    if (themeIsDark) {
      setIsPopupDark("dark")
    }
    if (!themeIsDark) {
      setIsPopupDark("default")
    }
  }, [themeIsDark])

  const enableSweetAlert2Theme = (theme) => {
    document.head
      .querySelector("#swal2-theme-styles")
      .setAttribute(
        "href",
        `https://cdn.jsdelivr.net/npm/@sweetalert2/theme-${theme}/${theme}.css`
      )
  }

  const addChannelPopupWithTheme = async (isPrivate) => {
    isPrivate
      ? await Swal.mixin({
          willOpen: () => enableSweetAlert2Theme(isPopupDark),
          confirmButtonText: "Next &rarr;",
          showCancelButton: true,
          progressSteps: ["1", "2", "3"],
        })
          .queue([
            { input: "text", title: "Enter the Private Channel Name" },
            { input: "password", title: "Enter the password" },
            { input: "password", title: "Enter the password again" },
          ])
          .then((result) => {
            if (result.dismiss === "cancel") {
              return
            }
            if (result.value[1] === result.value[2] && result.value[0] !== "") {
              db.collection("rooms").add({
                name: result.value[0],
                createdBy: user?.uid,
                creatorName: user?.displayName,
                channelPassword: result.value[1],
              })
              Swal.fire({
                title: `The Private Channel "#${result.value[0]}" has been created`,
                confirmButtonText: "Done!",
                allowOutsideClick: () => !Swal.isLoading(),
              })
            } else if (!result.value[0]) {
              console.log("NOM DE CHANNEL VIDE")
            }
          })
      : await Swal.fire({
          willOpen: () => enableSweetAlert2Theme(isPopupDark),
          title: "Please enter en channel name",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: "Confirm",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancel",
          cancelButtonColor: "#d33",
          preConfirm: (channelName) => {
            if (channelName) {
              db.collection("rooms").add({
                name: channelName,
                createdBy: user?.uid,
                creatorName: user?.displayName,
              })
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        })
  }

  const selectChannel = () => {
    if (channelPassword && id) {
      const enteredPassword = prompt("enter the room password")
      enteredPassword === channelPassword
        ? dispatch(
            enterRoom({
              roomId: id,
            })
          )
        : dispatch(
            enterRoom({
              roomId: null,
            })
          )
    }
    if (!channelPassword && id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      )
    }
  }

  return (
    <SidebarOptionContainer
      darkTheme={themeIsDark}
      onClick={
        addChannelOption
          ? () => addChannelPopupWithTheme(isPrivate)
          : selectChannel
      }
    >
      {expandApps ? (
        <Icon fontSize="small" style={{ padding: 10 }} onClick={expandApps} />
      ) : expandChannels ? (
        <Icon
          fontSize="small"
          style={{ padding: 10 }}
          onClick={expandChannels}
        />
      ) : (
        Icon && <Icon fontSize="small" style={{ padding: 10 }} />
      )}
      {Icon ? (
        <h3>{title}</h3>
      ) : channelPassword ? (
        <SidebarOptionChannel>
          <span>
            <LockOutlinedIcon fontSize="small" />
          </span>
          {title}
        </SidebarOptionChannel>
      ) : (
        <SidebarOptionChannel>
          <Hashtag>#</Hashtag> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  )
}

export default SidebarOption
