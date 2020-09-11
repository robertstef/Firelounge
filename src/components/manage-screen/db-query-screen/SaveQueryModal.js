import React from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import {UserDispatch} from "../../../context/userContext";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const dispatch = UserDispatch();

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInput('')
  };

  const handleSave = async () => {
    //dispatch save call here
    try{
      let obj = {
        name: input,
        queryString: props.query
      }
      await dispatch({type: 'saveDbQuery', args: obj});

    } catch (error) {
      console.log(error)
    }
    setOpen(false);
    setInput('')
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
            value={input}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
