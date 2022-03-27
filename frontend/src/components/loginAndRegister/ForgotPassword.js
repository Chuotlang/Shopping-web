import React, { useRef } from 'react'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {isFail, isLoading, isSuccess} from '../redux/Slice/authSlice';
import axios from 'axios';
import URLBackend from '../utils/URLBackend';
const ForgotPassword = () => {

    const email = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {url} = URLBackend();
    const handleForgot = e =>{
        e.preventDefault();
        if(!email.current.value){
            return toast.error("Please fill in all fields.");
        }

        const forgotPassword =async () =>{
            dispatch(isLoading());
            try{
                const res = await axios.post(`${url}/auth/forgot_password`,{
                    email:email.current.value
                });
                dispatch(isSuccess());
                toast.success(res.data.msg);
            }
            catch(err){
                dispatch(isFail());
                return toast.error(err.response.data.msg);
            }
        }
        forgotPassword();
        setTimeout(()=>{
            navigate('/');
        },200);
    }
  return (
    <div className='login_register_form'>
        <div className='login_register_form-container'>
            <div className='forgot w_100'>
                <h1>Quên Mật Khẩu</h1>
            </div>
            <form onSubmit={handleForgot} className='form'>
            <div className='form_input'>
                    <input ref={email} type="text" placeholder='Email'/>
                </div>
                <div className='btn_input'>
                    <button type="submit">Quên Mật Khẩu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword