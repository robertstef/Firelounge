import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import QueueIcon from '@material-ui/icons/Queue';
import IconButton from '@material-ui/core/IconButton';
import DbInitScreenCard from './DbInitScreenCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60%',
    height: '80%',
    backgroundColor: '#8D99AE',
    outline: 0,
    borderRadius: '25px',
  },
  button: {
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '600px',
  }
}));

export default function DbInitModal() {
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
        <DbInitScreenCard setOpen={setOpen}/>
    </div>
  );

  return (
    <div>
      <IconButton id={'manage-add-db-icon'} type="button" onClick={handleOpen} className={classes.button}>
        <QueueIcon />
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
