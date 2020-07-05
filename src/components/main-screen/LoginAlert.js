import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UserDispatch} from "../../context/userContext";
import CircularProgress from "./CircularProgress"
const login = require('../../scripts/login');
const initModule = require('../../scripts/init');

export default function LoginAlert(props) {
  const dispatch = UserDispatch();
  const [open, setOpen] = React.useState(props.isOpen);  
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    
    async function userLogin() {

      let response = await login.login_function();
      //TODO: check response -- should contain a login success message

      initModule.init_function().then(async (output) => {
        await dispatch({type: 'createUser', args: output});
        setOpen(false)
        setLoading(false)
      }).catch(err => {
        console.log(err);
        
      })
    };
    setLoading(true)
    userLogin();


  };

  const showCircularProgress = () => {
    if(loading){
      return(
        <CircularProgress/>
      )
    }

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Welcome to Firelounge"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please login with your Google account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Login
          </Button> 
        </DialogActions>
      </Dialog>
      {showCircularProgress()}
    </div>
  );
}

