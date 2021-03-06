import React from "react"
import { WelcomeContainer, WelcomeTitle } from "./welcome.style"

const Welcome = () => {
  return (
    <WelcomeContainer>
      <img
        src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
        alt="slack logo"
      />
      <WelcomeTitle>Welcome to slack clone V1 </WelcomeTitle>
    </WelcomeContainer>
  )
}

export default Welcome
