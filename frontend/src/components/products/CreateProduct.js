import React from 'react'
import {Link} from 'react-router-dom';
const CreateProduct = () => {
  return (
    <div className='col c-8 c-o-2 m-6 l-3'>
      <Link to="/product/create" className='Link'>
        <div className='product_container'>
            <div className='create_product'>
              <h1>Thêm Sản Phẩm</h1>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default CreateProduct