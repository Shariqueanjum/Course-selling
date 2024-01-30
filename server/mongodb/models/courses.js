const mongoose=require("mongoose");

const coursesSchema=new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imgUrl: String,
  published: Boolean

})

const Course=mongoose.model("Course",coursesSchema);

module.exports=Course;