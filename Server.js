const express = require("express");
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRouter = require("./routes/taskRoutes");

const {MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD} = require("./config/config");
const MONGO_URL =`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const mongoose = require("mongoose");
mongoose.connect(
    // "mongodb://root:root@mongo:27017/?authSource=admin"
    MONGO_URL
) .then(()=>{
     console.log("Successfully connected");
}).catch((e)=>{
    console.log("error trying to connect",e);
})

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("<h1>Hello World..?</h1>");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks",taskRouter);

const PORT = process.env.PORT || 3000; 

app.listen(PORT,()=>{
    console.log(`Server Started on PORT : ${PORT}`);
});