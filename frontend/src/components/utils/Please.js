import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Please = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        toast.error("Please login.");
        navigate('/login');
    },[]);
  return (
    <div>Please</div>
  )
}

export default Please