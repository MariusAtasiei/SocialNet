import React, { useState, useEffect } from "react"
import { useParams, useLocation, useHistory, Link } from "react-router-dom"
import axios from "axios"
import defaultPhoto from "../images/profile-photos/default.jpg"

function FindUsers() {
  const { name } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [path, setPath] = useState(location.pathname)
  const [users, setUsers] = useState([])

  if (path !== location.pathname) history.go()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/find?name=${name}`)
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err.message))
  }, [])

  return (
    <div>
      {users.map((user) => (
        <div>
          <img
            src={`${process.env.REACT_APP_API_URL}/users/photo/${user._id}`}
            style={{ width: 100 }}
          />
          <Link to={`/user/${user.username}`}>{user.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default FindUsers
