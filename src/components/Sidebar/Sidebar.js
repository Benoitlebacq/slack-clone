import React from "react"
import { SidebarContainer, SidebarHeader, SidebarInfo } from "./Sidebar.styles"
import SidebarOption from "./SidebarOption"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import CreateIcon from "@material-ui/icons/Create"
import InsertCommentIcon from "@material-ui/icons/InsertComment"
import InboxIcon from "@material-ui/icons/Inbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import AppsIcon from "@material-ui/icons/Apps"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddIcon from "@material-ui/icons/Add"
import { auth, db } from "../../firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useSelector } from "react-redux"
import { selectTheme } from "../../features/appSlice"

const Sidebar = () => {
  const [channels, loading, error] = useCollection(db.collection("rooms"))
  const [user] = useAuthState(auth)
  const theme = useSelector(selectTheme)

  return (
    <SidebarContainer darkTheme={!theme}>
      <SidebarHeader darkTheme={!theme}>
        <SidebarInfo darkTheme={!theme}>
          <h2>Slack</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption title={doc.data().name} key={doc.id} id={doc.id} />
      ))}
    </SidebarContainer>
  )
}

export default Sidebar
