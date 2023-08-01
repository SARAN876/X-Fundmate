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

export const getMemberMenuService = (data) =>
  axiosConfig
    .get(`/fund/members/menu/${data}`)
    .then((response) => response.data)
    .catch(handleResponse);
export const getBidListService = (data) =>
  axiosConfig
    .get(`/fund/auction/bid/list?fund_id=${data}`)
    .then((response) => response.data)
    .catch(handleResponse);
export const getAuctionMenuListService = (data) =>
  axiosConfig
    .get(`/fund/auction/menu/${data}`)
    .then((response) => response.data)
    .catch(handleResponse);
export const createBidService = (data) =>
  axiosConfig.post(`/fund/auction/bid`, data).then((response) => response.data);
// .catch(handleResponse);
// export const getAuctionsMenuService = (data) =>
//   axiosConfig
//     .get(`/fund/approved/menu`, data)
//     .then((response) => response.data)
//     .catch(handleResponse);
