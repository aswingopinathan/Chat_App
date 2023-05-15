const userModel = require('../models/userModel')
const { generateToken } = require('../utils/tokenGenerator')
module.exports = {
    registerUser:async(req,res)=>{
        console.log("registerUser working");
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.status(400)
            throw new Error("Please fill all the fields")
        }

        const userExists = await userModel.findOne({email:email})

        if(userExists){
           return res.status(400).json({message:"user already exists"})
        }
        console.log("req.files",req.files);
        // const pic = req.files[0].path
        // const user = await userModel.create({
        //     name:name,
        //     email:email,
        //     password:password,
        //     pic:pic,
        // })
        // if(user){
        //     console.log('user registered successfully!');
        //     res.status(201).json({
        //         id:user._id,
        //         name:user.name,
        //         email:user.email,
        //         pic:user.pic,
        //         token:generateToken(user._id)
        //     })
        // }else{
        //     res.status(400).json({message:"failed to create user"})
        // }
            res.status(400).json({message:"failed to create user"})

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
        const keyWord = req.query.search ? {
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
            ]
        }:{}
        const users = await userModel.find(keyWord)
        res.send(users)
    }
}