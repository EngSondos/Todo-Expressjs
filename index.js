const express = require('express')
const app = express()
let todoRouter = require('./routes/todo')
app.use(express.json())


const PORT =5000

app.use('/todo',todoRouter)

app.listen(PORT,()=>{
    console.log("Listening...")
})