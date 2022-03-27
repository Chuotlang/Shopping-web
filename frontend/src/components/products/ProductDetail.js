import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetail.css'
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux'
import axios from 'axios';
import {isFail, isLoading, isSuccess} from '../redux/Slice/authSlice';
import URLBackend from '../utils/URLBackend';
const ProductDetail = ({cache}) => {
    const {slug} = useParams();
    const [data,setData] = useState();
    const dispatch = useDispatch();
    const {url} = URLBackend();

    useEffect(()=>{
        const urL = `${url}/product/get/${slug}`;
        if(cache.current[urL]){
            return setData(cache.current[urL]);
        }
        const getData = async () =>{
            dispatch(isLoading());
            try{
                const res = await axios.get(urL);
                dispatch(isSuccess());
                cache.current[urL] = res.data;
                setData(res.data);
            }
            catch(err){
                dispatch(isFail());
                toast.error(err.response.data.msg);
            }
        }
        getData();
    },[slug]);
  return (
    <div className='grid wide'>
        <div className='col c-12 m-12 l-12'>
            <div className='product_detail'>
                <div className='row'>
                    <div className='col c-12 m-12 l-6'>
                        <div className='product_detail_image'>
                            <img src={data?.image}/>
                        </div>
                    </div>
                    <div className='col c-12 m-12 l-6'>
                        <div className='product_detail_infor'>
                            <div className='detail_title'>
                                <h1>{data?.title}</h1>
                            </div>
                            <div className='detail_description'>
                                <span>{data?.description}</span>
                                </div>
                            <div className='detail_price'>
                                <span>Price : ${data?.price}</span>
                                <span style={{fontSize:"2.5rem"}}>{data?.categary}</span>
                                <span>Sold : {data?.sold}</span>
                            </div>
                            <div className='detail_add'>
                                <button type="submit">Thêm Vào Rỏ Hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  )
}

export default ProductDetail