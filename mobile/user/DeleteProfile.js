import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import Input from "./components/Input"

function DeleteProfile() {
  const history = useHistory()
  const { userId } = useParams()
  const loggedUser = JSON.parse(localStorage.getItem("jwt"))
  const [password, setPassword] = useState({
    pass: null,
    error: "",
  })

  const handleConfirm = async (ev) => {
    ev.preventDefault()
    const { pass } = password
    if (!pass) setPassword({ ...password, error: "Password is required" })
    else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/users/confirm-password`,

          { id: userId, password: pass }
        )

        setPassword({ ...password, error: "" })

        await axios.delete(
          `${process.env.REACT_APP_API_URL}/users/id=${userId}`,
          { headers: { Authorization: `Bearer ${loggedUser.token}` } }
        )
        localStorage.removeItem("jwt")
        history.push("/signin")
        alert("The user was successfully deleted.")
      } catch (err) {
        setPassword({ ...password, error: "Password is incorrect" })
      }
    }
  }

  const handleCancel = () => history.push("/")

  const handleChange = (ev) => {
    ev.preventDefault()
    setPassword({ ...password, pass: ev.target.value })
  }

  return (
    <div>
      <form>
        <label for="password">Enter your password</label>
        <input type="password" name="password" onChange={handleChange} />
        {<p>{password.error}</p>}
        <h2>Are you sure you want to delete your account?</h2>
        <button onClick={handleCancel}>No</button>
        <button onClick={handleConfirm}>Yes</button>
      </form>
    </div>
  )
}

export default DeleteProfile
