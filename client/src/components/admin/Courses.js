import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Courses = () => {

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [imgUrl,setImgUrl]=useState("");
    const [published,setPublished]=useState("");

    const navigate=useNavigate();



    const handleFormData=async()=>{
       
       const response=await fetch("http://localhost:5000/admin/courses",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                 'authorization':'Bearer ' +localStorage.getItem("token")
            },
            body:JSON.stringify({title,description,price,imgUrl,published})
        });
        const data=await response.json();
        console.log(data);

        setTitle("");
        setDescription("");
        setPrice("");
        setImgUrl("");
        setPublished("");
        navigate("/admin/allcourses");

      



    }


  return (
    <>
    <p className='text-3xl font-bold text-purple-400 ml-12'>Enter the deatails of the course which you want to published</p>
    <div className='w-1/2 border border-gray-500 rounded-xl ml-48 mt-24'>
        <form  onSubmit={(e)=>e.preventDefault()}
        className='w-full '>
            <input className='p-3 m-4 ml-12 w-[85%] border border-gray-400 rounded-xl' 
            type='text' 
            placeholder='Enter Course Title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>

            <input className='p-3 m-4 ml-12 w-[85%] border border-gray-400 rounded-xl' 
            typpe='text' 
            placeholder='Enter description' 
            value={description}
            onChange={(e)=>setDescription(e.target.value)}/>

            <input className='p-3  m-4 ml-12 w-[85%] border border-gray-400 rounded-xl' 
            type='number' 
            placeholder='Enter the price'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}/>

            <input className='p-3 m-4 ml-12 w-[85%] border border-gray-400 rounded-xl' 
            type='text' 
            placeholder='Img Url'
            value={imgUrl}
            onChange={(e)=>setImgUrl(e.target.value)}/>

            <input className='p-3 m-4 ml-12 w-[85%] border border-gray-400 rounded-xl' 
            type='text'  
            placeholder='Published or Not'
            value={published}
            onChange={(e)=>setPublished(e.target.value)}/>

            <button onClick={handleFormData}
            className='p-3 m-4 ml-12 w-[85%] border border-gray-400 rounded-xl text-lg'>
                Submit to create a new course
            </button>
        </form>
       

    </div>
    </>
  )
}

export default Courses