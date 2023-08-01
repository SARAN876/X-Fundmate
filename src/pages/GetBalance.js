import * as React from 'react';
import { useEffect, useState } from 'react';
import { getXRPLBalanceService } from '../services/createFundservice';
import CircularProgress from '@mui/material/CircularProgress';

export default function GetBalance({ address }) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBalance(address);
  }, []);

  const getBalance = async (address) => {
    setLoading(true);
    const response = await getXRPLBalanceService({ address });
    setBalance(response.balance);
    setLoading(false);
  };
  return (
    <>
      {loading ? <CircularProgress size="1rem" color="primary" /> : parseFloat(balance).toFixed(2)}
    </>
  );
}
