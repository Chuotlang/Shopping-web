import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:false,
        infor:null,
        isChange:false
    },
    reducers:{
        isLoading:(state)=>{
            state.isChange = false;
            state.error = false;
            state.loading = true;
        },
        loginSuccess:(state,action)=>{
            state.error = false;
            state.loading = false;
            state.user = action.payload;
        },
        isFail:(state)=>{
            state.isChange = false;
            state.error = true;
            state.loading = false;
        },
        isSuccess:(state)=>{
            state.error = false;
            state.loading = false;
        },
        logOutSuccess:(state)=>{
            state.error = false;
            state.loading = false;
            state.user = null;
            state.infor = null;
        },
        isSuccessInfor:(state,action)=>{
            state.error = false;
            state.loading = false;
            state.infor = action.payload;
        },
        isChangeInfor:(state)=>{
            state.error = false;
            state.loading = false;
            state.isChange = true;
        }
    }
});

export const {isFail,isLoading,loginSuccess,logOutSuccess,isSuccess,isSuccessInfor,isChangeInfor} = authSlice.actions;
export default authSlice.reducer;