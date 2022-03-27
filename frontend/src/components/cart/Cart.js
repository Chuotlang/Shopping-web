import React, { useEffect, useMemo } from 'react'
import './Cart.css'
import CartDetail from './CartDetail'
import {useSelector} from 'react-redux'
import Money from './Money'
const Cart = () => {
    const auth = useSelector(state => state.auth);
    
    const total = useMemo(()=>{
        const num = auth?.infor?.user?.cart.reduce((value,items) =>{
            return value += items.price;
        },0);
        return num;
    },[])
  return (
    <div className='grid wide'>
        <div className='col c-12 m-12 l-12'>
            <div className='cart_container'>
                <div className="row">
                    <div className='col c-8 m-8 l-8'>   
                        {auth?.infor?.user.cart?.map((product,index) => (
                            <CartDetail key={index +"s"} product={product}/>
                        ))}
                    </div>
                    <div className='col c-3 m-3 l-3 l-o-1 m-o-1 c-o-1'>
                        <div className='money_container'>
                            {auth?.infor?.user.cart.map((items,index) => (
                                <Money key={index + "z"} product={items}/>
                            ))}
                            <hr />
                            <div className='total_price'>
                                <span>Tổng</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart