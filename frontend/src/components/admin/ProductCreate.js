import React, { useRef, useState } from 'react'
import "./ProductCreate.css";
import axios from 'axios';
import {isFail, isLoading, isSuccess, loginSuccess} from '../redux/Slice/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {createAxiosJWT} from '../redux/AxiosJWT';
const ProductCreate = () => {

    const [image,setImage] = useState();
    const [Img,setImg] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const axiosJWT = createAxiosJWT(dispatch,loginSuccess,auth);
    var Image;

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

    const title = useRef();
    const description = useRef();
    const price = useRef();
    const sold = useRef();
    var categary = useRef("man");

    const handleImage = (e) =>{
        const url = URL.createObjectURL(e);
        setImage(url);
        setImg(e)
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
                const res = await axiosJWT.post("/product/create",{
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
        },400)
    }
  return (
    <div className='c-8 l-8 m-8 c-o-2 m-o-2 l-o-2'>
        <div className='admin_create'>
            <div className='name_create'>
                <h1>Create Product</h1>
            </div>
            <div className='row'>
                <div className='col c-3 m-3 l-3'>
                    <div className='image_create'>
                        <img src={image ? image : "https://res.cloudinary.com/dqbrxkux1/image/upload/v1648198477/ProductImage/fkl0fksf0b1uponz7k0w.jpg"} />
                        <div className='file_create'>
                            <input onChange={e => handleImage(e.target.files[0])} type="file" />
                        </div>
                    </div>
                </div>
                <div className='col c-9 l-9 m-9'>
                    <form onSubmit={handleCreateProduct} className='detail_create'>
                        <div className='title_create'>
                            <input ref={title} type="text" placeholder='Title' />
                        </div>
                        <div className='decsription_create'>
                            <textarea ref={description} placeholder='Decsription' />
                        </div>
                        <div className='title_create'>
                            <input ref={price} type="number" placeholder='Giá' />
                        </div>
                        <div className='title_create'>
                            <input ref={sold} type="number" placeholder='Số lượng' />
                        </div>
                        <div className='select_create'>
                            <select onChange ={ e => categary.current = e.target.value}>
                                <option value="man">Nam</option>
                                <option value="woman">Nữ</option>
                                <option value="animal">Động Vật</option>
                            </select>
                        </div>
                        <div className='button_create'>
                            <button type="submit">Tạo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCreate