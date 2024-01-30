const express=require("express");
const cors=require("cors")
const connectDatabase=require("./mongodb/connect.js");
const dotenv=require("dotenv");

const adminRouter=require("./routes/admin.js");
const userRouter=require("./routes/user.js");


dotenv.config();

const app=express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization'],
  }));
  



app.use("/admin", adminRouter)
app.use("/user" , userRouter)


const startServer = async () => {
    try {
      connectDatabase(process.env.MONGODB_URL);
      app.listen(5000, () => console.log('Server started on port 5000'));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();