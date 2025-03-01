const express= require('express')
const app= express()

app.get("/",(req,res)=>{
    res.json({
        message:"this is page"
    })
})

app.get("/about",(req,res)=>{
    res.json({
        message:"this is about page"
    })
})

app.listen(3000,()=>{
    console.log("NodeJs has started")
})