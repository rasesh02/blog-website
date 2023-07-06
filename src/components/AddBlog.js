import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

export const AddBlog = () => {
  const navigate=useNavigate();
  const [inputs, setinputs] = useState({
    title:"",description:"",imageURL:""
  });
  const handleChange=(e)=>{
    setinputs((prevState)=>({
     ...prevState,
     [e.target.name]: e.target.value
    }));

  };
  
  const sendRequest=async()=>{
    const res= await axios.post("http://localhost:3000/api/blog/add",{
    title: inputs.title,
      description: inputs.description,
     image: inputs.imageURL,
     user: localStorage.getItem("userId"),
     }).catch(err=>console.log(err));
     const data=await res.data;
     console.log(data);
     return data;
    }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        border={3}
        borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
        borderRadius={10}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={"auto"}
        marginTop={3}
        display="flex"
        flexDirection={"column"}
        width={"80%"}>
          <Typography
           fontWeight={"bold"}
           padding={3}
           color="grey"
           variant="h2"
           textAlign={"center"}>Post a new blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} margin="auto" value={inputs.title}
            variant="outlined"/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name='description' onChange={handleChange} margin="auto"value={inputs.description}
            variant="outlined"/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} margin="auto" value={inputs.imageURL}
            variant="outlined"/>
  <Button type="submit" sx={{mt:2, borderRadius: 4}} variant="contained" color="info">Submit</Button>
        </Box>
      </form>
    </div>
  )
}
export default AddBlog;