import React from 'react';
import {List, ListItem, ListItemText, DialogTitle, Dialog, IconButton, ListItemSecondaryAction, Divider} from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {UserState, UserDispatch} from "../../../context/userContext";


function SimpleDialog(props) {
  const { onClose, open, queries } = props;
  const dispatch = UserDispatch();

  const handleClose = () => {
    onClose(undefined);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleDelete = async (value) => {
    try {
      await dispatch({type: 'deleteDbQuery', args: value});
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle >Select Query</DialogTitle >
      <Divider style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}/>
      <List>
        {queries.map((query) => (
          <ListItem button onClick={() => handleListItemClick(query)} key={query}>
            <LabelOutlinedIcon />
            <ListItemText primary={query} style={{marginLeft: '5%'}}/>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(query)} style={{marginRight: '5%'}}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

/**
 * 
 * Dialog List which displays the list of saved queries 
 * @param {*} props :
 * props.getInput - callback function which places the querystring value into the query textbox
 * props.setSuccessfulQuery - callback function which changes the border color of the query textbox
 */
export default function LoadQueryModal({setQuery, getInput}) {
  const [open, setOpen] = React.useState(false);
  const {user} = UserState(); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    
    if(value !== undefined){
      //pass back value to textfield
      getInput(user.act_db_queries[value])
      setQuery(query => ({
        ...query,
        querySuccess: false
    }))
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
