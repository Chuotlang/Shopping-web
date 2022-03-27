import React, { useState } from 'react'
import './ProductContainer.css';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {createAxiosJWT} from '../redux/AxiosJWT';
import { isChangeInfor, isFail, isLoading, isSuccess, loginSuccess } from '../redux/Slice/authSlice';
import { toast } from 'react-toastify';
import URLBackend from '../utils/URLBackend';
const ProductContainer = ({product}) => {
    const auth = useSelector(state => state.auth);
    const [deletep,setDeletep] = useState(false);
    const dispatch = useDispatch();
    const {url} = URLBackend();
    const axiosJWT = createAxiosJWT(dispatch,loginSuccess,auth);

    const handleAddCart = async ()=>{
        if(!auth.user?.accessToken){
            return toast.error("Please login or register.");
        }
        dispatch(isLoading());
        try{
            const res = await axiosJWT.post(`${url}/auth/addcart`,{
                productId:product?._id
            },{
                headers:{
                    token:`Bearer ${auth?.user.accessToken}`
                }
            });
            dispatch(isChangeInfor());
            toast.success(res.data.msg);
        }
        catch(err){
            dispatch(isFail());
            toast.error(err.response.data.msg);
        }
    }


    const handleDelete =async () =>{
        dispatch(isLoading());
        try{
            const res = await axiosJWT.delete(`${url}/product/delete/${product?._id}`,{
                headers:{
                    token:`Bearer ${auth?.user.accessToken}`
                }
            })
            dispatch(isSuccess());
            toast.success(res.data.msg);
        }
        catch(err){
            dispatch(isFail());
            toast.error(err.response.data.msg);
        }
        setTimeout(()=>{
            window.location.reload()
        },1000)
    }

  return (
    <div className='col c-8 c-o-2 m-6 l-3'>
        <div className='product_container'>
            <Link to={product?.slug} className='Link'>
            <div className='image_product_container'>
                <img src={product?.image}/>
            </div>
            </Link>
            <div className='detail_container'>
                <div className='name_container'>
                    <Link to={product?.slug} className='Link'>
                        <h3>{product?.title}</h3>
                    </Link>
                </div>
                <div className='price_sold_container'>
                    <span>Price: ${product?.price}</span>
                    <span style={{color:"green"}}>Sold: {product?.sold}</span>
                </div>
                {auth.infor?.user.rule === 1 ?
                (<div className='button_admin'>
                    <button onClick={() => setDeletep(true)} style={{backgroundColor:"red"}}>Xóa</button>
                    <Link className='Link button_link' to={`/product/edit/${product?.slug}`}>
                        <button id='button_edit'>Sửa</button>
                    </Link>
                </div>)
                :
                (<div className='button_container'>
                    <button onClick={handleAddCart}>Thêm Vào Rỏ Hàng</button>
                </div>)
                }
            </div>
        </div>
        {deletep && (<div className='delete_container'>
            <div className='delete_confir'>
                <div className='title_confir'>
                    <span>Bạn có muốn xóa sản phẩm này không?</span>
                </div>
                <div className='btn_confir'>
                    <button onClick={handleDelete} style={{backgroundColor:"red",color:"white"}}>Xóa</button>
                    <button onClick={() => setDeletep(false)}>Hủy</button>
                </div>
            </div>
        </div>)}
    </div>
  )
}

export default ProductContainer