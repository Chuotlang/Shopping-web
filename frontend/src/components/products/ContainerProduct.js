import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import CreateProduct from './CreateProduct';
import ProductContainer from './ProductContainer'

const ContainerProduct = React.memo(({product}) => {

    const auth = useSelector(state => state.auth);
  return (
    <div className='col c-12 m-12 l-12'>
        <div className='row'>
            {product?.map(items => (
              <ProductContainer key={items._id} product={items}  />
            ))}
            {auth?.infor?.user.rule === 1 && <CreateProduct />}
        </div>
    </div>
  )
})

export default ContainerProduct