import React from "react"
import { AppBody, AppLoadingContents, AppLoadingContainer } from "./app.styles"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Chat from "./components/Chat/Chat"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import Login from "./components/Login/Login"
import Spinner from "react-spinkit"

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <AppLoadingContainer>
        <AppLoadingContents>
          <img
            src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
            alt="slack logo"
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoadingContainer>
    )
  }
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </AppBody>
        </>
      )}
    </Router>
  )
}

export default App
