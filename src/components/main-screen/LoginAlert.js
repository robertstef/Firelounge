import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function LoginAlert(props) {

  const [open, setOpen] = React.useState(props.isOpen);

  //if props have changed... update state
  if(open !== props.isOpen){
    setOpen(props.isOpen)
  }

  const handleClose = () => {
    setOpen(false);
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
    </div>
  );
}

