import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../../types";

interface IUserInfoObject {
  userInfo : IUserInfo
}
const initialState : IUserInfoObject ={
  userInfo : {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: {url : "" , public_id : ""},
    isAdmin: false,
    wishList: []
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers : {
    setCredentials : (state , action) => {
      state.userInfo = action.payload;
    },
    logoutAction : (state ) => {
      state.userInfo = {    _id: "",
        firstName: "",
        lastName: "",
        email: "",
        profilePhoto: {url : "" , public_id : ""},
        isAdmin: false,
        wishList: []};
    },
  }
})

export const {setCredentials , logoutAction} = authSlice.actions;
export default authSlice.reducer;