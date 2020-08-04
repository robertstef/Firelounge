import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UserDispatch, UserState} from "../../context/userContext";
import CircularProgress from "./CircularProgress"


export default function LoginAlert(props) {
  const dispatch = UserDispatch();
  const [open, setOpen] = React.useState(props.isOpen);  
  const [loading, setLoading] = React.useState(false);
  const {user} = UserState();
  const login = require('../../scripts/login');
  const initModule = require('../../scripts/init');

  useEffect(() => {
    if(user.uname === '' || user.uname === undefined){
      setOpen(true)
    }
  }, [user.uname])


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
      {loading ?  <CircularProgress/> : null}
    </div>
  );
}

