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
import { useCollection } from "react-firebase-hooks/firestore"

const SidebarOption = ({
  Icon,
  title,
  addChannelOption,
  channelPassword,
  id,
  expandApps,
  expandChannels,
  usersAllowed,
}) => {
  const [channels] = useCollection(db.collection("rooms"))
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

  const capitalizeFirstLetter = (str) => {
    if (!str) {
      return ""
    }
    str = str.split(" ")
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1)
    }
    return str.join(" ")
  }

  const enableSweetAlert2Theme = (theme) => {
    document.head
      .querySelector("#swal2-theme-styles")
      .setAttribute(
        "href",
        `https://cdn.jsdelivr.net/npm/@sweetalert2/theme-${theme}/${theme}.css`
      )
  }

  const addChannelPopupWithTheme = async () => {
    const { value: formValues } = await Swal.fire({
      willOpen: () => enableSweetAlert2Theme(isPopupDark),
      title: "Enter Channel Name",
      html:
        '<input id="swal-input2" class="swal2-input">' +
        "<div>Create Private Channel ?</div>" +
        '<input type="checkbox" id="swal-input1" class="swal2-checkbox" >',
      focusConfirm: false,
      allowEnterKey: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").checked,
          document.getElementById("swal-input2").value,
        ]
      },
    })
    const nameField = capitalizeFirstLetter(formValues?.[1])
    if (!formValues?.[0] && formValues?.[1] !== "") {
      channels.docs.forEach((doc) => {
        if (doc.data().name === formValues?.[1]) {
          Swal.fire({
            title: `This Channel name already exists`,
            icon: "error",
            allowOutsideClick: false,
          })
          return
        }
      })
      if (nameField !== "") {
        db.collection("rooms").add({
          name: nameField,
          createdBy: user?.uid,
          creatorName: user?.displayName,
          usersAllowed: ["all"],
        })
      }
      return
    } else if (formValues[0] && formValues[1] !== "") {
      db.collection("rooms").add({
        name: capitalizeFirstLetter(formValues[1]),
        createdBy: user?.uid,
        creatorName: user?.displayName,
        isPrivate: true,
        usersAllowed: [user?.uid],
      })
    } else if (formValues[1] === "") {
      Swal.fire({
        title: `You must enter a Channel name`,
        icon: "error",
        allowOutsideClick: () => !Swal.isLoading(),
      })
    }
  }

  const selectChannel = () => {
    {
      console.log(usersAllowed)
    }
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

  const renderChannels = () => {
    if (expandApps) {
      return (
        <>
          <Icon fontSize="small" style={{ padding: 10 }} onClick={expandApps} />
          <h3>{title}</h3>
        </>
      )
    } else if (expandChannels) {
      return (
        <>
          <Icon
            fontSize="small"
            style={{ padding: 10 }}
            onClick={expandChannels}
          />
          <h3>{title}</h3>
        </>
      )
    } else if (Icon) {
      return (
        <>
          <Icon fontSize="small" style={{ padding: 10 }} />
          <h3>{title}</h3>
        </>
      )
    } else {
      if (usersAllowed[0] === "all") {
        return (
          <SidebarOptionChannel>
            <Hashtag>#</Hashtag> {title}
          </SidebarOptionChannel>
        )
      }
      if (usersAllowed.includes(user.uid)) {
        return (
          <SidebarOptionChannel>
            <LockOutlinedIcon /> {title}
          </SidebarOptionChannel>
        )
      }
    }
  }

  return (
    <SidebarOptionContainer
      darkTheme={themeIsDark}
      onClick={addChannelOption ? addChannelPopupWithTheme : selectChannel}
    >
      {renderChannels()}
    </SidebarOptionContainer>
  )
}

export default SidebarOption
