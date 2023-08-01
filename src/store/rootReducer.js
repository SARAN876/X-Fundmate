import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import dashboard from './createfundSlice';
import loading from './loaderSlice';
import auctions from './auctionSlice';
import bid from './bidSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    message,
    dashboard,
    loading,
    auctions,
    bid,
    ...asyncReducers
  });

export default createReducer;
