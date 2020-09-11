import React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    //dispatch save call here

    setOpen(false);
  };

  return (
    <div>
        <IconButton aria-label="delete" size="medium" onClick={handleClickOpen} disabled={props.query === ''}>
            <SaveIcon fontSize="inherit" />
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Query</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Query: {props.query}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Query Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
