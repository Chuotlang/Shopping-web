import  { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Paginating = (count) => {

    const [page,setPage] = useState(1);
    const NumberPage = Math.ceil(count/12);
    const navigate = useNavigate();
    useEffect(()=>{
        if(page === 1){
            return navigate("/");
        }
        navigate(`?page=${page}`)
    },[page]);

    const nextPage = () =>{
        const newPage = Math.min(page + 1, NumberPage)
        return setPage(newPage);
    }

    const prevPage = () =>{
        const newPage = Math.max(page - 1, 1);
        return setPage(newPage);
    }

    const isActive = (index) =>{
        if (index === page){
            return "active";
        }
        return "";
    }

    const jump = (num) => {
        const newPage = Math.max(1, num);
        setPage(newPage);
    }


    return {prevPage,nextPage,isActive,jump,NumberPage,page}
}

export default Paginating