import React from 'react';
import {List, ListItem, ListItemText, DialogTitle, Dialog, IconButton} from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const sampleQueries = ['Query 1', 'Query 2'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
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

export default function LoadQueryModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(sampleQueries[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
        <IconButton size="medium" onClick={handleClickOpen}>
            <GetAppIcon fontSize="inherit" />
        </IconButton>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
