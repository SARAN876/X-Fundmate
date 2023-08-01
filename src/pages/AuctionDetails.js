import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Table,
  TableRow,
  TableCell,
  CardContent,
  TableBody,
  TableContainer,
  Button
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import { getAuctionSettleService } from '../services/auctionsService';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuctionSummary, getAuctionDetailsList } from '../store/auctionSlice';

export default function auctiondetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auctionsID = useLocation();
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auctionsID && !auctionsID.state) {
      navigate('/');
      return;
    }
    if (auctionsID && !auctionsID?.state?.row?.is_done) {
      dispatch(getAuctionDetailsList(auctionsID.state?.row?.uuid)).then((res) => {
        if (res.payload.List) {
          setSummaryData(res?.payload?.List);
        } else {
          navigate('/');
        }
      });
    } else {
      dispatch(getAuctionSummary(auctionsID?.state?.row?.auction_summary?.uuid)).then((res) => {
        if (res && res?.payload) {
          setSummaryData(res?.payload?.List);
        }
      });
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  const handlePay = async () => {
    setLoading(true);
    const response = await getAuctionSettleService(summaryData.auction.uuid);
    setSummaryData(response.auction_summary);
    // setBalance(response.balance);
    setLoading(false);
  };

  return (
    <>
      {summaryData && (
        <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
          <CssBaseline />
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
            <Grid item>
              <Typography variant="h6">Auction Fulfillment</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <br />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <TableContainer direction="row" justifyContent="space-between" alignItems="baseline">
                <Paper>
                  <Table
                    aria-label="simple table"
                    size="small"
                    // sx={{
                    //   [`& .${tableCellClasses.root}`]: {
                    //     borderBottom: 'none'
                    //   }
                    // }}
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" color="grey">
                            Fund Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {summaryData?.chit_fund?.fund_name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" color="grey">
                            Chit Amount
                          </Typography>
                        </TableCell>
                        <TableCell>{summaryData?.chit_fund?.fund_amount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" color="grey">
                            Agent Commission
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {summaryData?.agent_commission_amount} (
                            {summaryData?.agent_commission_percentage}%)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" color="grey">
                            Winner Bid Amount
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{summaryData?.auction_amount}</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" color="grey">
                            Winner Net Amount
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">{summaryData?.winner_amount}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" color={'gray'}>
                            Total Dividend
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {summaryData?.total_dividend_amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2" color={'gray'}>
                            Dividend Per Member
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {summaryData?.dividend_per_member}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </TableContainer>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              {!summaryData?.auction?.auction_settled &&
                (loading ? (
                  <>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Grid item>
                        <CircularProgress size={40} color="inherit" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          Please wait, transaction is in progress...
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color={'primary'}
                    size="small"
                    onClick={() => handlePay()}>
                    Confirm & Pay
                  </Button>
                ))}
              {summaryData?.auction?.auction_settled && (
                <>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item>
                      <Typography variant="body1">Payment Summary</Typography>{' '}
                    </Grid>
                    <Grid item>
                      <Table
                        aria-label="a dense table"
                        // sx={{
                        //   [`& .${tableCellClasses.root}`]: {
                        //     borderBottom: 'none'
                        //   }
                        // }}
                      >
                        <TableBody>
                          {summaryData?.auction?.auction_settlements.map((res) => (
                            <TableRow key={res.id}>
                              <TableCell size="small">
                                <Typography variant="subtitle2">
                                  <Typography variant="caption" key={res?.member?.id}>
                                    {res?.member?.name}
                                  </Typography>
                                </Typography>
                              </TableCell>
                              <TableCell size="small">
                                <Typography variant="caption" key={res?.id}>
                                  {res?.received_amount}
                                </Typography>
                              </TableCell>
                              <TableCell size="small">
                                <Typography variant="caption" key={res?.id}>
                                  {res?.is_winner && '(winner)'}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>
                </>
              )}
            </CardActions>
          </Card>
        </Container>
      )}
    </>
  );
}
