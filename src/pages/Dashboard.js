import React, { Fragment, useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment/moment';
import Paper from '@mui/material/Paper';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  // Collapse,
  Toolbar,
  Stack,
  Button,
  Dialog,
  Box,
  // Chip,
  CircularProgress,
  Table,
  Container
} from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import { useDispatch, useSelector } from 'react-redux';
import {
  getdashboardList,
  createDashboardList,
  createApproveMemberList
} from '../store/createfundSlice';
import GetBalance from './GetBalance';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const tableData = useSelector(({ dashboard }) => dashboard.dashboardList);

  const [openDialog, setOpenDialog] = useState(false);
  // const [dropdownId, setDropdownId] = useState('');
  // const [addFunId, setAddFunId] = useState();

  const rows = [
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Actions'
    },
    {
      id: 'fund_name',
      numeric: true,
      disablePadding: false,
      label: 'Fund Name'
    },
    {
      id: 'fund_balance',
      numeric: true,
      disablePadding: false,
      label: 'Fund Balance'
    },
    {
      id: 'total_members',
      numeric: true,
      disablePadding: false,
      label: 'Total Members'
    },
    {
      id: 'fund_amount',
      numeric: true,
      disablePadding: false,
      label: 'Fund Amount'
    },
    {
      id: 'total_months',
      numeric: true,
      disablePadding: false,
      label: 'Total Months'
    },
    {
      id: 'fund_start_date',
      numeric: true,
      disablePadding: false,
      label: 'Fund Start Date'
    },
    {
      id: 'members',
      numeric: true,
      disablePadding: false,
      label: 'Members'
    }
  ];

  useEffect(() => {
    dispatch(getdashboardList({}));
  }, []);

  const createFun = () => {
    setOpenDialog(true);
  };

  const closeFun = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (data) => {
    dispatch(createDashboardList(data)).then((res) => {
      if (res && res?.payload) {
        setOpenDialog(false);
      } else {
        setOpenDialog(true);
      }
    });
  };
  const handelApprove = (data) => {
    dispatch(createApproveMemberList({ fund_id: data })).then((res) => {
      if (res && res?.payload) {
        window.location.reload();
      }
    });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Funds</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => createFun()}
              disableRipple
              sx={{ bgcolor: 'green', color: '#fff' }}>
              <AddSharpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <br />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item></Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows?.map((row) => (
                  <TableCell key={row.id} align="center" sx={{ whiteSpace: 'nowrap' }}>
                    {row?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Records Available
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.map((res) => (
                  <Fragment key={res.id}>
                    <TableRow
                      key={res.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'success'
                        },
                        whiteSpace: 'nowrap'
                      }}>
                      <TableCell align="center">
                        {res?.total_members <= res?.members?.length ? (
                          res.fund_approved ? (
                            <Button
                              variant="contained"
                              color={'secondary'}
                              size="small"
                              onClick={() =>
                                navigate('auctions', {
                                  state: { res }
                                })
                              }>
                              Auction
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color={'primary'}
                              size="small"
                              onClick={() => handelApprove(res?.id)}>
                              {loading1 ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : (
                                'Approve'
                              )}
                            </Button>
                          )
                        ) : null}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{res.fund_name}</Typography>
                      </TableCell>
                      <TableCell>
                        <GetBalance address={res.xrpl_address} />
                      </TableCell>
                      <TableCell>{res.total_members}</TableCell>
                      <TableCell>{res.fund_amount}</TableCell>
                      <TableCell>{res.total_months}</TableCell>
                      <TableCell>{moment(res?.fund_start_date).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>
                        <GroupAddIcon
                          cursor="pointer"
                          onClick={() =>
                            navigate('members', {
                              state: { res }
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h5" color="Green">
            Fund
          </Typography>
        </Toolbar>
        <Formsy onValidSubmit={handleSubmit} name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 1, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="15px">
              <TextFieldFormsy
                label="Fund Name"
                id="fund_name"
                name="fund_name"
                variant="outlined"
                required
                fullWidth
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Fund Amount"
                id="fund_amount"
                type="number"
                required
                name="fund_amount"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="15px">
              <TextFieldFormsy
                label="Fund Start Date"
                id="fund_start_date"
                name="fund_start_date"
                required
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Total Months"
                id="total_months"
                required
                type="number"
                name="total_months"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="15px">
              <TextFieldFormsy
                label="Commission Per %"
                id="commission_percentage"
                name="commission_percentage"
                required
                variant="outlined"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Total Members"
                id="total_members"
                name="total_members"
                required
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>
            <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="15px">
              <TextFieldFormsy
                label="Auction Start Date"
                id="auction_start_date"
                name="auction_start_date"
                required
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
              <TextFieldFormsy
                label="Minimum Auction Amount"
                id="min_auction_amount"
                name="min_auction_amount"
                required
                variant="outlined"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
              />
            </Stack>

            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  type="submit"
                  variant="contained"
                  color="success"
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Create'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 4 }}
                  variant="contained"
                  onClick={() => closeFun()}
                  color="warning"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Formsy>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
