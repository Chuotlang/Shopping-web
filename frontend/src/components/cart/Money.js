import React from 'react'

const Money = ({product}) => {
  return (
    <div className='money_price'>
        <span>{product.title}</span>
        <span>${product.price}</span>
    </div>
  )
}

export default Money