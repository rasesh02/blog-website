import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes"
import blogRouter from "./routes/blog-routes";
import cors from "cors";
const app=express();
// to parse data of user in json
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect('mongodb+srv://admin:RaNa!001@cluster1.421gyu5.mongodb.net/?retryWrites=true&w=majority'
)
.then(()=>app.listen(3000))
.then(()=>console.log("connected to db and working")
)
.catch((err)=>console.log(err));

