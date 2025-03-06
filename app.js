require('dotenv').config()

const express= require('express')
const connectToDatabase = require('./database')
const app= express()

app.use(express.json())

connectToDatabase()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"this is page"
    })
})

app.post("/blog",(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        message:"Blog api hit sucessfully!.."
    })
})



app.listen(process.env.PORT,()=>{
    console.log("NodeJs projct has started")
})
