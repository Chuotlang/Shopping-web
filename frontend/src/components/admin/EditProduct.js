import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAxiosJWT } from '../redux/AxiosJWT';
import { isFail, isLoading, isSuccess, loginSuccess } from '../redux/Slice/authSlice';
import URLBackend from '../utils/URLBackend';
const EditProduct = ({cache}) => {
    const {slug} = useParams();
    const [image,setImage] = useState();
    const [Img,setImg] = useState();
    const [data,setData] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const title = useRef();
    const description = useRef();
    const price = useRef();
    const sold = useRef();
    var categary = useRef("man");
    const axiosJWT = createAxiosJWT(dispatch,loginSuccess,auth);
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


    const fileUpload = async () =>{
        const formData =new FormData();
        formData.append("file",Img);
        formData.append("upload_preset","bgcfzrkw");
        dispatch(isLoading());
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/dqbrxkux1/image/upload",formData);
            dispatch(isSuccess());
            Image = res.data.url;
        }
        catch(err){
            dispatch(isFail());
        }
    }

    const handleImage = (e) =>{
        const url = URL.createObjectURL(e);
        setImage(url);
        setImg(e);
    }
    const handleCreateProduct =async (e) =>{
        e.preventDefault();
        const product = {
            title:title.current.value,
            description : description.current.value,
            price : price.current.value,
            sold:sold.current.value,
            categary:categary.current
        };
        if(!product.title || !product.description || !product.price || !product.sold){
            return toast.error("Please fill in all fields.");
        }
        await fileUpload();

        const addProduct = async ()=>{
            dispatch(isLoading());
            try{
                const res = await axiosJWT.put(`/product/update/${slug}`,{
                    title:title.current.value,
                    description : description.current.value,
                    price : price.current.value,
                    sold:sold.current.value,
                    categary:categary.current,
                    image:Image
                },{
                    headers:{
                        token:`Bearer ${auth?.user.accessToken}`
                    }
                });
                dispatch(isSuccess());
                toast.success(res.data.msg);
            }
            catch(err){
                dispatch(isFail());
                toast.error(err.response.data.msg);
            }
        }
        addProduct();
        setTimeout(()=>{
            window.location.reload();
        },1000)
        
    }

  return (
    <div className='c-8 l-8 m-8 c-o-2 m-o-2 l-o-2'>
        <div className='admin_create'>
            <div className='name_create'>
                <h1>Edit Product</h1>
            </div>
            <div className='row'>
                <div className='col c-3 m-3 l-3'>
                    <div className='image_create'>
                        <img src={image ? image : data?.image} />
                        <div className='file_create'>
                            <input onChange={e => handleImage(e.target.files[0])} type="file" />
                        </div>
                    </div>
                </div>
                <div className='col c-9 l-9 m-9'>
                    <form onSubmit={handleCreateProduct} className='detail_create'>
                        <div className='title_create'>
                            <input defaultValue={data?.title} ref={title} type="text" placeholder='Title' />
                        </div>
                        <div className='decsription_create'>
                            <textarea defaultValue={data?.description} ref={description} placeholder='Decsription' />
                        </div>
                        <div className='title_create'>
                            <input defaultValue={data?.price} ref={price} type="number" placeholder='Giá' />
                        </div>
                        <div className='title_create'>
                            <input defaultValue={data?.sold} ref={sold} type="number" placeholder='Số lượng' />
                        </div>
                        <div className='select_create'>
                            <select onChange ={ e => categary.current = e.target.value}>
                                <option selected={data?.categary === "man" ? "selected":''} value="man">Nam</option>
                                <option selected={data?.categary === "woman" ? "selected":''} value="woman">Nữ</option>
                                <option selected={data?.categary === "animal" ? "selected":''} value="animal">Động Vật</option>
                            </select>
                        </div>
                        <div className='button_create'>
                            <button type="submit">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProduct