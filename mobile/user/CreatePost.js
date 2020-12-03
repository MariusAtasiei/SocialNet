import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import Input from "./components/Input"

function CreatePost() {
  const { register, handleSubmit, errors } = useForm()
  const [previewImage, setPreviewImage] = useState()
  const [image, setImage] = useState()
  const { userId } = useParams()
  const loggedUser = JSON.parse(localStorage.getItem("jwt"))
  const history = useHistory()

  const handleChange = ({ target }) => {
    const { files } = target
    const photo = files[files.length - 1]
    if (photo) {
      setImage(photo)
      setPreviewImage(URL.createObjectURL(photo))
    }
  }
  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      formData.append("image", image)
      formData.append("title", data.title)
      formData.append("body", data.body)
      formData.append("username", loggedUser.user.username)

      await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/id=${userId}`,
        formData
      )
    } catch (err) {
      console.log(err)
    }
  }
  if (userId !== loggedUser.user._id) history.goBack()
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Create Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for="photo">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handleChange} />
        <img src={previewImage} style={{ height: 100 }} />
        <Input type="text" name="Title" register={register} errors={errors} />
        <Input type="text" name="Body" register={register} errors={errors} />

        <button className="btn btn-raised btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreatePost
