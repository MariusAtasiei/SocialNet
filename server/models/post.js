const mongo = require("mongoose")
const { ObjectId } = mongo

const postSchema = new mongo.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: {
      data: Buffer,
      mimetype: String,
    },
    postedBy: { type: String },
    userId: { type: String },
    username: { type: String },
    comments: { type: Array },
    likes: { type: Array },
  },
  { timestamps: true }
)

module.exports = mongo.model("Posts", postSchema)
