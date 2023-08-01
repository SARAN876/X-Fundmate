import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Dialog,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Box,
  CircularProgress,
  // Chip,
  Avatar
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Formsy from 'formsy-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextFieldFormsy } from '../component/formsy';
import { getAuctionsList, createAuctionList, getAuctionMenuList } from '../store/auctionSlice';

export default function AuctionsPage() {
  const dispatch = useDispatch();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const auctionsID = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState('');
  const [openView, setOpenView] = useState(false);
  const [view, setView] = useState();
  const auctionMenuList = useSelector((auctions) => auctions.auctions.auctionsMenuList);
  // const [dropSelect, setDropSelect] = useState(
  //   auctionsID?.state?.res?.id ? auctionsID?.state?.res?.id : auctionMenuList[0]?.id
  // );
  const [dropSelect, setDropSelect] = useState('');

  const handleChangeDrop = (value) => {
    setDropSelect(value);
    setMenu(value);
    dispatch(getAuctionsList(value));
  };

  const tableData = useSelector((auctions) => auctions.auctions.auctionsList);
  const loading1 = useSelector(({ loading }) => loading.loading1);

  useEffect(() => {
    dispatch(getAuctionMenuList()).then((res) => {
      if (res && res?.payload) {
        // handleChangeDrop(
        //   auctionsID?.state?.res?.id ? auctionsID?.state?.res?.id : res?.payload?.List[0]?.id
        // );
      }
    });
  }, []);

  useEffect(() => {
    if (auctionMenuList && auctionMenuList.length > 0) {
      handleChangeDrop(
        auctionsID?.state?.res?.id ? auctionsID?.state?.res?.id : auctionMenuList[0]?.id
      );
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [auctionMenuList]);

  const handleChange = (event) => {
    setMenu(event.target.value);
  };
  const createFun = () => {
    setOpenAddDialog(true);
  };
  const closeFun = () => {
    setMenu('');
    setOpenAddDialog(false);
  };
  const handleViewOpen = (data) => {
    setView(data);
    setOpenView(true);
  };
  const handleViewClose = () => {
    setOpenView(false);
  };
  const handleSubmit = (data) => {
    const target = {
      auction_start_date: moment(data?.auction_start_date).format('YYYY-MM-DD HH:mm:ss'),
      auction_end_date: data?.auction_end_date
        ? moment(data?.auction_end_date).format('YYYY-MM-DD HH:mm:ss')
        : null,
      fund_id: menu
    };

    dispatch(createAuctionList(target)).then((res) => {
      if (res && res?.payload) {
        setOpenAddDialog(false);
        setMenu('');
      } else {
        setOpenAddDialog(true);
      }
    });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Auctions</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
            <Grid item>
              <FormControl sx={{ minWidth: 120, pr: 1, pt: -1 }}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={dropSelect}
                  // value={8}
                  size="small"
                  onChange={(e) => handleChangeDrop(e.target.value)}>
                  {auctionMenuList.map((res) => (
                    <MenuItem value={res.id} key={res.id}>
                      {res.fund_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select any fund</FormHelperText>
              </FormControl>
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
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead sx={{ whiteSpace: 'nowrap' }}>
            <TableRow>
              <TableCell>Fund Name</TableCell>
              <TableCell>Auction Start Date</TableCell>
              <TableCell>Auction End Date</TableCell>
              <TableCell align="center">Actions</TableCell>
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
              tableData?.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row?.chit_fund?.fund_name}
                  </TableCell>
                  <TableCell>{moment(row?.auction_start_date).format('DD-MM-YYYY')}</TableCell>
                  <TableCell>
                    {row?.auction_end_date
                      ? moment(row?.auction_end_date).format('DD-MM-YYYY')
                      : ''}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="end">
                      <Avatar
                        sx={{ bgcolor: 'green', width: 34, height: 34 }}
                        onClick={() => handleViewOpen(row)}>
                        <VisibilityIcon />
                      </Avatar>
                      {!row?.is_done && (
                        <Button
                          variant="contained"
                          color={'secondary'}
                          size="small"
                          onClick={() =>
                            navigate('/bidplacements', {
                              state: { row }
                            })
                          }>
                          Bid
                        </Button>
                      )}
                      {!row?.is_done ? (
                        <Button
                          variant="contained"
                          color={'warning'}
                          size="small"
                          onClick={() =>
                            navigate('/auctiondetails', {
                              state: { row }
                            })
                          }>
                          End
                        </Button>
                      ) : (
                        row?.is_done && (
                          <Button
                            variant="contained"
                            color={'secondary'}
                            size="small"
                            onClick={() =>
                              navigate('/auctiondetails', {
                                state: { row }
                              })
                            }>
                            summary
                          </Button>
                        )
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Dialog
          open={openAddDialog}
          fullWidth
          maxWidth="xs"
          disableEscapeKeyDown={true}
          aria-labelledby="form-dialog-title"
          classes={{
            paper: 'rounded-8'
          }}>
          <Toolbar>
            <Typography variant="h6" color="Green">
              Add Auction
            </Typography>
          </Toolbar>
          <Formsy onValidSubmit={handleSubmit} name="registerForm">
            <Box
              sx={{
                '& .MuiTextField-root': { mb: 2, mt: 0 },
                '& .react-tel-input.focused': { borderColor: 'green' },
                m: 2
              }}>
              <Box sx={{ minWidth: 120, paddingBottom: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Fund *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={menu}
                    label="Fund"
                    size="small"
                    required
                    onChange={handleChange}>
                    {auctionMenuList.map((res) => (
                      <MenuItem key={res.id} value={res.id}>
                        {res?.fund_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Stack direction="row" spacing={2} marginLeft="2px" marginBottom="10px">
                <TextFieldFormsy
                  label="Auction Start Date"
                  id="auction_start_date"
                  required
                  name="auction_start_date"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
                <TextFieldFormsy
                  label="Auction End Date"
                  id="auction_end_date"
                  type="Date"
                  required
                  name="auction_end_date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
              </Stack>
              <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid item>
                  <Button
                    sx={{ mt: 1, mb: 1, px: 3 }}
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
                    sx={{ mt: 1, mb: 1, px: 3 }}
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
        <Dialog
          open={openView}
          fullWidth
          maxWidth="sm"
          disableEscapeKeyDown
          aria-labelledby="form-dialog-title"
          classes={{
            paper: 'rounded-8'
          }}>
          <Toolbar>
            <Typography variant="h5" color="primary">
              Auction Description
            </Typography>
          </Toolbar>
          <TableContainer sx={{ px: 2 }}>
            <Paper>
              <Table aria-label="simple table" size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Fund Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{view?.chit_fund?.fund_name}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Amount
                      </Typography>
                    </TableCell>

                    <TableCell>{view?.chit_fund?.fund_amount}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Total Months
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{view?.chit_fund?.total_months}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Commission Per %
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {view?.chit_fund?.commission_percentage}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color="grey">
                        Auction Start Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {view?.chit_fund?.auction_start_date
                          ? moment(view?.chit_fund?.auction_start_date).format('DD.MM.YYYY HH:mm')
                          : null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color={'gray'}>
                        Auction End date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {view?.auction_end_date
                          ? moment(view?.auction_end_date).format('DD.MM.YYYY HH:mm')
                          : null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2" color={'gray'}>
                        XRP Address
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        xx.....{view?.chit_fund?.xrpl_address.slice(-6)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          <Grid container justifyContent="space-between" alignItems="baseline" direction="row">
            <Grid item />
            <Grid item>
              <Button
                sx={{ mt: 2, mb: 2, px: 4, mr: 2 }}
                // fullWidth
                variant="contained"
                onClick={handleViewClose}
                color="warning">
                Close
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </TableContainer>
    </Container>
  );
}
