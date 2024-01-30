import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const Login = () => {


const [username , setUsername]=useState("");
const [password , setPassword]=useState("");

const navigate=useNavigate()

const handleFormData=async()=>{

  const result=  await fetch("http://localhost:5000/admin/login",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({username,password})
    })
  const data=await result.json();
  console.log(data);
   setUsername("");
   setPassword("");
   localStorage.setItem("token",data.token)
   if(data){
    navigate("/admin/allcourses")
   }

}


  return (
  
   <>
    <div className="w-[30%] border border-black ml-80 mt-36 rounded-md">
    
    <form onSubmit={(e)=>e.preventDefault()}
    className="w-[80%]">
     
     <input className="w-[70%] ml-16 mt-4 mb-4 p-3 border border-gray-300 rounded-md" 
     type="text" 
     placeholder="Enter your Username"
     value={username}
     onChange={(e)=>setUsername(e.target.value)}/>

     <input className="w-[70%] p-3 ml-16 mt-4 mb-4 border border-gray-300 rounded-md" 
     type="password" 
     placeholder="Enter your Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}/>


     <button 
     onClick={handleFormData}
     className="w-[70%] p-3 ml-16 mt-4 mb-4 border border-gray-300 rounded-md">
        Login
     </button>
    

    </form>

    </div>
    <p><Link to={"/"}>Go back Home Page</Link></p>
    </>
    
  )
}

export default Login ;