const express=require('express');
const userRouter=express.Router();
const passport=require('passport');
const passportConfig=require('../../../../passport');       
const JWT=require('jsonwebtoken');
const User=require('../../models/customer'); 

const signToken=userID=>{
    return JWT.sign({
        iss: "SmartVMC",
        sub: userID
    },"SmartVMC",{expiresIn:"1h"});
}

userRouter.post('/register',(req,res)=>{
    const{username,password,phoneNo,email,address,orderList}=req.body;
  //  console.log(req.body);
    User.findOne({username},(err,user)=>{
      //  console.log(err);
        if(err)
            res.status(500).json({message: {msgBody: "Error Has Occured",msgError: true}});
        else if(user) //if username already exists
            {
                res.status(400).json({message: {msgBody: "Username has already been taken",msgError: true}});
            }
        else
        {
            const newUser=new User({username,password,phoneNo,address,email,orderList});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody: "Error Has Occured",msgError: true}});
                else
                    res.status(201).json({message: {msgBody: "Account Successfully Created",msgError: false}});
            })
        }
    });
    });

//login route
// userRouter.post('/login',passport.authenticate('local',{session: false}),(req,res)=>{
//     if(req.isAuthenticated()){
//         const {_id,username}=req.user;
//         const token=signToken(_id);
//         res.cookie('access_token',token,{httpOnly: true, sameSite:true});
//         res.status(200).json({isAuthenticated: true, user:{username}});
//     }
// });


module.exports= userRouter;