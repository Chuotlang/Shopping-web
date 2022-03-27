import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Categary = () => {
    const {search} = useLocation();
    const navigate = useNavigate();
    const handleCategary = e =>{
      const sort = new URLSearchParams(search).get("sort");
      if(e){
        if(sort){
          return navigate(`?sort=${sort}&search=${e}`);
        }
        return navigate(`?search=${e}`);
      }
      return navigate('/');
    }
  return (
    <select onChange={e => handleCategary(e.target.value)} className='categary_container'>
      <optgroup label="Chọn categary">
        <option defaultChecked value="">Tất Cả</option>
        <option value="man">Nam</option>
        <option value="woman">Nữ</option>
        <option value="animal">Động Vật</option>
      </optgroup>
    </select>
  )
}

export default Categary