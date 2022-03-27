import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Sorting = () => {
    const {search} = useLocation();
    const navigate = useNavigate();
    const handleSort = e =>{
      const searching = new URLSearchParams(search).get("search");
      if(e){
        if(searching){
          return navigate(`?search=${searching}&sort=${e}`);
        }
        return navigate(`?sort=${e}`);
      }
      return navigate('/');
    }
  return (
    <select onChange={e => handleSort(e.target.value)} className='sort_container'>
      <optgroup label="Sắp Xếp">
        <option defaultChecked value="">Tất Cả</option>
        <option value="-createdAt">Mới Nhất</option>
        <option value="createdAt">Cũ Nhất</option>
        <option value="-price">Giá Cao</option>
        <option value="price">Giá Thấp</option>
      </optgroup>
    </select>
  )
}

export default Sorting