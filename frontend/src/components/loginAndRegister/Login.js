import React, { useRef, useState } from 'react'
import './LoginAndRegister.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { isFail, isLoading, loginSuccess } from '../redux/Slice/authSlice';
import URLBackend from '../utils/URLBackend';
const Login = () => {

    const email = useRef('');
    const password = useRef('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const {url} = URLBackend();
    const handleLogin = e =>{
        e.preventDefault();
        const user ={
            email:email.current.value,
            password:password.current.value
        };
        if(!user.email || !user.password){
            return toast.error("Please fill in all fields.");
        }
        async function getData(){
            dispatch(isLoading());
            try{
                const User = await axios.post(`${url}/auth/login`,user);
                toast.success(User.data.msg);
                dispatch(loginSuccess(User.data));
                navigate('/');
            }
            catch(err){
                toast.error(err.response.data.msg);
                dispatch(isFail());
            }
        }
        getData();
    }
  return (
    <div className='login_register_form'>
        <div className='login_register_form-container'>
            <div className='login_head w_100'>
                <h1>Đăng Nhập</h1>
                <Link to='/register' className='Link'><h1 style={{color:"black"}}>Đăng Ký</h1></Link>
            </div>
            <form onSubmit={handleLogin} className='form'>
                <div className='form_input'>
                    <input ref={email} type="text" placeholder='Email'/>
                </div>
                <div className='form_input'>
                    <input ref={password} type="password" placeholder='Password'/>
                </div>
                <div className='btn_input'>
                    <button type='submit'>Đăng Nhập</button>
                </div>
                <div className='forgot_password'>
                    <Link to='/forgot_password' className='Link'><p style={{color:"red"}}>Forgot Password?</p></Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login