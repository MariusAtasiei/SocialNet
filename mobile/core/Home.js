import React, { useState, useEffect } from "react"
import axios from "axios"
import Post from "../user/components/Post"

function Home() {
  const [posts, setPosts] = useState()
  const [limit, setLimit] = useState(2)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts?limit=${limit}`)
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err))
  }, [limit])

  const handleBottom = (ev) => {
    ev.preventDefault()
    setLimit(limit + 2)
  }

  if (!posts) return <div></div>
  return (
    <div className="container">
      {posts.map((post) => (
        <Post post={post} />
      ))}
      <button onClick={handleBottom}>Vezi mai mult</button>
    </div>
  )
}

export default Home
