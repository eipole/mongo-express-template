if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const mongoose = require("mongoose")
const mongoDB = process.env.DATABASE_URL
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to mongoose"))

mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.")
})

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!")
  return console.log(err)
})

app.use(express.json())
const catsRouter = require("./routes/cats")
app.use("/cats", catsRouter)

// app.listen(process.env.PORT || 3000)
app.listen(port, function () {
  console.log("jookseb " + port)
})
