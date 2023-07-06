import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const [inputs, setinputs] = useState({
    name:"",email:"",password:""
  })
  const handleChange=(e)=>{
    setinputs((prevState)=>({
     ...prevState,
     [e.target.name]: e.target.value
    }))

  }
  
  const sendRequest=async(type="login")=>{
  const res= await axios.post(`http://localhost:3000/api/user/${type}`,{
    name: inputs.name,
    email: inputs.email,
    password: inputs.password,
   }).catch(err=>console.log(err));
   const data=await res.data;
   console.log(data);
   return data;
  }
  
  const [isSignup, setisSignup] = useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
      //user id stored in local storage 
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs"))
      .then((data)=>console.log(data));
    }else{
    sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs"))
    .then((data)=>console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={500}
        display="flex" flexDirection="column" alignItems="center" justifyContent="center"
        padding={3}
        boxShadow="10px 10px 20px #ccc" margin="auto" marginTop={4} borderRadius={5}>
          <Typography variant="h3" >
          {isSignup ? "Signup": "Login" }
          </Typography>
         {isSignup && < TextField name="name" onChange={handleChange} 
         value={inputs.name} placeholder="Name" margin="normal" />}

          <TextField name="email" onChange={handleChange} 
          value={inputs.email} type={'email'} placeholder="email" margin="normal" />

          <TextField name="password" onChange={handleChange} 
          value={inputs.password} type={'password'} placeholder="password" margin="normal" />

         <Button type={'submit'}
         sx={{marginTop: 3, borderRadius:1}} variant="contained" color="inherit">Submit</Button>

         <Button onClick={()=>setisSignup(!isSignup)} 
         sx={{marginTop: 1, borderRadius:1}} variant="contained" color="inherit">
          Switch to {isSignup ? "Login" :"Signup"}</Button>
          
        </Box>
      </form>
    </div>
  )
}
