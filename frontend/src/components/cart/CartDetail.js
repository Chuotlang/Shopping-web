import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux';
import {isChangeInfor, isFail, isLoading, loginSuccess} from '../redux/Slice/authSlice';
import {createAxiosJWT} from '../redux/AxiosJWT';
import { toast } from 'react-toastify';
import URLBackend from '../utils/URLBackend';

const CartDetail = React.memo(({product}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const {url} =URLBackend();
    const AxiosJWT = createAxiosJWT(dispatch,loginSuccess,auth);
    const handleRemoveProduct =async () => {
        dispatch(isLoading());
        try{
            const res = await AxiosJWT.post(`${url}/auth/unaddcart`,{
                productId:product._id
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
  return (
    <div className='cart_infor'>
        <div className='row'>
            <div className='col c-4 m-4 l-4'>
                <div className='image_cart'>
                    <img src={product.image}/>
                </div>
            </div>
            <div className='col c-8 m-8 l-8'>
                <div className='name_cart'>
                    <h1>{product.title}</h1>
                </div>
                <div className='description_cart'>
                    <span>{product.description}</span>
                </div>
                <div className="price_cart">
                    <span>Price:${product.price}</span>
                    <span>{product.categary}</span>
                    <span>Sold:{product.sold}</span>
                </div>
                <div className='buy_cart'>
                    <button>Mua</button>
                    <select>
                        <option>Số Lượng</option>
                        {[...Array(product.sold)].map((_,i) => (
                            <option value={i+1} key={i}>{i+1}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div onClick={handleRemoveProduct} className='cancel_cart'>
            <FontAwesomeIcon icon={faTimes} />
        </div>
    </div>
  )
})

export default CartDetail