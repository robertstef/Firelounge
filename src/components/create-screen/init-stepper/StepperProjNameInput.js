import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        minHeight: 40,
    },
    paper: {
        borderRadius: 12,
        marginTop: 8,
    },
    textfield: {
        height: 48,
        color: '#000000',
        background: 'white',
        fontWeight:200,
        borderStyle:'none',
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 13,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
    },
}));

let RED = '#ef223c';

let id_hex = () => {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 5; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
};

export default function StepperProjNameInput(props) {
    const classes = useStyles();

    let err = props.err;

    return (
        <div>
            <Paper component={'form'} className={classes.paper} elevation={0}>
                {err ? (
                    <Toolbar disableGutters classes={{regular: classes.toolbar}}>
                        <FiberManualRecordIcon style={{color: RED, marginLeft: 5,}}/>
                        <Typography style={{fontWeight:200, marginLeft: 5, color: RED}} variant={'body2'}>Project name must be between 4-20 characters.</Typography>
                    </Toolbar>
                ) : null}
                <InputBase
                    id={'create-proj-input-name'}
                    fullWidth
                    className={classes.textfield}
                    placeholder="Enter your project name"
                    color={'secondary'}
                    onChange={(e) => {props.getProjectName(e.target.value) ; props.getProjectID(e.target.value.replace(/\s+/g, '-').toLowerCase() + "-" + id_hex())}}
                />
            </Paper>
        </div>
    );
}

