import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";
 export const getAllBlogs= async(req,res,next)=>{
    let blogs;
    try{
      blogs= await Blog.find().populate("user");
    }catch(err){
        console.log(err);
    }
    if(!blogs){
        res.status(404).json({message:"Blog not found"});
    }
    res.status(200).json({blogs});
}
export const addBlog= async(req,res,next)=>{
    const {title,description,image,user}=req.body;
    let existingUser;
    try{                       //(id)
        existingUser= await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        res.status(400).json({message:"Unable to find user by this id"});
    }
    const blog= new Blog({
        title,
        description,
        image,
        user
    });
    try{
      const session=await mongoose.startSession();
      session.startTransaction();
      await blog.save({session});   // saving the blog
      existingUser.blogs.push(blog);  //blog array pe push kar diya
      await existingUser.save({session});
      await session.commitTransaction();
    }catch(err){
       console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({blog});
}
export const updateBlog= async(req,res,next)=>{
    const {title,description}=req.body;
    const blogId= req.params.id;
    let blog;
    try{
     blog=await Blog.findByIdAndUpdate(blogId,{
        title,
        description,
    });
}catch(err){
    return console.log(err);
}
if(!blog) {
    return res.status(500).json({message:"Unable to update"});
}
return res.status(200).json({blog});
}
//
export const getById= async(req,res,next)=>{
    const id= req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!blog){
      return res.status(404).json({message:"No Blog Found"});
    }
    return res.status(200).json({blog});
}
//delete blog
export const deleteBlog= async(req,res,next)=>{
    const id= req.params.id;
    let blog;
    try{
        blog= await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);  // pop blog from array
        await blog.user.save();
    }catch(err){
       return console.log(err);
    }
    if(!blog){
      return res.status(500).json({message:"Unable to delete"});
    }
    return res.status(200).json({message:"Blog successfully deleted"});
}
//get blog of a user
export const getByUserId= async(req,res,next)=>{
    const userId= req.params.id;
    let userBlogs;
    try{
        userBlogs= await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        res.status(404).json({message:"No Blog Found"});
    }
    res.status(200).json({user:userBlogs})
}