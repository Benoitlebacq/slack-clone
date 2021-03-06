import React, { useState } from "react"
import Expand from "react-expand-animated"
import { SidebarContainer, SidebarHeader, SidebarInfo } from "./Sidebar.styles"
import SidebarOption from "./SidebarOption"
import {
  FiberManualRecord,
  InsertComment,
  Inbox,
  Drafts,
  BookmarkBorder,
  Apps,
  FileCopy,
  ExpandLess,
  ExpandMore,
  Add,
} from "@material-ui/icons"
import { db } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { useSelector } from "react-redux"
import { selectTheme, selectUserDisplayName } from "../../features/appSlice"
import UpdateUserInfos from "../../Utils/UpdateUserInfos"

const Sidebar = () => {
  const userDisplayName = useSelector(selectUserDisplayName)
  const [channels] = useCollection(
    db.collection("rooms").orderBy("name", "asc")
  )
  const themeIsDark = useSelector(selectTheme)
  const [isAppsExpanded, setIsAppsExpanded] = useState(true)
  const [isChannelsExpanded, setIsChannelsExpanded] = useState(true)
  const [expandShow, setExpandShow] = useState({
    Icon: ExpandLess,
    tilte: "Show Less",
  })
  const [expandChannelsIcon, setExpandChannelsIcon] = useState(ExpandMore)

  const expandApps = () => {
    setIsAppsExpanded(!isAppsExpanded)
    isAppsExpanded
      ? setExpandShow({ Icon: ExpandMore, title: "Show More" })
      : setExpandShow({ Icon: ExpandLess, title: "Show Less" })
  }

  const expandChannels = () => {
    setIsChannelsExpanded(!isChannelsExpanded)
    isChannelsExpanded
      ? setExpandChannelsIcon(ExpandLess)
      : setExpandChannelsIcon(ExpandMore)
  }

  return (
    <SidebarContainer darkTheme={themeIsDark}>
      <SidebarHeader darkTheme={themeIsDark}>
        <SidebarInfo darkTheme={themeIsDark}>
          <h2>Slack</h2>
          <h3>
            <FiberManualRecord />
            {userDisplayName}
          </h3>
        </SidebarInfo>
        <UpdateUserInfos />
      </SidebarHeader>
      <Expand open={isAppsExpanded}>
        <SidebarOption Icon={InsertComment} title="Threads" />
        <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
        <SidebarOption Icon={Drafts} title="Saved Items" />
        <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
        <SidebarOption Icon={Apps} title="Apps" />
        <SidebarOption Icon={FileCopy} title="File Browser" />
      </Expand>
      <SidebarOption
        Icon={expandShow.Icon}
        title={expandShow.title || "Show Less"}
        expandApps={expandApps}
      />
      <hr />
      <SidebarOption
        Icon={expandChannelsIcon}
        title="Channels"
        expandChannels={expandChannels}
      />
      <Expand open={isChannelsExpanded}>
        <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
        {channels?.docs.map((doc) => (
          <SidebarOption
            title={doc.data().name}
            key={doc.id}
            id={doc.id}
            usersAllowed={doc.data().usersAllowed}
          />
        ))}
      </Expand>
    </SidebarContainer>
  )
}

export default Sidebar
