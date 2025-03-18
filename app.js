require('dotenv').config()

const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./Model/blogModel')
const app = express()

app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')

const upload = multer({storage:storage})

connectToDatabase()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "this is page"
    })
})

app.post("/blog", upload.single('image'), (req, res) => {
    
    // const { title, subtitle, description, image } = req.body

    // //check condition if data not send error msg 400 show 
    // if (!title || !description || !subtitle || !image) {
    //     return res.status(400).json({
    //         message: "Please provide title,description,subtitle,image"
    //     })
    // }
    // await Blog.create({
    //     title: title,
    //     description: description,
    //     subtitle: subtitle,
    //     image: image
    // })
    console.log(req.body)
    console.log(req.file)
    res.status(200).json({
        message: "Blog api hit sucessfully!.."
    })
})



app.listen(process.env.PORT, () => {
    console.log("NodeJs projct has started")
})
