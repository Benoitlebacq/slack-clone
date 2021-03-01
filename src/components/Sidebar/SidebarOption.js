import React from "react"
import { SidebarOptionContainer, SidebarOptionChannel } from "./Sidebar.styles"
import { db } from "../../firebase"
import { enterRoom, selectTheme } from "../../features/appSlice"
import { useDispatch, useSelector } from "react-redux"

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()
  const addChannel = () => {
    const channelName = prompt("Please enter en channel name")

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      })
    }
  }
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      )
    }
  }

  return (
    <SidebarOptionContainer
      darkTheme={!theme}
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  )
}

export default SidebarOption
