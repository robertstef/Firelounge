import React from 'react';
import {Button, makeStyles, TextField, Paper, List, ListItem, ListItemText} from '@material-ui/core/';

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
  },
  autocompleteList: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '0px'
  }
}));

export default function QueryInput({input, setInput, setQuery, query}) {
  const classes = useStyles();
  const parser = require('../../../queries-Robert/parser/queryParser'); 
  /* Triggers the display of the Autocomplete list */
  const [displayAutocomplete, setDisplayAutocomplete] = React.useState(false);
  /* Handles the index of the items selected in the autocomplete list */
  const [autocompleteIndex, setAutocompleteIndex] = React.useState(0);

  /* Function used to update the display of the text field */
  const handleInput = (event) => {
    if(event.target.value[event.target.value.length - 1] === '@'){
      setDisplayAutocomplete(true)
    } else {
      setDisplayAutocomplete(false)
    }
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
  
  /* Function used to handle key presses, which allows of key control of autocomplete list  */
  const handleKeyPressed = (event) => {
    if(!displayAutocomplete){return}
    event.preventDefault();
    if(event.key === 'ArrowDown') {
        setAutocompleteIndex((autocompleteIndex + 1) % items.length)
    }else if(event.key === 'ArrowUp') {
      setAutocompleteIndex((autocompleteIndex - 1) % items.length)
    }else if(event.key === 'Enter') {
      handleAutoComplete(items[autocompleteIndex])
    }
  }

  /* Function used to bring in the selected autocomplete item into the textfield*/
  const handleAutoComplete = (item) => {
    setInput(input.substring(0, input.length - 1) + item);
    setDisplayAutocomplete(false)
    setAutocompleteIndex(0)
  }

  var items = ['Item1', 'Item2', 'Item3']
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
        onKeyDown={(event) => handleKeyPressed(event)}
        value={input}
        className={classes.textField}
      />
      <Paper className={classes.autocompleteList} style={{display: displayAutocomplete ? 'block' : 'none'}} >
        <List >
          {items.map(function(item){
            return (
              <ListItem selected={items[autocompleteIndex] === item ? true: false} button key={item} onClick={() => handleAutoComplete(item.title)} >
              <ListItemText primary={item} />
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </>
  );
}