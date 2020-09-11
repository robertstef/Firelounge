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
    }
}));


export default function DbQueryScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    const [input, setInput] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [successfulQuery, setSuccessfulQuery] = React.useState(false);

    
    const handleInput = (event) => {
        setInput(event.target.value)
        setSuccessfulQuery(false)
      };

    const handleRun = () => {
        setQuery(input)
        setSuccessfulQuery(true)
    }

    const handleClear = () => {
        setInput('')
        setSuccessfulQuery(false)
    }

    const handleLoad = () => {
        
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Toolbar>
                    <Typography className={classes.heading} variant={"h6"}> Query Database </Typography>
                    <SaveQueryModal query={input}/>
                    <Button variant="outlined" onClick={handleRun} className={classes.button}> Run </Button>
                    <LoadQueryModal/>
                    <IconButton className={classes.iconButton} size="medium" onClick={handleClear}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Toolbar>
                <Divider className={classes.divider}/>
                {user.act_db_name !== '' ? (
                    <div>
                        <TextField
                        InputProps={{
                            classes: {
                              notchedOutline: successfulQuery ? classes.successfulQuery : null
                            }
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
                            <QueryResultContainer queryString={query}/>
                        </div>
                    </div>
                ): (
                    <NoActiveDb/>
                )}

            </Card>
        </div>
    )
}