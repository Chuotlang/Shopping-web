import React, { useEffect, useState } from 'react'
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon,faMagnifyingGlass,faHippo,faOtter ,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux';
import { createAxiosJWT } from '../redux/AxiosJWT';
import { isFail, isLoading, isSuccessInfor, loginSuccess, logOutSuccess } from '../redux/Slice/authSlice';
import { toast } from 'react-toastify';
import URLBackend from '../utils/URLBackend';
const Header = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); 
    const axiosJWT =  createAxiosJWT(dispatch,loginSuccess,auth);
    const axiosJWTLogOut =  createAxiosJWT(dispatch,logOutSuccess,auth);
    const navigate = useNavigate();
    const {url} =URLBackend();

    const [user,setUser] = useState();

    useEffect(()=>{
        const getData =async () =>{
            dispatch(isLoading());
            try{
                const res = await axiosJWT.get(`${url}/auth/me`,{
                    headers:{
                        token:`Bearer ${auth?.user?.accessToken}`
                    }
                });
                dispatch(isSuccessInfor(res.data));
                setUser(res.data);
            }   
            catch(err){
                dispatch(isFail());
                toast.error(err?.response?.data?.msg);
            }
        }
        if(auth?.user){
            getData();
        }
    },[auth?.user,auth.isChange]);
    

    const handleLogOut =async() =>{
        dispatch(isLoading());
        try{
            const res = await axiosJWTLogOut.post(`${url}/auth/logout`,"",{
                headers:{
                    token:`Bearer ${auth?.user?.accessToken}`
                }
            })
            dispatch(logOutSuccess());
            toast.success(res.data.msg);
        }
        catch(err){
            dispatch(isFail());
            toast.error(err.response.data.msg);
        }
        setTimeout(()=>{
            navigate('/login');
        },300)
    }


    const handleSearch = e =>{
        if(e.target.value.length === 0){
            return navigate('/');
        }
        navigate(`?search=${e.target.value}`);
    }
    return (
    <div className='grid wide h_100'>
        <div className='row h_100'>
            <div className='col l-3 c-3 m-3 h_100'>
                <Link to="/" className='Link'><div style={{cursor:"pointer"}} className='brand_container h_100 w_100'>
                    <FontAwesomeIcon icon={faDragon} />
                    <h1>Dragon Shop</h1>
                </div>
                </Link>
            </div>
            <div className='col c-6 m-6 l-6 h_100'>
                <div className='input-head w_100 h_100'>
                    <div className='input-form w_100'>
                        <input onChange={handleSearch} type="text" />
                        <div className='search-form'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col c-3 m-3 l-3 h_100'>
                    {!user ? (
                    <div className='auth-container w_100'>
                        <ul>
                            <li className='no_user'>
                                <Link to='/login' className='Link'>
                                    <FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faHippo} />    
                                    Đăng Nhập
                                </Link>
                            </li>
                            <li className='no_user'>
                                <Link to='/register' className='Link'>
                                    <FontAwesomeIcon style={{marginRight:"0.5rem"}} icon={faOtter} />   
                                    Đăng Ký
                                </Link>
                            </li>
                        </ul>
                    </div>
                    ):
                    (
                    <div className='user-container w_100'>
                        <ul>
                            <li className="user">
                                <img className='avatar_user' src={user.user.avatar}/>
                            </li>
                            <li className="user">
                                <span>{user.user.name}</span>
                            </li>
                        </ul>
                        <div className='user_infor'>
                            <ul>
                                <li onClick={handleLogOut}>Đăng Xuất</li>
                                <li>Thông Tin</li>
                                <Link to='/change_password' className='Link'>
                                    <li>Đổi Mật Khẩu</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    )}
                <div className='cart-container w_100'>
                    <Link to="/cart" className='Link'><FontAwesomeIcon icon={faCartShopping} /></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header