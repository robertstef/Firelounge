import React from 'react'
import { makeStyles, Typography, Divider,TextField,Card,Button, Toolbar, IconButton } from '@material-ui/core'
import {UserState} from "../../../context/userContext";
import NoActiveDb from '../../Utility/NoActiveDb'
import QueryResultContainer from './QueryResultContainer'
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';

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
    }
}));


export default function DbQueryScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    const [input, setInput] = React.useState('');
    const [query, setQuery] = React.useState('');

    
    const handleInput = (event) => {
        setInput(event.target.value)

        let last_char = (event.target.value).substr(event.target.value.length - 1);

        if(last_char === ';') {
            setQuery(event.target.value)
            setInput('')
        };
      };

    const handleSave = () => {
        console.log('handing save')
    }

    const handleRun = () => {
        setQuery(input)
        setInput('')
    }

    const handleLoad = () => {
        console.log('handing load')
    }

    const handleClear = () => {
        console.log('handing clear')
        setInput('')
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Toolbar>
                    <Typography className={classes.heading} variant={"h6"}> Query Database </Typography>
                    <IconButton aria-label="delete" className={classes.iconButton} size="medium" onClick={handleSave}>
                        <SaveIcon fontSize="inherit" />
                    </IconButton>
                    <Button variant="outlined" onClick={handleRun} className={classes.button}> Run </Button>
                    <IconButton aria-label="delete" className={classes.iconButton} size="medium" onClick={handleLoad}>
                        <CachedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton className={classes.iconButton} size="medium" onClick={handleClear}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Toolbar>
                <Divider className={classes.divider}/>
                {user.act_db_name !== '' ? (
                    <div>
                        <TextField
                            id="standard-textarea"
                            label="Query"
                            multiline
                            variant="outlined"    
                            className={classes.textField}
                            onChange={handleInput}
                            value={input}
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