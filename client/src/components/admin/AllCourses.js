import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';

const AllCourses = () => {

  const [allCourses,setAllCourses]=useState([]);

  const getAllCourses=async()=>{
   const response=await fetch("http://localhost:5000/admin/courses",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
             'authorization':'Bearer ' +localStorage.getItem("token")
        },

    });

    const data=await response.json();
    console.log(data);
    setAllCourses(data.data)



  }

   useEffect(()=>{
     getAllCourses()
   },[])


 if(allCourses.length===0)return null
  return (
    <div className='flex flex-row flex-wrap' >
        {allCourses.map(data=> (
          <CourseCard {...data} key={data._id}  />
          
        
))}
      
    </div>
  )
}

export default AllCourses