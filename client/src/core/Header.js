import React from "react"
import { useHistory, useLocation, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import Signed from "./auth/Signed"
import Unsigned from "./auth/Unsigned"
import "./css/Header.scss"

function Header() {
  const pathname = useLocation().pathname
  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ name }) => {
    history.push(`/users/find=${name}`)
  }

  const signOut = () => {
    if (window) localStorage.removeItem("jwt")
    history.push("/")
    return axios.get(`${process.env.REACT_APP_API_URL}/users/signout`)
  }

  const auth = JSON.parse(localStorage.getItem("jwt"))

  return (
    <div className="header">
      <div className="header_logo">
        <Link exact to="/">
          Author
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="header_searchform">
        <input type="text" ref={register} name="name" />
        <button className="header_searchform--button">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div className="header_menu">
        <Link exact to="/" className="header_home">
          <i class="fas fa-home"></i>
        </Link>

        {auth ? (
          <Signed pathname={pathname} auth={auth} signOut={signOut} />
        ) : (
          <Unsigned pathname={pathname} />
        )}
      </div>
    </div>
  )
}

export default Header
