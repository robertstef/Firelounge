import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CallMissedOutgoingRoundedIcon from '@material-ui/icons/CallMissedOutgoingRounded';
import {makeStyles} from "@material-ui/core/styles";
import {UserDispatch} from "../../context/userContext";

const axios = require('axios');

const hoveredTextColor = '#000000';


const useStyles = makeStyles(theme => ({

    root: {
        backgroundColor:'#f0f0f0',
        '&:hover, &.Mui-focusVisible': {
            color: hoveredTextColor,
            '& $icon': {
                color: hoveredTextColor,
                marginLeft: theme.spacing(1),
                visibility: 'visible',
                opacity: 1,
            },
        },
    },

    label: {
        transition: '0.2s',
        textTransform: 'initial',
    },
    icon: {
        fontSize: 18,
        visibility: 'hidden',
        opacity: 0,
        transition: '0.3s',
        color: theme.palette.common.white,
        marginLeft: -theme.spacing(1.5),
        '& .MuiIcon--fa': {
            padding: 0,
        },
    }
}));

/**
 * Calls the init endpoint to initialize a new user
 * for the current session.
 *
 * @param dispatch: Context dispatch to create user
 */
async function completeSignIn(dispatch) {
    try {
       let resp = await axios.get("http://localhost:5000/init");
       await dispatch({type: 'createUser', args: resp.data});
       window.location.href = "#/project";
    }
    catch(err) {
        console.log(err);
    }
}




function FlexTag(props) {
    const classes = useStyles();
    const dispatch = UserDispatch();
    return(
        <Box className={classes.parent}>
            <Button classes={{ root: classes.root, label: classes.label}} onClick={() => completeSignIn(dispatch)}>
                {props.title}
                <CallMissedOutgoingRoundedIcon className={classes.icon} />
            </Button>
        </Box>
    )
}

export default FlexTag;
