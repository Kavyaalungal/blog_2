import bcrypt from "bcrypt";
import userSchema from "./schema/user.schema.js";
import blogSchema from "./schema/blog.schema.js"

import jwt from "jsonwebtoken";

const { sign } = jwt;






export async function register(req,res){
    try {
        let {username,email,password,profile} = req.body;
        if(username.length < 4 && password.length < 4){
            return res.json("Invalid username or password");
        }
        let userExist = await userSchema.findOne({username});
        let hashedpass = await bcrypt.hash(password,10);
        if(userExist){
            return res.status(401).send("User already exists");
        }
        let result = await userSchema.create({username,email, password: hashedpass,profile});
        if(result){
            return res.status(200).send("Registration successful!");
        }
        return res.status(400).send("file could not be uploaded")
        
    } catch (error) {
        console.log(error);
       res.status(500).send("Error");
        
    }
 }

 export async function login(req, res){
    try {
        let {username,password} = req.body;
        if(username.length < 4 && password.length < 4){
            return res.json("Invalid username or password");
        }
        let user = await userSchema.findOne({username});
        if(!user){
            return res.status(403).send("Invalid username or password");
        }
        let passCheck = await bcrypt.compare(password, user.password)
        if(passCheck){
            let token = await sign({
                username: user.username,
                id:user._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"24h"
            })
            return res.status(200).json({
                msg:"Login successful",
                token:token
        })
        }
        return res.status(403).send("inavlid username or password");        

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
 }



export async function addBlog(req,res){
    try{
        let {title,description,file }= req.body;
         let { id } = req.user;
        let result = await blogSchema.create({
            title,
            description,
            file,
            userId:id
           
         
        })
         if(result){
           return res.json(" Blog added successfully! Thank you!");
         }
        return res.json("error in uploading")
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Error");
    }
 }





 export async function  getBlog(req,res){
    try{
        let { id } = req.user;
        let result=await blogSchema.find({userId:id});
        console.log(result)
        if(result.length > 0){
            return res.status(200).send(result)

        }
        return res.status(200).send({msg:"No Blog to show"})
    }
    catch(error){
        console.log(error)
        return res.status(500).send("Error occured")
    }
 }

export async function profile(req,res){
    try{
        let user = req.user;
let userDetails = await userSchema.findOne({ _id: user.id }, { password: 0, _id: 0 });

        if(userDetails){
            return res.json(userDetails);
        }
        return res.status(404).send("User not found");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
 }

 export async function  getfile(req,res){
    try {
        let data=await blogSchema.find();
        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).send("error occured")
    }
}

export async function  getProfile(req,res){
    try{
        let {id}=req.user;
        let result=await userSchema.find({_id:id});
        console.log(result)
        if(result.length > 0){
            return res.status(200).send(result)

        }
        return res.status(200).send({msg:"Your Profile is loading..."})
    }
    catch(error){
        console.log(error)
        return res.status(500).send("Error occured")
    }
}
