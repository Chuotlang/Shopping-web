import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { loginSuccess } from '../redux/Slice/authSlice';
const ForgotPasswordMail = () => {
    const {activetoken} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    useEffect(()=>{
      dispatch(loginSuccess({
        ...auth?.user,
        accessToken:activetoken
      }));
      navigate('/change_password');
    },[]);

  return (
    <div>
        {activetoken}
    </div>
  )
}

export default ForgotPasswordMail