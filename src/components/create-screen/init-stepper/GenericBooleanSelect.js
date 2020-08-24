import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 200,
        background: 'white',
        fontWeight:200,
        borderStyle:'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
        "&:focus":{
            borderRadius: 12,
            background: 'white',
        },
    },
    Menu_icon:{
        right: 12,
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none'
    },
    paper: {
        borderRadius: 12,
        marginTop: 8,
    },
    list: {
        paddingTop:0,
        paddingBottom:0,
        background:'white',
        "& li":{
            fontWeight:200,
            paddingTop:12,
            paddingBottom:12,
        },
    },
}));

export default function GenericStepperInput(props) {
    const classes = useStyles();

    const [selection, setSelection] = React.useState('');


    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    const iconProps = () => {
        return (
            <ExpandMoreIcon className={classes.Menu_icon}/>
        )};

    return (
        <div>
            <FormControl>
                <Select
                    disableUnderline
                    classes={{root: classes.select}}
                    value={selection}
                    onChange={(e) => {props.getSelection(e.target.value); setSelection(e.target.value)}}
                    MenuProps={menuProps}
                    IconComponent={iconProps}
                >
                    <MenuItem value={''}/>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

