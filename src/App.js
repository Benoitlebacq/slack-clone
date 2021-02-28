import React from "react"
import { AppBody } from "./app.styles"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Chat from "./components/Chat/Chat"

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
