import { createSlice } from "@reduxjs/toolkit";

type TType = {searchKeyWord :string};

const initialState : TType ={
  searchKeyWord : ""
}
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers : {
    createSearchKeywordAction : (state , action) =>{
      state.searchKeyWord = action.payload;
    },
    clearSearchKeywordAction : (state) =>{
      state.searchKeyWord = "";
    }

  },
})


export const {createSearchKeywordAction , clearSearchKeywordAction} = searchSlice.actions;
export default searchSlice.reducer;