import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {isFail, isLoading, isSuccess} from '../redux/Slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
import URLBackend from './URLBackend';
const ActiveMail = () => {
    const {activetoken} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {url} = URLBackend();

    useEffect(()=>{
      const activeMail = async ()=>{
        dispatch(isLoading());
        try{
          const res = await axios.post(`${url}/auth/active/${activetoken}`,"");
          dispatch(isSuccess());
          toast.success(res.data.msg);

        }
        catch(err){
            dispatch(isFail());
            toast.error(err.response.data.msg);
        }
      }
      activeMail();
      setTimeout(()=>{
        navigate('/login');
      },200);
    },[]);

  return (
    <div>
        Active success
    </div>
  )
}

export default ActiveMail