import React from 'react'
import { makeStyles, Divider, Card } from '@material-ui/core'
import {UserState} from "../../../context/userContext";
import NoActiveDb from '../../Utility/NoActiveDb'
import QueryResultContainer from './QueryResultContainer'
import QueryInput from './QueryInput'
import QueryToolbar from './QueryToolbar'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    card: {
        height: '100%',
        borderRadius: '25px',
        overflowY: 'auto'
    },
    heading: {
        marginTop: '3%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:200,
    },
    divider: {
        marginTop: '1%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    objectContainer: {
        width: '90%',
        marginTop: '1%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

/**
 * Card Displaying the query input, commands and results of a query
 * Children: QueryToolbar, QueryInput, QueryResultContainer
 */
export default function DbQueryScreenCard() {
  const classes = useStyles();
  const { user } = UserState();
    
  // state used for getting input from text field 
  const [input, setInput] = React.useState('');
    
  //state used for managing the query and its status
  const [query, setQuery] = React.useState({
    queryString: undefined,
    shouldCommit: false,
    querySuccess: false
  });

  return(
    <div className={classes.root}>
      <Card className={classes.card}>
        <QueryToolbar input={input} setInput={setInput} setQuery={setQuery}/>
        <Divider className={classes.divider}/>
        {user.act_db_name !== '' ? (
          <div>
            <QueryInput input={input} setInput={setInput} query={query} setQuery={setQuery} />
            <div className={classes.objectContainer}>
              <QueryResultContainer query={query} setQuery={setQuery} />
            </div>
          </div>
        ): (
          <NoActiveDb/>
        )}
      </Card>
    </div>
  )
}