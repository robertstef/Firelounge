import React from 'react'
import { makeStyles, Typography, Divider,TextField,Card,Button, Toolbar, IconButton } from '@material-ui/core'
import {UserState} from "../../../context/userContext";
import NoActiveDb from '../../Utility/NoActiveDb'
import QueryResultContainer from './QueryResultContainer'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveQueryModal from './SaveQueryModal'
import LoadQueryModal from './LoadQueryModal'

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


export default function DbQueryScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    const parser = require('../../../queries-Robert/parser/queryParser'); 
    const [input, setInput] = React.useState('');
    const [query, setQuery] = React.useState({
        queryString: undefined,
        shouldCommit: false,
        querySuccess: false
    });
    
    const handleInput = (event) => {
        setInput(event.target.value)
        setQuery({
            queryString: undefined,
            querySuccess: false,
            shouldCommit: false
        });
      };

    const handleRun = () => {
        setQuery(query => ({
            ...query,
            queryString: input,
        }))
    }

    const handleClear = () => {
        setInput('')
        setQuery(query => ({
            ...query,
            queryString: undefined,
            querySuccess: false
        }))
        
    }

    const handleCommitChanges = () => {
        setQuery(query => ({
            ...query,
            shouldCommit: true,
            querySuccess: false
        }))
    }

    
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Toolbar>
                    <Typography className={classes.heading} variant={"h6"}> Query Database </Typography>
                    <SaveQueryModal query={input} />
                    <Button variant="outlined" disabled={input === ''} onClick={handleRun} className={classes.button}> Run </Button>
                    <LoadQueryModal getInput={setInput} setQuery={setQuery}/>
                    <IconButton className={classes.iconButton} size="medium" onClick={handleClear} disabled={input === ''}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Toolbar>
                <Divider className={classes.divider}/>
                {user.act_db_name !== '' ? (
                    <div>
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