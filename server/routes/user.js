const mongoose=require("mongoose");
const express=require("express");

const User=require("../mongodb/models/users.js");
const Admin=require("../mongodb/models/admin.js");
const Course=require("../mongodb/models/courses.js");

const {generateJwt,authenticateJwt}=require("../middleware/auth.js");



const router = express.Router();


router.post("/signup",async(req,res)=>{
    try {
        const {username,password} = req.body;
        const existingUser = await User.findOne({username});
        if (existingUser) {
          res.status(403).json({ message: 'User already exists' });
        } else {
          const newUser= new User(req.body);
          await newUser.save();
          const token = generateJwt(newUser);
          res.json({ message: 'User created successfully', token,newUser });
        } 
    } catch (error) {
        res.status(500).json({message:error});
        
    }
  

})

router.post("/login",authenticateJwt,(req,res)=>{
    res.json({message:"Logged in successfully"});
})


router.get("/courses",authenticateJwt,async(req,res)=>{
    try {
        await Course.find({published:true})
        .then((data)=>res.json({data}));
    } catch (error) {
        res.status(500).json({message:error})
    }
   
})

router.post("/courses/:courseId",authenticateJwt,async(req,res)=>{
     try {
        const courseId=req.params.courseId;
        const course=await Course.findById(courseId);
        if(course){
            // console.log(req.user.username,"this is the user")
            const foundUser=await User.findOne({username:req.user.username});
            if(foundUser){
                foundUser.purchasedCourses.push(course);
                await foundUser.save()
                res.json({message:"course purchased successufully",course,foundUser});
            }else{
                res.status(404).json({message:"user not found"});
            }


        }
        else{
            res.status(404).json({message:"Course doesn't exist"});
        }
     } catch (error) {
        res.status(500).json({message:error});
     }




});

router.get("/purchasedCourses",authenticateJwt,async(req,res)=>{
    try {
        const foundUser=await User.findOne({username:req.user.username})
        .populate('purchasedCourses');

         if(foundUser){
           res.json({courses:foundUser.purchasedCourses ||[]})
         }else{
            res.status(404).json({message:"User Not Found"})
         }
    } catch (error) {
        res.status(500).json({message:error})
    }

});


module.exports=router;