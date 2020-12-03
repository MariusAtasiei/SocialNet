import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import Input from "./Input"

const auth = "Authorization"

function EditForm({ editName }) {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const [error, setError] = useState()
  const [message, setMessage] = useState("")
  const { userId } = useParams()
  const token = JSON.parse(localStorage.getItem("jwt")).token

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/confirm-password`,
        { password: data.password, id: userId }
      )

      const headers = { Authorization: `Bearer ${token}` }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/id=${userId}`,
        data,
        {
          headers,
        }
      )

      setError("")
      setMessage("Edit successfully")

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/id=${userId}`,
        {
          headers,
        }
      )

      const user = res.data
      console.log(user)

      localStorage.setItem("jwt", JSON.stringify({ token, user }))
      history.go()
    } catch (err) {
      const bool = err.message === "Request failed with status code 403"
      setError(bool ? "Email already used" : "Password is incorrect")
      setMessage()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Change the {editName.toLowerCase().replace("new", "")}:</p>
        <Input
          type={editName === "NewPassword" ? "password" : "text"}
          name={
            editName === "NewPassword" ? editName.replace("P", " p") : editName
          }
          register={register}
          errors={errors}
        />
        {error && error[0] === "E" && <p>{error}</p>}
        <Input
          type="password"
          name="Password"
          register={register}
          errors={errors}
        />
        {error && error[0] === "P" && <p>{error}</p>}
        <p>{message}</p>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default EditForm
