import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CallMissedOutgoingRoundedIcon from '@material-ui/icons/CallMissedOutgoingRounded';
import {makeStyles} from "@material-ui/core/styles";


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



function completeSignIn(){

    //call js login script here
    var username = 'testusername'

    window.location.href="#/project?username=" + username
}




function FlexTag(props) {
    const classes = useStyles();
    return(
        <Box className={classes.parent}>
            <Button classes={{ root: classes.root, label: classes.label}} onClick={() => completeSignIn()}>
                {props.title}
                <CallMissedOutgoingRoundedIcon className={classes.icon} />
            </Button>
        </Box>
    )
}

export default FlexTag;
