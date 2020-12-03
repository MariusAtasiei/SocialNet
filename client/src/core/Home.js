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

  if (!posts) return <div></div>

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLimit(limit + 2)
    }
  }

  return (
    <div className="container">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}

export default Home
