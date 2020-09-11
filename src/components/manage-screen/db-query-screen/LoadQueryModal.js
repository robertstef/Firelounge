import React from 'react';
import {List, ListItem, ListItemText, DialogTitle, Dialog, IconButton} from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import {UserState} from "../../../context/userContext";

function SimpleDialog(props) {
  const { onClose, open, queries } = props;

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
        {queries.map((query) => (
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
  const {user} = UserState(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
    if(value !== undefined){
      //pass back value to textfield
      props.getInput(user.act_db_queries[value])
    }
  };
  
  let queryList;
  try{
    queryList = Object.keys(user.act_db_queries)
  }catch (error) {}

  return (
    <div>
        <IconButton size="medium" disabled={queryList === undefined || queryList.length === 0} onClick={handleClickOpen}>
            <GetAppIcon fontSize="inherit" />
        </IconButton>
        { queryList === undefined ? 
          null :
          <SimpleDialog queries={queryList} open={open} onClose={handleClose} />          
          }
    </div>
  );
}
