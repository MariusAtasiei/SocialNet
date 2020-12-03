import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function PostPage() {
  const { postId } = useParams()
  const id = postId.split("-").pop()
  const [post, setPost] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/post=${id}`)
      .then(({ data }) => setPost(data))
      .catch((err) => console.log(err.message))
  }, [])

  if (!post) return <div></div>

  return (
    <div>
      <h4>{post.title}</h4>
      <h3>{post.body}</h3>
      {post.image && (
        <img src={`${process.env.REACT_APP_API_URL}/posts/image=${post._id}`} />
      )}
    </div>
  )
}

export default PostPage
