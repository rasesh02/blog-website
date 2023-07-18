import User from "../model/User";
import bcrypt from 'bcryptjs';
export const getAllUser=async(req,res,next)=>{
    let users;
    try{
       users= await User.find();
    }catch(err){ 
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No user found"});
    }
    return res.status(200).json({users});
};
export const signup= async(req,res,next)=>{
    const {name, email, password} =req.body;
    // to check during signup if the user is new or existing one
    let existingUser;
    try{
        //if email exists mean user is already present
       existingUser= await User.findOne({email});
    }
    catch(err){
      return console.log(err);
    }
    if(existingUser) {
        res.status(400).json({message:"User already exists"})
    }
    // else if user doesnt exist so we will create new user
    const hashedPassword=bcrypt.hashSync(password);
    const user= new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });

    //save the new user
    try{
    await user.save();
    }catch(err){
     return console.log(err);
    }
    return res.status(201).json({user});

};
// login 
export const login= async(req,res,next)=>{
    const {email, password} =req.body;
    let existingUser;
    try{
       existingUser= await User.findOne({email});
    }
    catch(err){
      return console.log(err);
    }
    if(!existingUser) {
        res.status(404).json({message:"User not found"});
    }
    // now email is of user trying to login is present in db
    // have to check password
    //for this we have a function(comparesync) in bcrypt
    const isPasswordCorrect= bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message:"Incorrect Password"});
    }
    return res.status(200).json({message:"Login Successful", user: existingUser});
}