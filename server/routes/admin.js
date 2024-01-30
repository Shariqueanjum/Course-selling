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
        const existingAdmin = await Admin.findOne({username});
        if (existingAdmin) {
          res.status(403).json({ message: 'Admin already exists' });
        } else {
           const newAdmin=new Admin({username,password});
           await newAdmin.save();
          const token = generateJwt(newAdmin);
          res.json({ message: 'Admin created successfully', token ,newAdmin });
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error})
        
    }

})

router.post("/login", async(req,res)=>{
    try {
      const {username,password} = req.body;
      const admin = await Admin.findOne({username ,password});
      if (admin) {
         const token=generateJwt(admin);
         res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' })
      }  
    } catch (error) {
      console.log(error)
        res.status(500).json({message:error})
    }
  
  })


router.post("/courses",authenticateJwt,async(req,res)=>{
    try {
     
        const course = req.body;
        const newCourse=new Course(req.body);
        await newCourse.save();
        console.log(newCourse , "course just created")
       res.json({ message: 'Course created successfully', courseId: newCourse._id,newCourse });

    } catch (error) {
        res.status(500).json({message:error})
    }

})

router.put("/course/:courseId",authenticateJwt,async(req,res)=>{

    try {
        const courseId=(req.params.courseId);
       const course=await Course.findByIdAndUpdate(courseId,req.body,{new:true})
     
        if(course){
         res.status(200).json({message:"Course updated Successfully"});
        }else{
         res.status(403).json({message:"Such Course doesnot exist"})
     
        }
        
    } catch (error) {
        res.status(500).json({message:error});
    }


})

router.get("/course/:courseId",authenticateJwt,async(req,res)=>{
    try {
        const courseId=req.params.courseId;
        const course=await Course.findById(courseId);
        if(course){
            res.status(200).json({message:"Here is the course you searched for",course})
        }else{
            res.status(403).json({message:"Such Course doesnot exist"})
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
})


router.get("/courses",authenticateJwt,async(req,res)=>{
    try {
     const data= await Course.find({})
         res.json({data})
     
    } catch (error) {
      res.status(500).json({message:error})
    }
  
      
  })


module.exports=router;