import React from "react"
import "./Post.scss"
import * as moment from "moment"
import { Link } from "react-router-dom"

function Post({ post }) {
  return (
    <div className="post">
      <p className="post_image">
        {post.image && (
          <Link to={`/post/${post.title.split(" ").join("-")}-${post._id}`}>
            <img
              src={`${process.env.REACT_APP_API_URL}/posts/image=${post._id}`}
              className="img-fluid"
            />
          </Link>
        )}
      </p>
      <Link to={`${process.env.REACT_APP_API_URL}`}>
        <h2 className="post_title">{post.title}</h2>
      </Link>
      <div className="post_user">
        <Link to={`user/${post.username}`}>
          <img
            src={`${process.env.REACT_APP_API_URL}/users/photo/${post.userId}`}
            className="post_user--avatar"
          />
        </Link>
        <div>
          <Link to={`user/${post.username}`} tclassName="post_user--name">
            {post.postedBy}
          </Link>
          <p className="post_user--time">
            {moment(post.createdAt).format("D MMMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
