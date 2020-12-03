const Post = require("../models/post")
const formidable = require("formidable")
const fs = require("fs")

exports.postById = (req, res, next, id) => {
  const post = Post.findById(id)

  post.exec((err, post) => {
    if (err) return res.status(400).json({ error: err.message })

    req.post = post
    next()
  })
}

exports.getPosts = (req, res) => {
  const { limit } = req.query

  const posts = Post.find()
    .select("-__v")
    .sort("-createdAt")
    .limit(limit * 1)

  posts.exec((err, posts) => {
    if (err) return res.json({ error: err.message })

    return res.json(posts)
  })
}

exports.getPostsByUser = (req, res) => {
  const { username, limit } = req.query

  const posts = Post.find({ username })
    .sort("-createdAt")
    .limit(limit * 1)

  posts.exec((err, posts) => {
    if (err) return res.status(400).json({ error: err.message })

    return res.json(posts)
  })
}

exports.getPostById = (req, res) => {
  return res.json(req.post)
}

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body)

  if (req.files) {
    const { image } = req.files
    const { mimetype, data } = image

    newPost.image = { data, mimetype }
  }

  const { _id, name, username } = req.profile

  newPost.userId = _id
  newPost.postedBy = name
  newPost.username = username

  try {
    newPost.save()
    return res.json(newPost)
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

exports.isPoster = (req, res, next) => {
  const isPoster =
    req.post && req.auth && req.auth.username == req.post.postedBy

  if (!isPoster)
    return res
      .status(403)
      .json({ error: "User not authorized to delete this post." })
  next()
}

exports.deletePost = async (req, res) => {
  const { post } = req
  try {
    await post.remove()
    return res.json({ message: "The post was successfully deleted." })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

exports.updatePost = async (req, res, next) => {
  const post = req.body

  try {
    await Post.findByIdAndUpdate(post._id, post)
    res.json({ message: "Post updated successfully." })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.postPhoto = (req, res) => {
  const { image } = req.post
  try {
    res.set("Content-type", image.mimetype)
    return res.send(image.data)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}
