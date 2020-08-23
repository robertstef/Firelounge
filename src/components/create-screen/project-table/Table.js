/*
   Defines a table for use by AddProjContent.js to display
   the users current firebase projects that have not been
   added to firelounge.
 */

import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert } from 'react-context-alerts';
import AddProjButton from './AddProjButton'
import {UserState} from '../../../context/userContext';

const useStyles = makeStyles({
    root: {
        height: '70%',
        width: '90%',
        margin: '0 auto',
    },
    table: {
        border: '0px',
        margin: '0px',
        marginBottom: '-1px',
        backgroundColor: 'transparent',
    },
    tableHead: {
        borderBottom: 'hidden',
    },
    tableHeadCell: {
        backgroundColor: 'white',
        color: 'black',
    },
    tableBody: {
    },
    tableBodyCell: {
        color: 'white',
        backgroundColor: 'transparent'
    },

});

/**
 * Creates and object to be used as data for the
 * table row.
 * @param name: String - project name
 * @param id: String - project id
 * @param num: String - project number
 * @returns {{num: *, name: *, id: *}}
 */
function createData(name, id, num) {
    return {name, id, num};
}

export default function CustomizedTable() {
    const classes = useStyles();
    const {user} = UserState();
    let projects = user.firebase_projs;
    
    /* Create rows of firebase projects for table */
    let rows = [];
    for (let p of projects) {
        let r = createData(p.name, p.id, p.num);
        rows.push(r);
    }

    /* Callback to trigger the successful import alert */
    const [success, setSuccess]  = React.useState({display: false, message: ''});
    const triggerAlert = (event) => {
      setSuccess(event);   
    }
    
    return (
            <TableContainer className={classes.root}>
                <Table stickyHeader className={classes.table} aria-label="customized table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align='center' className={classes.tableHeadCell} style={{borderRadius: '16px 0px 0px 16px'}} >Project Name</TableCell>
                            <TableCell align='center' className={classes.tableHeadCell}>Project ID</TableCell>
                            <TableCell align='center' className={classes.tableHeadCell}>Project Number</TableCell>
                            <TableCell align='center'className={classes.tableHeadCell} style={{borderRadius: '0px 16px 16px 0px'}}/>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align='center' className={classes.tableBodyCell}>{row.name}</TableCell>
                                <TableCell align='center' className={classes.tableBodyCell}>{row.id}</TableCell>
                                <TableCell align='center' className={classes.tableBodyCell}>{row.num}</TableCell>
                                <TableCell align='center' className={classes.tableBodyCell}><AddProjButton cur_proj={row} alert={setSuccess} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Alert id='create-existing-proj-alert' timeout={5000} type={'success'} open={success.display} message={success.message} onClose={()=>{ setSuccess({display:false, message:''})} }/>
            </TableContainer>
            
    )
}