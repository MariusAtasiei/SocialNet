import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import Header from "./core/Header"
import Profile from "./user/Profile"
import FindUsers from "./user/FindUsers"
import DeleteProfile from "./user/DeleteProfile"
import EditProfile from "./user/EditProfile"
import CreatePost from "./user/CreatePost"
import PostPage from "./user/components/PostPage"

function MainRouter() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route exact path="/user/:userId" component={Profile} />
        <Route path="/users/find=:name" component={FindUsers} />
        <Route path="/user/post/:userId" component={CreatePost} />
        <Route path="/user/delete/:userId" component={DeleteProfile} />
        <Route path="/user/edit/:userId" component={EditProfile} />
        <Route path="/post/:postId" component={PostPage} />
      </Switch>
    </>
  )
}

export default MainRouter
