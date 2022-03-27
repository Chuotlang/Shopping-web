import React, { useRef } from 'react'
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {isFail, isLoading, isSuccess, loginSuccess} from '../redux/Slice/authSlice';
import {createAxiosJWT} from '../redux/AxiosJWT';
import {useNavigate} from 'react-router-dom';
import URLBackend from '../utils/URLBackend';
const ChangePassword = () => {

    const password = useRef();
    const Repassword = useRef();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const axiosJWT = createAxiosJWT(dispatch,loginSuccess,auth);
    const navigate = useNavigate();
    const {url} = URLBackend();

    const handleChangePassword = e =>{
        e.preventDefault();
        if(!password.current.value || !Repassword.current.value){
            return toast.error("Please fill in all fields.");
        }
        if(password.current.value !== Repassword.current.value){
            console.log({password,Repassword})
            return toast.error("Password and repassword is not the same.");
        }
        const changePassword =async () =>{
            dispatch(isLoading());
            try{
                const res = await axiosJWT.put(`${url}/auth/change_password`,{
                    password:password.current.value
                },{
                    headers:{
                        token:`Bearer ${auth?.user?.accessToken}`
                    }
                });
                dispatch(isSuccess());
                toast.success(res.data.msg);
            }
            catch(err){
                dispatch(isFail());
                return toast.error(err.response.data.msg);
            }
        }
        changePassword();
        setTimeout(()=>{
            navigate('/');
        },200);

    }
  return (
    <div className='login_register_form'>
        <div className='login_register_form-container'>
            <div className='forgot w_100'>
                <h1>Thay Đổi Mật Khẩu</h1>
            </div>
            <form onSubmit={handleChangePassword} className='form'>
                <div className='form_input'>
                    <input ref={password} type="password" placeholder='Password'/>
                </div>
                <div className='form_input'>
                    <input ref={Repassword} type="password" placeholder='Re-Password'/>
                </div>
                <div className='btn_input'>
                    <button type="submit">Đổi Mật Khẩu</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword