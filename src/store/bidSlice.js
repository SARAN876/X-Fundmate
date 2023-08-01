/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import { startLoading3, clearLoading3, startLoading1, clearLoading1 } from './loaderSlice';
import {
  getMemberMenuService,
  getAuctionMenuListService,
  createBidService,
  getBidListService
} from '../services/bidService';

export const getMemberMenuList = createAsyncThunk(
  'bid/getMemberMenuList',
  async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
      const response = await getMemberMenuService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { List: response.fund_members };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: [] };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: [] };
    }
  }
);
export const getBidList = createAsyncThunk('bid/getBidList', async (data, { dispatch }) => {
  dispatch(startLoading3());
  try {
    const response = await getBidListService(data);
    if (response.status) {
      dispatch(clearLoading3());
      return { List: response.bids, ChitFund: response.chit_fund };
    }
    dispatch(clearLoading3());
    if (response.error) {
      response.error.message &&
        dispatch(showMessage({ message: response.error.message, variant: 'error' }));
    } else {
      response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
    }
    return { List: [] };
  } catch (error) {
    dispatch(clearLoading3());
    error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
    return { List: [] };
  }
});
export const getAuctionMenuList = createAsyncThunk(
  'bid/getAuctionMenuList',
  async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
      const response = await getAuctionMenuListService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { List: response.auctions };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: [] };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: [] };
    }
  }
);
export const createBidList = createAsyncThunk(
  'bid/createBidList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { bidList } = state.bid;

    dispatch(startLoading1());
    try {
      const response = await createBidService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Bid Created',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response.bid }, ...bidList]
        };
      }
      dispatch(clearLoading1());
      if (response) {
        response && dispatch(showMessage({ message: response, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: bidList, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: bidList, response: { status: false } };
    }
  }
);

const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    bidList: [],
    memberMenuList: [],
    auctionList: [],
    Count: 0
  },
  reducers: {},
  extraReducers: {
    [getMemberMenuList.fulfilled]: (state, action) => ({
      ...state,
      memberMenuList: action.payload.List
    }),
    [getAuctionMenuList.fulfilled]: (state, action) => ({
      ...state,
      auctionList: action.payload.List
    }),
    [createBidList.fulfilled]: (state, action) => ({
      ...state,
      bidList: action.payload.List
    }),
    [getBidList.fulfilled]: (state, action) => ({
      ...state,
      bidList: action.payload.List,
      ChitFund: action.payload.ChitFund
    })
  }
});
export const { bidList } = bidSlice.actions;

export default bidSlice.reducer;
