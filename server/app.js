const express = require("express")
const mongo = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
dotenv.config()

const app = express()

mongo.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("MongoDB running.")
)

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(morgan("dev"))

const postRoute = require("./routes/post")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")

app.use("/posts", postRoute)
app.use("/users", authRoute)
app.use("/users", userRoute)
app.get("/", (req, res) => res.json("Social Network"))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))
