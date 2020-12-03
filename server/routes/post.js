const router = require("express").Router()
const {
  getPosts,
  getPostById,
  createPost,
  getPostsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  postPhoto,
} = require("../controllers/post")
const { requireSignin, checkAuth } = require("../controllers/auth")
const { userById } = require("../controllers/user")

router.route("/").get(getPosts)
router.route("/id=:userId").post(createPost)

router.route("/user").get(getPostsByUser)

router.get("/image=:postId", postPhoto)

router
  .route("/post=:postId")
  .get(getPostById)
  .delete(requireSignin, deletePost)
  .put(requireSignin, isPoster, updatePost)

router.param("userId", userById)
router.param("postId", postById)

module.exports = router
