const User = require("../models/user")
const fs = require("fs")
const _ = require("lodash")

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)

    if (!user) throw new Error("")

    req.profile = user
    next()
  } catch (err) {
    return res.status(401).json({ error: "User not found." })
  }
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.auth._id === req.profile._id
  if (!authorized) {
    return res
      .status(403)
      .json({ error: "User is not authorized to perform this action." })
  }
  next()
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({ users })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getUser = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })

    return res.json(user)
  } catch (err) {}

  return res.json(user)
}

exports.getUserByName = async (req, res) => {
  const { name } = req.query
  try {
    const users = await User.find({ name }).select("username name")

    return res.json(users)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.profile

  try {
    if (req.body.email) {
      const { email } = req.body
      const alreadyUser = await User.findOne({ email })

      if (alreadyUser) throw new Error("email")
    }
    const user = await User.findByIdAndUpdate(id, req.body)

    user.hashedPassword = undefined
    user.salt = undefined
    user.__v = undefined

    res.json({ message: "User updated successfully", user })
  } catch (err) {
    if (err.message === "email") res.status(403).json({ error: err.message })
    res.status(400).json({ error: "User could not be updated" })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.profile
  try {
    await User.findByIdAndDelete(id)
    return res.json({ message: "User deleted successfully" })
  } catch (err) {
    return res.status(401).json({ error: "User could not be deleted" })
  }
}

exports.confirmPassword = async (req, res) => {
  const { password, id } = req.body

  try {
    const user = await User.findById(id)

    if (!user) throw new Error("User not found")

    if (!user.authenticate(password))
      throw new Error("User could not be authenticated")

    return res.json(true)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

exports.uploadProfilePhoto = async (req, res) => {
  let { photo } = req.files
  const { mimetype, data } = photo

  const { _id } = req.profile

  try {
    await User.findByIdAndUpdate(_id, {
      photo: { data, mimetype },
    })

    return res.json("success")
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

exports.profilePhoto = (req, res, next) => {
  const { photo } = req.profile
  if (photo.data !== undefined) {
    res.set("Content-Type", photo.mimetype)
    return res.send(photo.data)
  } else {
    res.set("Content-Type", "image/jpg")
    return res.send(fs.readFileSync(`${__dirname}/../public/default.jpg`))
  }
}

exports.follow = async (req, res) => {
  const { id } = req.body
  const { _id } = req.profile

  const user = User.findById(_id).select("followers username")

  user.exec(async (err, { followers, username }) => {
    try {
      if (err) throw err
      const { following } = await User.findById(id).select("following")

      if (following.includes(username)) {
        --followers
        following.pop(username)
      } else {
        ++followers
        following.push(username)
      }

      await User.findByIdAndUpdate(_id, { followers })
      await User.findByIdAndUpdate(id, { following })
      return res.json(true)
    } catch (err) {
      return res.json(400).status(err.message)
    }
  })

  // try {
  //   let { followers, username } = await User.findById(_id).select(
  //     "followers username"
  //   )

  //   const { following } = await User.findById(id).select("following")

  //   if (following.includes(username)) {
  //     --followers
  //     following.pop(username)
  //   } else {
  //     ++followers
  //     following.push(username)
  //   }

  //   await User.findByIdAndUpdate(_id, { followers })
  //   await User.findByIdAndUpdate(id, { following })
  //   return res.json(true)
  // } catch (err) {
  //   return res.json(400).status(err.message)
  // }
}
