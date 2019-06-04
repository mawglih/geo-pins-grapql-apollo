import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Context from '../../../context';

const Signout = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const onSignout = () => {
    dispatch({ type: "SIGNOUT_USER" })
    dispatch({ type: 'IS_LOGGED_IN', payload: false })
  }
  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography
            variant="body1"
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToApp className={classes.buttonIcon} />
        </span>
      )}
    />
  )
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex",
    alignSelf: "center",
    marginLeft: "50%"
  },
  buttonText: {
    color: "aliceblue"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "aliceblue"
  }
};

export default withStyles(styles)(Signout);