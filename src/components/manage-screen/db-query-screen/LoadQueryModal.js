import React from 'react';
import {List, ListItem, ListItemText, DialogTitle, Dialog, IconButton} from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const sampleQueries = ['Query 1', 'Query 2'];

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(undefined);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle >Select Query</DialogTitle>
      <List>
        {sampleQueries.map((query) => (
          <ListItem button onClick={() => handleListItemClick(query)} key={query}>
            <LabelOutlinedIcon/>
            <ListItemText primary={query} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function LoadQueryModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
    if(value !== undefined){
      //pass back value to textfield
      props.getInput(value)
    }
  };

  return (
    <div>
        <IconButton size="medium" onClick={handleClickOpen}>
            <GetAppIcon fontSize="inherit" />
        </IconButton>
        <SimpleDialog  open={open} onClose={handleClose} />
    </div>
  );
}
