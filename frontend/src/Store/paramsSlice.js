//import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from '../axiosSetup';
//
//// Thunk to fetch params from Django API
//export const fetchParams = createAsyncThunk('params/fetchParams', async (_, {rejectWithValue}) => {
//  try {
//    const res = await axios.get('/api/params/get/');
//    return (res?.data?.params ) {
//        sessionStorage.setItems("params",JSON.stringify(res.data.params));
//        return res.data.params;
//    }
//    return {};
//  } catch (err) {
//    console.error("Error fetching params:",err);
//    return rejectWithValue(err.response?.data || "Failed to fetch params");
//  }
//});
//
////Thunk to update params in Django API
//export const updateParams = createAsyncThunk('params/updateParams', async (newParams,{getState,rejectWithValue}) => {
//  try {
//    const {params} = getState();
//    const updated = { ...params.values,...newParams};
//    await axios.post('/api/params/set/', updated);
//    sessionStorage.setItem("params",JSON.stringify(updated));
//    return updated;
//  } catch (err) {
//    console.error("Error updating params:",err);
//    return rejectWithValue(err.response?.data || "Failed to update params");
//  }
//});
//
//const paramsSlice = createSlice({
//  name: 'params',
//  initialState:{
//    values:JSON.parse(sessionStorage.getItem("params")) || {},
//    loading:false,
//    error:null;
//  },
//  reducers: {
//    setParams : (state) =>  {
//        state.values = {};
//        sessionStorage.removeItem("params");
//        },
//        },
//
//  extraReducers: (builder) => {
//  //Handle fetchParams
//
//    builder
//      .addCase(fetchParams.pending, (state) => {
//        state.loading = true;
//        state.error = null;
//      })
//      .addCase(fetchParams.fulfilled, (state, action) => {
//        state.values = action.payload;
//        state.loading = false;
//      })
//      .addCase(fetchParams.rejected, (state, action) => {
//        state.loading = false;
//        state.error = action.payload;
//      });
//
//      //Handle updateParams
//      builder
//      .addCase(updateParams.pending, (state) => {
//        state.loading = true;
//        state.error = null;
//      })
//      .addCase(updateParams.fulfilled, (state, action) => {
//        state.values = action.payload;
//        state.loading = false;
//      })
//      .addCase(updateParams.rejected, (state, action) => {
//        state.loading = false;
//        state.error = action.payload;
//      });
//  },
//});
//
//export const {clearParams} = paramsSlice.actions;
//
////Selectors
//
//export const selectParams = (state) => state.params.values;
//export const selectLoading = (state) => state.params.loading;
//export const selectError = (state) => state.params.error;
//
//export default paramsSlice.reducer;