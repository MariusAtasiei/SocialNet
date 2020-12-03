import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import axios from "axios"
import "./css/Profile.scss"
import * as moment from "moment"
import Post from "./components/Post"

function Profile() {
  const [user, setUser] = useState({})
  const loggedUser = JSON.parse(localStorage.getItem("jwt"))
  const { userId } = useParams()
  const history = useHistory()
  const [uploadedPhoto, setUploadedPhoto] = useState()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/username=${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then(({ data }) => {
        setUser(data)
        setUploadedPhoto(
          `${process.env.REACT_APP_API_URL}/users/photo/${data._id}`
        )
      })
      .catch((err) => console.log(err.message))

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts/user?username=${userId}&limit=2`
      )
      .then(({ data }) => {
        setPosts(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleClick = async () => {
    try {
      const data = {
        id: loggedUser.user._id,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/follow/${user._id}`,
        data
      )

      if (loggedUser.user.following.includes(user.username)) {
        loggedUser.user.following.pop(user.username)
        user.followers -= 1
      } else {
        loggedUser.user.following.push(user.username)
        user.followers += 1
      }

      history.go()

      localStorage.setItem("jwt", JSON.stringify(loggedUser))
    } catch (err) {
      console.log(err)
    }
  }

  if (!user) return <div></div>

  return (
    <div className="container">
      <div className="user">
        <div className="user_details">
          <div className="user_details--info">
            <p className="user_avatar">
              <img src={uploadedPhoto} className="img-fluid" />
            </p>
            <p className="user_name">Name: {user.name}</p>
            <p className="user_email">Email: {user.email}</p>
            <p className="user_followers">Followers: {user.followers}</p>
            <p className="user_joined">
              Joined {moment(user.createdAt).format("D MMMM YYYY")}
            </p>
          </div>
          <div className="user_details--buttons">
            {loggedUser && userId === loggedUser.user.username ? (
              <>
                <Link to={`/user/edit/${user._id}`}>Edit</Link>
                <Link to={`/user/delete/${user._id}`}>Delete</Link>
              </>
            ) : (
              loggedUser && (
                <button className="btn btn-primary" onClick={handleClick}>
                  Follow
                  {loggedUser.user.following.includes(user.username)
                    ? "ing"
                    : ""}
                </button>
              )
            )}
          </div>
        </div>

        <div className="user_posts">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
