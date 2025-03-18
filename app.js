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

app.post("/blog", upload.single('image'), async (req, res) => { 
    const { title, subtitle, description} = req.body
    const filename = req.file.filename

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
        message: "Blog api hit sucessfully!.."
    })
})

app.get("/blog", async (req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json ({
        message:"Blogs fetched Sucessfully",
        data: blogs
    })
})

app.use(express.static('./storage'))



app.listen(process.env.PORT, () => {
    console.log("NodeJs projct has started")
})
