import React from 'react';
import {Button, Toolbar, Typography, IconButton, makeStyles} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveQueryModal from './SaveQueryModal'
import LoadQueryModal from './LoadQueryModal'

const useStyles = makeStyles((theme) => ({
    heading: {
        marginTop: '3%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:200,
    },
    button: {
        borderColor: '#ef223c',
    },
}));




export default function QueryToolbar({input, setInput, setQuery}) {
  const classes = useStyles();
  
  /* Function used to trigger the running of a query  */
  const handleRun = () => {
    setQuery(query => ({
      ...query,
      queryString: input,
      shouldCommit: false
    }))
  }

  /* Function used to clear the textfield and empty the query state  */
  const handleClear = () => {
    setInput('')
    setQuery({
      queryString: undefined,
      querySuccess: false,
      shouldCommit: false
    });
  };
  
  return (
    <Toolbar>
      <Typography className={classes.heading} variant={"h6"}> 
        Query Database 
      </Typography>
      <SaveQueryModal query={input} />
      <Button variant="outlined" onClick={handleRun} className={classes.button} disabled={input === ''}> Run </Button>
      <LoadQueryModal getInput={setInput} setQuery={setQuery}/>
      <IconButton className={classes.iconButton} size="medium" onClick={handleClear} disabled={input === ''}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Toolbar>
  );
}
