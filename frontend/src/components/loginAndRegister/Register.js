import React, { useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {isFail, isLoading, isSuccess, loginSuccess} from '../redux/Slice/authSlice';
import GoogleLogin from 'react-google-login';

import axios from 'axios';
import URLBackend from '../utils/URLBackend';
const Register = () => {
    
    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const Repassword = useRef('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {url} = URLBackend();
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleRegister = async (e)=>{
        e.preventDefault();
        const user = {
            name:name.current.value,
            email:email.current.value,
            password:password.current.value
        }
        if(!user.name || !user.email || !user.password || !Repassword.current.value){
            return toast.error("Please fill in all fields.");
        }
        if(!validateEmail(email.current.value)){
            toast.error("Email is not correct form.");
            return;
        }
        if(password.current.value.length < 6){
            return toast.error("Password need more than 6 characters.");
        }
        if(password.current.value !== Repassword.current.value){
            toast.error("Pasword is not the same.");
            return;
        }
        const registerUser = async ()=>{
            dispatch(isLoading());
            try{
                const res = await axios.post(`${url}/auth/register`,user);
                dispatch(isSuccess());
                toast.success(res.data.msg);
            }
            catch(err){
                dispatch(isFail());
                toast.error(err.response.data.msg);
            }
        }
        registerUser();
        setTimeout(()=>{
            navigate('/login');
        },500);

    }

    const responseGoogle = async (response) => {
        dispatch(isLoading());
        try{
            const res = await axios.post(`${url}/auth/google_login`,{
                tokenId:response.tokenId
            });
            dispatch(loginSuccess(res.data));
            toast.success(res.data.msg);
        }
        catch(err){
            toast.error(err.response.data.msg);
        }
    }

  return (
    <div className='login_register_form'>
        <div className='login_register_form-container'>
            <div className='login_head w_100'>
                <h1>Đăng Ký</h1>
                <Link to='/login' className='Link'><h1 style={{color:"black"}}>Đăng Nhập</h1></Link>
            </div>
            <form onSubmit={handleRegister} className='form'>
            <div className='form_input'>
                    <input ref={name} type="text" placeholder='Name'/>
                </div>
                <div className='form_input'>
                    <input ref={email} type="text" placeholder='Email'/>
                </div>
                <div className='form_input'>
                    <input ref={password} type="password" placeholder='Password'/>
                </div>
                <div className='form_input'>
                    <input ref={Repassword} type="password" placeholder='Re-Password'/>
                </div>
                <div className='btn_input'>
                    <div className='google'>
                        <GoogleLogin
                        clientId="557695427692-6u7filu4ghl4tm2f9ohpfhjdjm5l3e9u.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <button type="submit">Đăng Ký</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register