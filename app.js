require('dotenv').config()

const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./Model/blogModel')
const app = express()

app.use(express.json())

connectToDatabase()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "this is page"
    })
})

app.post("/blog", async(req, res) => {
    const { title, subtitle, description, image } = req.body
    await Blog.create({
        title: title,
        description: description,
        subtitle: subtitle,
        image: image
    })
    res.status(200).json({
        message: "Blog api hit sucessfully!.."
    })
})



app.listen(process.env.PORT, () => {
    console.log("NodeJs projct has started")
})
