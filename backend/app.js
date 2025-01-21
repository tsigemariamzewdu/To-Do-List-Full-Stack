const express=require("express");
const mongoose=require("mongoose")
const cors= require("cors")

const todoRoutes=require("./routes/todoRoutes");
const userRoutes=require("./routes/userRoutes");
require("dotenv").config();


const app=express()
const PORT=process.env.PORT;

//cors middleware
app.use(cors())

//middleware

app.use(express.json())


//mongoose connection

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


.then(()=>
console.log("mongoDB connected"))
.catch((error)=>{
    console.error("mongodb connection failed",error)
})


app.use('/api/todos',todoRoutes)
app.use('/api/user',userRoutes)
//now let's start the server

app.listen(PORT,()=>{
    console.log('server running')
})
