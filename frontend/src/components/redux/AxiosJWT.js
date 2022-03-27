import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import URLBackend from '../utils/URLBackend'
const refreshToken = async ()=>{
    const {url} = URLBackend();
    try{
        const res = await axios.post(`${url}/auth/refresh`,{
            withCredentials:true
        });
        return res.data;
    }
    catch(err){
        toast.error(err.response.data.msg);
    }
}

export const createAxiosJWT = (dispatch,stateSuccess,auth) => {
    const instaneJWT = axios.create();
    instaneJWT.interceptors.request.use(
        async (config)=>{
            let date = new Date();
            const decode = jwt_decode(auth?.user.accessToken);
            if(decode.exp < date.getTime()/1000){
                const data = await refreshToken();
                const newReFresh = {
                    ...auth?.user,
                    accessToken:data.accessToken
                };
                dispatch(stateSuccess(newReFresh));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },(err)=>{
            return Promise.reject(err);
        }
    )
    return instaneJWT;
}