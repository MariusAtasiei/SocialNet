import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import axios from "axios"
import Input from "./components/Input"

function Signup() {
  const { register, handleSubmit, errors } = useForm()
  const [message, setMessage] = useState({ text: null, color: "green" })
  const history = useHistory()

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        formData
      )
      const { user } = data
      localStorage.setItem("jwt", JSON.stringify(data))
      history.push("/")
    } catch (err) {
      console.log(err)
      setMessage({ text: "Email already used", color: "red" })
    }
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" name="Email" register={register} errors={errors} />
        <Input
          type="text"
          name="Username"
          register={register}
          errors={errors}
        />
        <Input type="text" name="Name" register={register} errors={errors} />
        <Input
          type="password"
          name="Password"
          register={register}
          errors={errors}
        />
        <p style={{ color: message.color }}>{message.text}</p>
        <button className="btn btn-raised btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
