import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Categary from '../CategaryAndSort/Categary';
import Sorting from '../CategaryAndSort/Sorting';
import ContainerProduct from '../products/ContainerProduct';
import {isFail, isLoading, isSuccess} from '../redux/Slice/authSlice';
import {toast} from 'react-toastify';
import axios from 'axios';
import './HomePage.css';
import Page from '../page/Page';
import { useLocation } from 'react-router-dom';
import URLBackend from '../utils/URLBackend';
const HomePage = React.memo(({cache}) => {

  const {search} = useLocation();
  const [data,setData] = useState();
    const {url} =URLBackend();
    const dispatch = useDispatch();



  useEffect(()=>{
    const page = new URLSearchParams(search).toString();
    const urL = `${url}/product/getall?${page}`;
    if(cache.current[urL]){
        return setData(cache.current[urL]);
    }
    const getData = async () => {
      dispatch(isLoading());
      try{
          const res = await axios.get(urL);
          cache.current[urL] = res.data;
          setData(res.data);
          dispatch(isSuccess());
      }
      catch(err){
          dispatch(isFail());
          toast.error(err.response.data.msg);
      }
    }
    getData();
  },[search]);

  
  

  return (
    <div className='grid wide'>
      <div className='row'>
        <div className='col m-12 c-12 l-12'>
            <div className='model_container'>
              <Categary count={data?.count}/>
              <Sorting count={data?.count}/>
            </div>
        </div>
        <ContainerProduct product={data?.product} />
      </div>
      <Page count={data?.count} cache={cache} />
    </div>
  )
})

export default HomePage