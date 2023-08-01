import axiosConfig from '../utils/axios';

const handleResponse = (error) => {
  if (
    error.response &&
    (error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 422)
  ) {
    return error.response && error.response.data;
  }
  return error.response && error.response.data;
};

export const fetchDashboardService = (data) =>
  axiosConfig
    .get(`/fund/list`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createDashboardService = (data) =>
  axiosConfig
    .post(`/fund/create`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createMemberService = (data) =>
  axiosConfig.post(`/fund/add-member`, data).then((response) => response.data);
// .catch(handleResponse);
export const approveMemberService = (data) =>
  axiosConfig
    .post(`/fund/approve`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const fetchAuctionService = (data) =>
  axiosConfig
    .get(`/fund/auction/list`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const fundApprovedMenuService = (data) =>
  axiosConfig
    .get(`/fund/approved/menu`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const createAccountMemberService = (data) =>
  axiosConfig
    .post(`/xrpl/create-account`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const getMembersService = (data) =>
  axiosConfig
    .get(`/fund/members/list/${data}`)
    .then((response) => response.data)
    .catch(handleResponse);

export const getXRPLBalanceService = (data) =>
  axiosConfig
    .post(`/xrpl/get-balance`, data)
    .then((response) => response.data)
    .catch(handleResponse);
