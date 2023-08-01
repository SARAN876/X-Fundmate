import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  Button,
  Toolbar,
  CircularProgress,
  // Stack,
  TextField,
  Box
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useDispatch, useSelector } from 'react-redux';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '../component/formsy';
import { createMemberList, getCreateAccount, getMembers } from '../store/createfundSlice';
import GetBalance from './GetBalance';

function MembersList() {
  const members = useLocation();
  // const [fundId] = useState(members?.state?.res?.uuid);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const loading1 = useSelector(({ loading }) => loading.loading1);
  const loading10 = useSelector(({ loading }) => loading.loading1);
  const xrplAccount = useSelector((account) => account.dashboard.craeteAccount);
  const [xrpAddress, setXrpAddress] = useState(xrplAccount);
  const membersTable = useSelector((members) => members.dashboard.members);

  useEffect(() => {
    dispatch(getMembers(members?.state?.res?.uuid));
  }, []);
  const createFun = () => {
    setOpenDialog(true);
  };
  const closeFun = () => {
    setOpenDialog(false);
    setXrpAddress(null);
  };
  const handleMemberSubmit = (data) => {
    const target = {
      ...data,
      fund_id: members?.state?.res?.id,
      xrpl_address: xrpAddress?.classicAddress,
      xrpl_secret: xrpAddress?.seed
    };
    {
      xrpAddress?.seed &&
        dispatch(createMemberList(target)).then((res) => {
          if (res && res?.payload) {
            setOpenDialog(false);
            setXrpAddress(null);
            window.location.reload();
          } else {
            setOpenDialog(true);
          }
        });
    }
  };
  const handelAccount = () => {
    dispatch(getCreateAccount()).then((res) => {
      if (res && res?.payload) {
        setXrpAddress(res.payload.List);
      }
    });
  };

  return (
    <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
      <CssBaseline />
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>
          <Typography variant="h6">Members</Typography>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 65 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">XRP Address</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membersTable.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Records Available
                </TableCell>
              </TableRow>
            ) : (
              membersTable.map((row) => (
                <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell align="right">{row?.email}</TableCell>
                  <TableCell align="right">{row?.phone}</TableCell>
                  <TableCell align="right">xxxxx...{row?.xrpl_address.slice(-6)}</TableCell>
                  <TableCell align="right">
                    <GetBalance address={row?.xrpl_address} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="xs"
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: 'rounded-8'
        }}>
        <Toolbar>
          <Typography variant="h6" color="Green">
            Add Member
          </Typography>
        </Toolbar>
        <Formsy onValidSubmit={handleMemberSubmit} name="registerForm">
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 2, mt: 0 },
              '& .react-tel-input.focused': { borderColor: 'green' },
              m: 2
            }}>
            {/* {xrpAddress?.classicAddress && (
              <>
                <TextFieldFormsy
                  label="Name"
                  id="name"
                  required
                  name="name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
                <TextFieldFormsy
                  label="Email"
                  id="email"
                  required
                  type="email"
                  name="email"
                  validations={{
                    isEmail: true
                  }}
                  validationErrors={{
                    isEmail: 'This is not a valid email'
                  }}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
                <TextFieldFormsy
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                />
              </>
            )} */}
            <TextFieldFormsy
              label="Name"
              id="name"
              required
              name="name"
              variant="outlined"
              fullWidth
              type="text"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
            />
            <TextFieldFormsy
              label="Email"
              id="email"
              required
              type="email"
              name="email"
              validations={{
                isEmail: true
              }}
              validationErrors={{
                isEmail: 'This is not a valid email'
              }}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
            />
            <TextFieldFormsy
              label="Phone Number"
              id="phone"
              name="phone"
              variant="outlined"
              required
              fullWidth
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              size="small"
            />
            <TextField
              id="demo-simple-select-helper-label"
              label="Xrpl Address"
              variant="outlined"
              fullWidth
              value={xrpAddress?.classicAddress ? xrpAddress?.classicAddress : ''}
              // placeholder={xrpAddress?.classicAddress}
              // defaultValue={xrpAddress?.classicAddress}
              // inputProps={{ readOnly: true }}
              disabled
              size="small"
              InputLabelProps={{
                shrink: true
              }}
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              padding={1}>
              <Grid item>
                {!xrpAddress?.classicAddress ? (
                  <Button
                    sx={{ mt: 1, mb: 1, px: 3 }}
                    type="submit"
                    variant="contained"
                    color="success"
                    aria-label="Register"
                    onClick={handelAccount}
                    style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                    {loading10 ? <CircularProgress size={24} color="inherit" /> : 'Get Xrp Address'}
                  </Button>
                ) : (
                  <Button
                    sx={{ mt: 1, mb: 1, px: 3 }}
                    type="submit"
                    variant="contained"
                    color="success"
                    aria-label="Register"
                    style={{ textTransform: 'capitalize', fontSize: '16px' }}>
                    {loading1 ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                  </Button>
                )}
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
export default MembersList;
