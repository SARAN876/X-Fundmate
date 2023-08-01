import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Tooltip,
  IconButton,
  InputLabel,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  MenuItem,
  CircularProgress,
  Dialog,
  TableBody,
  Toolbar,
  //   Stack,
  FormHelperText,
  Box,
  FormControl,
  Select,
  Button
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import {
  getMemberMenuList,
  getAuctionMenuList,
  createBidList,
  getBidList
} from '../store/bidSlice';
import { getApprovedMenuList } from '../store/createfundSlice';
import { useLocation } from 'react-router-dom';

export default function BidPlacements() {
  const dispatch = useDispatch();
  const bidFundId = useLocation();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [menu, setMenu] = useState('');
  const [selectedFund, setSelectedFund] = useState(null);
  const [auctionMenu, setAuctionMenu] = useState('');
  const [memberMenu, setMemberMenu] = useState('');
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const auctionMenuList = useSelector((auctions) => auctions.bid.auctionList);
  const memberMenuList = useSelector((member) => member.bid.memberMenuList);
  const approvedMenuList = useSelector((approved) => approved.dashboard.approvedList);
  const bidTableData = useSelector((bid) => bid.bid.bidList);
  const ChitFund = useSelector((bid) => bid.bid.ChitFund);
  const [dropSelect, setDropSelect] = useState('');

  useEffect(() => {
    dispatch(getApprovedMenuList()).then(() => {});
  }, []);

  useEffect(() => {
    if (approvedMenuList && approvedMenuList.length > 0) {
      handleChangeDrop(
        bidFundId?.state?.row?.fund_id ? bidFundId?.state?.row?.fund_id : approvedMenuList[0].id
      );
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, [approvedMenuList]);

  useEffect(() => {
    if (selectedFund?.uuid || approvedMenuList[0]?.uuid) {
      // dispatch(getBidList(bidFundId?.state?.row?.fund_id || dropSelect));
      dispatch(getBidList(selectedFund?.id || approvedMenuList[0]?.id));
      dispatch(getAuctionMenuList(selectedFund?.uuid || approvedMenuList[0]?.uuid));
      dispatch(getMemberMenuList(selectedFund?.uuid || approvedMenuList[0]?.uuid));
    }
  }, [selectedFund]);

  const createFun = () => {
    setOpenAddDialog(true);
  };
  const closeFun = () => {
    setOpenAddDialog(false);
  };
  const handleFundChange = (value) => {
    setDropSelect(value);
    setMenu(value);
    setSelectedFund(approvedMenuList.find((obj) => obj.id == value));
    dispatch(getBidList(selectedFund?.uuid ? selectedFund?.uuid : value));
  };

  const handleAuctionChange = (event) => {
    setAuctionMenu(event.target.value);
  };
  const handleMemberChange = (event) => {
    setMemberMenu(event.target.value);
  };
  const handleChangeDrop = (value) => {
    setDropSelect(value);
    setMenu(value);
    setSelectedFund(approvedMenuList.find((obj) => obj.id == value));
    dispatch(getBidList(selectedFund?.uuid ? selectedFund?.uuid : value));
  };
  const handleSubmit = (data) => {
    const target = {
      ...data,
      fund_id: selectedFund?.id,
      auction_id: auctionMenu,
      user_id: memberMenu
    };
    dispatch(createBidList(target)).then((res) => {
      if (res && res?.payload) {
        setOpenAddDialog(false);
        window.location.reload();
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
          <Typography variant="h6">Bid Placements</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
            <Grid item>
              <FormControl sx={{ minWidth: 120, pr: 1, pt: -2 }}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={dropSelect}
                  size="small"
                  onChange={(e) => handleChangeDrop(e.target.value)}>
                  {approvedMenuList.map((res) => (
                    <MenuItem value={res?.id} key={res?.id}>
                      {res?.fund_name}
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
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={2}>
        <Grid item>
          <Typography>
            <b>Fund Name :</b> {ChitFund?.fund_name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <b>Fund Amount :</b> {ChitFund?.fund_amount}
          </Typography>
        </Grid>
        <Grid item marginRight={5}>
          <Typography>
            <b>Total Members :</b> {ChitFund?.total_members}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 65 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell align="right">Member Email</TableCell>
              <TableCell align="right">Bid amount</TableCell>
              {/* <TableCell align="right">Fund Name</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {bidTableData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Records Available
                </TableCell>
              </TableRow>
            ) : (
              bidTableData.map((res) => (
                <TableRow key={res.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{res?.member?.name}</TableCell>
                  <TableCell align="right">{res?.member?.email}</TableCell>
                  <TableCell align="right">{res?.bid_amount}</TableCell>
                  {/* <TableCell align="right">{res?.chit_fund?.fund_name}</TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
            Add Bid
          </Typography>
        </Toolbar>
        <Formsy onValidSubmit={handleSubmit} name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 2, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Fund *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={menu}
                  label="Fund"
                  size="small"
                  required
                  // onChange={handleFundChange}>
                  onChange={(e) => handleFundChange(e.target.value)}>
                  {approvedMenuList.map((res) => (
                    <MenuItem key={res?.id} value={res?.id}>
                      {res?.fund_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Auction *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={auctionMenu}
                  label="Fund *"
                  size="small"
                  required
                  onChange={handleAuctionChange}>
                  {auctionMenuList.map((res) => (
                    <MenuItem key={res?.id} value={res?.id}>
                      {moment(res?.auction_start_date).format('DD-MM-YYYY')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ paddingBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Member *</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small-label"
                  value={memberMenu}
                  label="Member"
                  size="small"
                  required
                  onChange={handleMemberChange}>
                  {memberMenuList.map((res) => (
                    <MenuItem key={res?.id} value={res?.id}>
                      {res?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextFieldFormsy
              label="Bid Amount"
              id="bid_amount"
              name="bid_amount"
              variant="outlined"
              required
              fullWidth
              type="text"
              helperText="Bid amount must be greater than auction amount"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
            />
            <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1, px: 3 }}
                  type="submit"
                  variant="contained"
                  color="success"
                  aria-label="Register"
                  style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                  {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
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
    </Container>
  );
}
