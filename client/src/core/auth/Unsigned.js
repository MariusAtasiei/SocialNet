import React from "react"
import { Link, useHistory } from "react-router-dom"

function Unsigned({ pathname }) {
  return (
    <div>
      {/* {!["/signin", "/signup"].includes(pathname) && history.push("/signin")} */}
      <Link to="/signin" className="header_signin">
        Sign in
      </Link>
      <Link to="/signup" className="header_signup">
        Sign up
      </Link>
    </div>
  )
}

const isActive = (pathname, path) =>
  pathname === path ? { color: "red" } : { color: "black" }

export default Unsigned
