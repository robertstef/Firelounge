import React from 'react'
import { makeStyles, Typography, Divider,TextField,Card } from '@material-ui/core'
import {UserState} from "../../../context/userContext";
import NoActiveDb from '../../Utility/NoActiveDb'
import QueryResultContainer from './QueryResultContainer'

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
}));


export default function DbQueryScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    const [query, setQuery] = React.useState('');
    
    const handleInput = (event) => {
        let input = event.target.value
        let last_char = (input).substr(input.length - 1);
    
        if(last_char === ';') {
            setQuery(input)
            event.target.value = ''
        };
      };



    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading} variant={"h6"}> Query Database </Typography>
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