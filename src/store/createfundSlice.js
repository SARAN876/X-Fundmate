/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import { startLoading3, clearLoading3, clearLoading1, startLoading1 } from './loaderSlice';
import {
  fetchDashboardService,
  createDashboardService,
  createMemberService,
  approveMemberService,
  fundApprovedMenuService,
  createAccountMemberService,
  getMembersService
} from '../services/createFundservice';

export const getdashboardList = createAsyncThunk(
  'dashboard/getdashboardList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { Count, dashboardList } = state.dashboard.dashboardList;

    dispatch(startLoading3());
    try {
      const response = await fetchDashboardService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { dashboardList: response.chit_funds, count: response.length };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { dashboardList, count: Count };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { dashboardList, count: Count };
    }
  }
);
export const createDashboardList = createAsyncThunk(
  'dashboardlist/createDashboardList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { dashboardList } = state.dashboard;
    const { dashboardCount } = state.dashboard;

    dispatch(startLoading1());
    try {
      const response = await createDashboardService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Fund Created',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response.chit_fund }, ...dashboardList],
          count: Number(dashboardCount) + 1,
          response
        };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: dashboardList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: dashboardList, count: 0, response: { status: false } };
    }
  }
);
export const createMemberList = createAsyncThunk(
  'dashboardlist/createMemberList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { memberList } = state.dashboard;
    dispatch(startLoading1());
    try {
      const response = await createMemberService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Member Created',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response.member }, ...memberList]
        };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: memberList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: memberList, count: 0, response: { status: false } };
    }
  }
);
export const createApproveMemberList = createAsyncThunk(
  'dashboardlist/createApproveMemberList',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { dashboardList } = state.dashboard;
    const { Count } = state.dashboard;

    dispatch(startLoading1());
    try {
      const response = await approveMemberService(data);
      if (response?.status) {
        dispatch(clearLoading1());
        dispatch(
          showMessage({
            message: 'Create Fund Approved',
            variant: 'success'
          })
        );
        return {
          List: [{ ...response }, ...dashboardList],
          count: Number(Count) + 1,
          response
        };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: dashboardList, count: 0, response };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: dashboardList, count: 0, response: { status: false } };
    }
  }
);
export const getApprovedMenuList = createAsyncThunk(
  'dashboard/getApprovedMenuList',
  async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
      const response = await fundApprovedMenuService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { List: response.chit_funds };
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
export const getCreateAccount = createAsyncThunk(
  'dashboard/getCreateAccount',
  async (data, { dispatch }) => {
    dispatch(startLoading1());
    try {
      const response = await createAccountMemberService(data);
      if (response.status) {
        dispatch(clearLoading1());
        return { List: response.account };
      }
      dispatch(clearLoading1());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: [] };
    } catch (error) {
      dispatch(clearLoading1());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: [] };
    }
  }
);
export const getMembers = createAsyncThunk(
  'dashboard/getMembers',
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { Count, members } = state.dashboard.members;

    dispatch(startLoading3());
    try {
      const response = await getMembersService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { List: response.fund_members, count: response.length, response };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(showMessage({ message: response.error.message, variant: 'error' }));
      } else {
        response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
      }
      return { List: members, count: Count };
    } catch (error) {
      dispatch(clearLoading3());
      error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
      return { List: members, count: Count };
    }
  }
);
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardList: [],
    memberList: [],
    approvedList: [],
    craeteAccount: [],
    members: [],
    Count: 0
  },
  reducers: {},
  extraReducers: {
    [getdashboardList.fulfilled]: (state, action) => ({
      ...state,
      dashboardList: action.payload.dashboardList,
      Count: action.payload.count
    }),
    [createDashboardList.fulfilled]: (state, action) => ({
      ...state,
      dashboardList: action.payload.List,
      Count: action.payload.count
    }),
    [createMemberList.fulfilled]: (state, action) => ({
      ...state,
      memberList: action.payload.List,
      Count: action.payload.count
    }),
    // [createApproveMemberList.fulfilled]: (state, action) => ({
    //   ...state,
    //   dashboardList: action.payload.List
    // }),
    [getApprovedMenuList.fulfilled]: (state, action) => ({
      ...state,
      approvedList: action.payload.List
    }),
    [getCreateAccount.fulfilled]: (state, action) => ({
      ...state,
      craeteAccount: action.payload.List
    }),
    [getMembers.fulfilled]: (state, action) => ({
      ...state,
      members: action.payload.List
    })
  }
});
export const { dashboardList } = dashboardSlice.actions;

export default dashboardSlice.reducer;
