const mongoose=require("mongoose");

const connectDatabase=(url)=>{
    console.log(url)

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Mongodb is connected"))
.catch((err)=>console.log(err));


}


module.exports=connectDatabase;

