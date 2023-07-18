import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Blog } from '../Blog'
export const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest= async()=>{
    const res= await axios.get("http://localhost:3000/api/blog").catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }
  useEffect(()=>{
  sendRequest().then(data=>setBlogs(data.blogs));
  },[])
  console.log(blogs);
  return (
    <div>
    
      {blogs && blogs.map((blog,index)=>(
      <Blog 
       id={blog._id}
      //to chexk whether user id matches with current user
     isUser={localStorage.getItem("userId")===blog.user._id}
      title={blog.title} 
      description={blog.description}
      imageURL={blog.image} 
      userName={blog.user.name} />))}  
      </div>
  )
}
// blog.map to map the array elements