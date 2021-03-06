import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import SettingsNav from './SettingsNav.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    outline: 0,
  },
  button: {
    position: 'absolute',
    bottom: '10px',
    marginTop: 'auto',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
  }

}));

/**
 *  Popup Modal which holds the Settings for the various firelounge Pages 
 *  Passes handleClose() down to Settings Nav  
 */

export default function SettingsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <SettingsNav close={setOpen}/>
    </div>
  );

  return (
    <div>
      <IconButton type="button" onClick={handleOpen} className={classes.button} id='settings-modal-button'>
        <SettingsIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
}
