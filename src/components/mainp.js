import React from "react"

import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export const mainp=()=> {
  return (
    <div>

<Card sx={{ width: "40%",margin:'auto', padding:2,mt:2,boxShadow: "5px 5px 10px #ccc",
":hover":{boxShadow: "10px 10px 20px #ccc"} }} >
  <CardActionArea>
    <CardMedia
      component="img"
      height="400"
      image="https://cdn.britannica.com/79/165579-138-27764E9E/Komodo-dragons-handful-Indonesia-Lesser-Sunda-Islands.jpg?w=800&h=450&c=crop"
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary" >
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>

<Card sx={{ width: "40%",margin:'auto', padding:2,mt:2,boxShadow: "5px 5px 10px #ccc",
":hover":{boxShadow: "10px 10px 20px #ccc"} }} >
  <CardActionArea>
    <CardMedia
      component="img"
      height="400"
      image="https://media.istockphoto.com/id/1177886278/photo/barbecue-camping.jpg?s=612x612&w=0&k=20&c=XeciPnJ8B-l83kb6Sf5vzL1xPBfMHPFc9GVOydQG3e0="
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        My first barbe
      </Typography>
      <Typography variant="body2" color="text.secondary" >
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
    </div>
  )
}
export default mainp;