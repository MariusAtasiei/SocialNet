import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "../css/Header.scss"

function Signed({ pathname, auth, signOut }) {
  const { user } = auth
  const loggedUser = JSON.parse(localStorage.getItem("jwt"))
  const [uploadedPhoto, setUploadedPhoto] = useState(
    loggedUser.user._id
      ? `${process.env.REACT_APP_API_URL}/users/photo/${loggedUser.user._id}`
      : null
  )
  const history = useHistory()

  return (
    <>
      {["/signin", "/signup"].includes(pathname) && history.push("/")}
      <Link to={`/user/post/${loggedUser.user._id}`} className="header_addnew">
        <i class="fas fa-plus"></i>
      </Link>
      <div className="dropdown header_user">
        <div
          className="dropdown-toggle header_user--dropdown"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={uploadedPhoto} className="header_user--avatar" />
          <p className="header_user--username">{user.name}</p>
          <i className="fas fa-angle-down"></i>
        </div>
        <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
          <div className="nav_dropdown">
            <Link to={`/user/${user.username}`}>Profile</Link>
            <Link onClick={signOut}>Sign out</Link>
          </div>
        </div>
      </div>

      {/* <div className="Name="header_menu">
        <div className="Name=""></div>
        <div className="Name=""></div>
        <div className="Name="header_user">
          <div className="Name="header_user--dropdown">
            <img src={uploadedPhoto} className="Name="header_user--avatar" />
            <p className="Name="header_user--username">{user.name}</p>
            <i className="Name="fas fa-angle-down"></i>

            <div className="Name="nav_dropdown">
              <Link to={`/user/${user.username}`}>Profile</Link>
              <Link onClick={signOut}>Sign out</Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} className="NameName="header_user">
        <DropdownToggle className="NameName="header_user--dropdown">
          <img src={uploadedPhoto} className="NameName="header_user--avatar" />
          <p className="NameName="header_user--username">{user.name}</p>
          <i className="Name="fas fa-angle-down"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>
            <Link to={`/user/${user.username}`}>Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <button onClick={signOut}>Sign out</button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
    </>
  )
}

export default Signed
