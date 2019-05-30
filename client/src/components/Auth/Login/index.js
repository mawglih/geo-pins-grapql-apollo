import React from "react";
import { GoogleLogin } from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = googleUser => {
    console.log(googleUser);
    const idToken = googleUser.getAuthResponse().id_token;
    console.log('id: ', idToken );
  }
  return (
    <GoogleLogin
      clientId="175464912898-c4388b56ecr03lkho21nte2a5ntsm792.apps.googleusercontent.com"
      onSuccess={onSuccess}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);