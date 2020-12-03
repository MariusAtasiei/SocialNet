import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import EditForm from "./components/EditForm"
import DefaultPhoto from "../images/profile-photos/default.jpg"

function EditProfile() {
  const [photo, setPhoto] = useState()
  const history = useHistory()
  const [previewImage, setPreviewImage] = useState()
  const loggedUser = JSON.parse(localStorage.getItem("jwt"))
  const [uploadedPhoto, setUploadedPhoto] = useState(
    loggedUser.user._id
      ? `${process.env.REACT_APP_API_URL}/users/photo/${loggedUser.user._id}`
      : null
  )

  const handleChange = ({ target }) => {
    const { files } = target
    const photo = files[files.length - 1]
    if (photo) {
      setPhoto(photo)
      setPreviewImage(URL.createObjectURL(photo))
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const formData = new FormData()
    formData.append("photo", photo)

    const headers = {
      Authorization: `Bearer ${loggedUser.token}`,
      "Content-type": "multipart/form-data",
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/upload-photo/${loggedUser.user._id}`,
        formData,
        { headers }
      )

      history.go()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="photo">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handleChange} />
        <img src={previewImage} style={{ height: 100 }} />
        <input type="submit" />
      </form>
      <img src={uploadedPhoto} style={{ height: 100 }} />
      <EditForm editName="Name" />
      <EditForm editName="Email" />
      <EditForm editName="NewPassword" />
    </div>
  )
}

export default EditProfile
