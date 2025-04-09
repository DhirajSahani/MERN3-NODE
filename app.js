require('dotenv').config()

const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./Model/blogModel')
const app = express()

app.use(express.json())
const { multer, storage } = require('./middleware/multerConfig')

const upload = multer({ storage: storage })
const fs = require('fs')
const cors =require('cors')

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))

connectToDatabase()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "this is page"
    })
})

app.post("/blog", upload.single('image'), async (req, res) => {
    const { title, subtitle, description } = req.body
    console.log(req.body)
    let filename ;
    console.log(req.file)
    if(req.file){
        filename ="http://localhost:3000/" + req.file.filename
    }
    else{
        filename= "haha.jpeg"
    }

    //check condition if data not send error msg 400 show 
    if (!title || !description || !subtitle) {
        return res.status(400).json({
            message: "Please provide title,description,subtitle,image"
        })
    }
    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        image: filename
    })
    // console.log(req.body)
    // console.log(req.file)
    res.status(200).json({
        message: "Blog api hit sucessfully!..",
        title: title,
        subtitle: subtitle,
        description: description,
        image: filename
    })
})

app.get("/blog", async (req, res) => {
    const blogs = await Blog.find() // return array
    res.status(200).json({
        message: "Blogs fetched Sucessfully",
        data: blogs
    })
})

app.get("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id) // return obj

    if (!blog) {
        return res.status(404).json({
            message: "data no found"
        })
    }
    res.status(200).json({
        message: "fetched successfully",
        data: blog

    })
})

app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndDelete(id) // delete data
    fs.unlink('storage/${imageName}', (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("file deleted successfully.")
        }
    })
    res.status(200).json({
        message: "delete data Successfully.."
    })
})

app.patch("/blog/:id", upload.single('image'), async (req, res) => {
    const id = req.params.id
    const {title,subtitle,description} = req.body
    let imageName;
    if (req.file) {
        imageName = "http://localhost:3000/" + req.file.filename
        const blog = await Blog.findById(id)
        const uploadImage = blog.image

        fs.unlink(`storage/${uploadImage}`,(err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("updated  successfully.")
            }
        })

    }

    await Blog.findByIdAndUpdate(id, {
        title: title,
        subtitle: subtitle,
        description: description,
        image: imageName

    })
    res.status(200).json({
        message: "Blog Updated  Successfully.."
    })

})

app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
    console.log("NodeJs projct has started")
})