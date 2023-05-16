const userModel = require('../models/userModel')
const { generateToken } = require('../utils/tokenGenerator')
module.exports = {

    registerUser:async(req,res)=>{
        console.log("registerUser working");
       try {
        const { name, email, password} = req.body;
        if(!name || !email || !password || !req.files[0].path){
            res.status(400)
            throw new Error("Please fill all the fields")
        }

        const userExists = await userModel.findOne({email:email})

        if(userExists){
           return res.status(400).json({message:"user already exists"})
        }

        console.log("req.files",req.files);
        const genPic = req.files[0].path

        const user = await userModel.create({
            name:name,
            email:email,
            password:password,
            pic:genPic,
        })
        if(user){
            console.log('user registered successfully!');
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                token:generateToken(user._id)
            })
        }else{
            res.status(400).json({message:"failed to create user"})
        }

       } catch (error) {
        console.log('error',error);
        res.status(400).json({message:"failed to create user"})
       }

    },
    authUser:async(req,res)=>{
        try {
            const { email, password} =req.body;
            const user =await userModel.findOne({email})
            if(user && (await user.matchPassword(password))){
                res.status(200).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic,
                    token:generateToken(user._id)
                })
            }else{
                res.status(401).json({message:"invalid email or password"})
            }
        } catch (error) {
            console.log('error',error);
        }
    },
    searchUser:async(req,res)=>{
        console.log("searchUser working");

       try {
        const keyWord = req.query.search ? {
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
            ]
        }:{}
        const users = await userModel.find(keyWord).find({_id:{$ne:req.user._id}})

        if(users.length>0){
            res.send(users)
        }else{
            throw new Error("user not found")
        }
       } catch (error) {
        console.log(error.message);
        res.send(error.message)
       }
    }
}