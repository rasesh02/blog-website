import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  const navigate=useNavigate();
  const handleEdit=(e)=>{
   navigate(`add/myBlogs/${id}`)
  }
  const deleteRequest= async()=>{
    const res= await axios.delete(`http://localhost:3000/api/blog/${id}`).catch(err=>console.log(err))
    const data= res.data;
    return data;
  }
  const handleDelete=()=>{
   deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))
  }
  console.log(title,isUser);
  return (
    <div> <Card sx={{ width: "40%",margin:'auto', padding:2,mt:2,boxShadow: "5px 5px 10px #ccc",
    ":hover":{boxShadow: "10px 10px 20px #ccc"}  }}>
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} color="primary"
          sx={{marginLeft:'auto'}}><ModeEditIcon/></IconButton>
          <IconButton onClick={handleDelete} color="error"><DeleteIcon/></IconButton>
        </Box>
      )}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName ? userName.charAt(0) : ""}
        </Avatar>
      }
     
      title={title}
    />

    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <CardContent>
      <hr/>
      <br/>
      <Typography variant="body2" color="text.secondary">
       <b>{userName}</b>{":" } {description}
      </Typography>
    </CardContent>
    
  </Card></div>
  )
}
export default Blog;
// added padding , margin etc
// added title, description,image and user