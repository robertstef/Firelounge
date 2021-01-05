import React, {useEffect} from 'react';
import {Button, makeStyles, TextField, Paper, List, ListItem, ListItemText} from '@material-ui/core/';
import {UserState} from '../../../context/userContext'


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
  /* Handles the children for the autocomplete object */
  const [children, setChildren] = React.useState([]);
  /* Handles the database object from firebase */
  const [database, setDatabase] = React.useState({});
  const {user} = UserState();
    
  useEffect(() => {
    var db = user.db_obj
    var ref = db.ref();

    //handles display update of any changes made to database via firebase console or in app
    ref.on("value", (snapshot) => {
        if(snapshot.val() !== null) {
          setDatabase(snapshot.val());
        }
    })   
  }, [user.act_db_name, user.admin_obj, user.db_obj])


  /* Function used to update the display of the text field */
  const handleInput = (event) => {
    if(event.target.value.indexOf('#') !== -1 ){
      loadAutocomplete(event.target.value);
    } else {
      setDisplayAutocomplete(false)
      setQuery({
        queryString: undefined,
        querySuccess: false,
      });
    }
    setInput(event.target.value)
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
        setAutocompleteIndex((autocompleteIndex + 1) % children.length)
    }else if(event.key === 'ArrowUp') {
      setAutocompleteIndex((autocompleteIndex - 1) % children.length)
    }else if(event.key === 'Enter') {
      handleAutoComplete(children[autocompleteIndex])
    }else if(event.key === 'Escape' || event.key === 'Backspace') {
      setDisplayAutocomplete(false)
      setAutocompleteIndex(0)
    }
  }

  
  /* Function used to bring in the selected autocomplete item into the textfield*/
  const handleAutoComplete = (child) => {
    let index_hash = input.indexOf('#')
    let first_half = input.substring(0, index_hash)
    let second_half = input.substring(index_hash + 1, input.length)
    setInput(first_half + child + second_half);
    setDisplayAutocomplete(false)
    setAutocompleteIndex(0)
  }

  /* Function parses the query input and sets the children of the current json object*/
  const loadAutocomplete = (target) => {
    let string = target.split(' ')
    let index_hash; 
    
    //find which word contains a #
    for (let i in string){
      if(string[i].indexOf('#') !== -1){
        index_hash = i 
      }
    }
    //get word that has hash, split its components by .
    let chunks = string[index_hash].split('.')

    //if it starts with #, its the root of database
    if(chunks[0] === '#'){setChildren(Object.keys(database))}
    else {
      let new_data = database // start from full data

      //iterate through all pieces of the word, traverse the database and get the keys
      var flag = false
      for (let key in chunks){
        if(new_data.hasOwnProperty(chunks[key]) && typeof(new_data[[chunks[key]]]) === 'object' ) {
          flag = true
          new_data = new_data[[chunks[key]]]
          setChildren(Object.keys(new_data))
        }
      }
      //if no children are found throughout
      if(!flag){
        setChildren([])}
    }
    setDisplayAutocomplete(true);
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
        onKeyDown={(event) => handleKeyPressed(event)}
        value={input}
        className={classes.textField}
      />
      <Paper className={classes.autocompleteList} style={{display: displayAutocomplete ? 'block' : 'none'}} >
        <List >
          {children.map(function(child){
            return (
              <ListItem selected={children[autocompleteIndex] === child ? true: false} button key={child} onClick={() => handleAutoComplete(child)} >
              <ListItemText primary={child} />
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </>
  );
}