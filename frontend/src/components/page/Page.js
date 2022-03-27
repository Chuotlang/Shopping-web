import React, { useEffect, useRef, useState } from 'react'
import './Page.css'
import Paginating from './Paginating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCaretRight ,faCaretLeft} from '@fortawesome/free-solid-svg-icons'
const Page = ({count,cache}) => {

    const {prevPage,nextPage,isActive,jump,NumberPage} = Paginating(count,cache);
    

    const newArray = [...Array(NumberPage ? NumberPage : 1)].map((_,i) => i + 1);

  return (
    <div className='col c-12 m-12 l-12'>
        <div className='paginating'>
            <span onClick={prevPage} className='page'>
              <FontAwesomeIcon icon={faCaretLeft} />
            </span>
            {newArray?.map(item => (
                <span key={item} onClick={() => jump(item)} className={`page ${isActive(item)}`}>{item}</span>
            ))}
            <span onClick={nextPage} className='page'>
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
        </div>
    </div>
  )
}
export default Page