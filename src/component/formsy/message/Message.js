import { amber, blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from '../../../store/messageSlice';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  '& .Message-content': {
    ...(variant === 'success' && {
      backgroundColor: 'rgb(50,186,118)',
      color: '#FFFFFF'
    }),

    ...(variant === 'error' && {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark)
    }),

    ...(variant === 'info' && {
      backgroundColor: blue[600],
      color: '#FFFFFF'
    }),

    ...(variant === 'warning' && {
      backgroundColor: amber[600],
      color: '#FFFFFF'
    })
  }
}));

const variantIcon = {
  success: 'clarity:success-standard-line',
  warning: 'material-symbols:error-circle-rounded-outline',
  error: 'material-symbols:error-circle-rounded-outline',
  info: 'material-symbols:error-circle-rounded-outline'
};

function Message() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.message.state);
  const options = useSelector((state) => state.message.options);

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div'
        }
      }}>
      <SnackbarContent
        className="Message-content"
        message={
          <Grid container justifyContent="center" alignContent="baseline">
            <Grid sx={{ mt: 0.5 }} item>
              {variantIcon[options.variant] && (
                <Icon
                  icon={variantIcon[options.variant]}
                  width={'18'}
                  height={'18'}
                  color="inherit"
                />
              )}
            </Grid>
            <Grid item>
              <Typography sx={{ mx: 2 }}>{options.message}</Typography>
            </Grid>
          </Grid>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large">
            <Icon icon="material-symbols:close" color="inherit" />
          </IconButton>
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(Message);
