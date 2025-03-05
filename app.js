require('dotenv').config()

const express= require('express')
const connectToDatabase = require('./database')
const app= express()

connectToDatabase()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"this is page"
    })
})

app.get("/about",(req,res)=>{
    res.json({
        message:"this is about page"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("NodeJs projct has started")
})
