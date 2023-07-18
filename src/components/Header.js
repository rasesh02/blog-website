import React, { useState } from "react"
import{AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from "@mui/material"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";


export const Header = () => {
  const dispatch= useDispatch();
  const isLoggedIn= useSelector((state)=> state.isLoggedIn);

  const [value,setValue]=useState();
  return (
    <div>
    <AppBar position="sticky"
    sx={{background:"#060622"}}>
        <Toolbar>
            <Typography variant="h4">BlogsWeb</Typography>
        {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
               <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent={Link} to ="/blogs" label="All Blogs" color="contained"/>
                <Tab LinkComponent={Link} to ="/myBlogs" label="My Blogs"/>
                <Tab LinkComponent={Link} to ="/blogs/add" label="Add new blog"/>
               </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
        {!isLoggedIn && <><Button LinkComponent={Link} to ="/auth"
        variant="contained" sx={{margin: 1, borderRadius: 10}} color="warning">Login</Button>
        
       <Button LinkComponent={Link} to ="/auth"
         variant="contained" sx={{margin: 1, borderRadius: 10}} color="warning">Signup</Button></>
        
        }
        {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())}
        LinkComponent={Link} to ="/auth"
        variant="contained" sx={{margin: 1, borderRadius: 10}} color="warning">Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>

   
    </div>
  );
};
export default Header;