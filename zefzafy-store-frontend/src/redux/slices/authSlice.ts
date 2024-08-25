import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../../types";

interface IUserInfoObject {
  userInfo : IUserInfo
}
const initialState : IUserInfoObject ={
  userInfo : {
    _id: "",
    name: "",
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
    }
  }
})

export const {setCredentials} = authSlice.actions;
export default authSlice.reducer;