import React from 'react'
import { Link } from 'react-router-dom';

const CourseCard = ({title,description,published,price,imgUrl,_id}) => {
    
  return (
    <div className='w-[20%] border border-black rounded-lg m-3 bg-slate-100'>
        <Link to={`/admin/editcourse/${_id}`}>
        <img className='w-[92%] m-3'
        src={imgUrl}/>
        <p className='text-xl font-medium ml-2'>{title}</p>
        <p className='text-lg font-medium ml-2'>{description}</p>
        <p className='text-lg font-medium ml-2'>{price}</p>
        </Link>
     
    </div>
  )
}

export default CourseCard;