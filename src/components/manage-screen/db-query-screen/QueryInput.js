import React from 'react';
import {Button, makeStyles, TextField} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '3%'
  },
  button: {
    borderColor: '#ef223c',
  },
  successfulQuery: {
    borderColor: '#4BB543',
    borderWidth: '3px'
  }
}));

export default function QueryInput({input, setInput, setQuery, query}) {
  const classes = useStyles();
  const parser = require('../../../queries-Robert/parser/queryParser'); 
  
  /* Function used to update the display of the text field */
  const handleInput = (event) => {
    setInput(event.target.value)
    setQuery({
        queryString: undefined,
        querySuccess: false,
    });
  };

  /* Function used to trigger a query with commit changes = true  */
  const handleCommitChanges = () => {
    setQuery(query => ({
      ...query,
      shouldCommit: true,
      querySuccess: false
    }))
  }

  return (
    <>
      <TextField
        InputProps={{ 
          classes: {
            notchedOutline: query.querySuccess ? classes.successfulQuery : null
          },
          endAdornment: ( 
            <Button 
              variant="outlined" 
              color='primary'
              style={{display: query.querySuccess && !query.shouldCommit && parser.determineStatementType(query.queryString) !== 'select' ? 'block' : 'none'}} 
              onClick={handleCommitChanges}
            > 
              Commit
            </Button>
          ),
        }}
        id="standard-textarea"
        label="Query"
        multiline
        variant="outlined"    
        onChange={handleInput}
        value={input}
        className={classes.textField}
      />
    </>
  );
}