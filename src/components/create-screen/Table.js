/*
   Defines a table for use by AddProjContent.js to display
   the users current firebase projects that have not been
   added to firelounge.
 */

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddProjButton from './AddProjButton'
import {UserDispatch, UserState} from '../../context/userContext';
import GetPathButton from './GetPathButton';


// Component for individual table cell
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


// Component for table row
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


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

/*
const rows = [
    createData('testProj', 'testProj', '1234'),
    createData('opench', 'openchProj', '2340589'),
    createData('robert', 'Robert', '123048')
];
 */

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

    /* TODO need to handle case when user has no firebase projects */

    return (
        <TableContainer className={classes.root}>
            <Table stickyHeader className={classes.table} aria-label="customized table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <StyledTableCell align='center' className={classes.tableHeadCell} style={{borderRadius: '16px 0px 0px 16px'}} >Project Name</StyledTableCell>
                        <StyledTableCell align='center' className={classes.tableHeadCell}>Project ID</StyledTableCell>
                        <StyledTableCell align='center' className={classes.tableHeadCell}>Project Number</StyledTableCell>
                        <StyledTableCell align='center'className={classes.tableHeadCell} style={{borderRadius: '0px 16px 16px 0px'}}/>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align='center' className={classes.tableBodyCell}>{row.name}</StyledTableCell>
                            <StyledTableCell align='center' className={classes.tableBodyCell}>{row.id}</StyledTableCell>
                            <StyledTableCell align='center' className={classes.tableBodyCell}>{row.num}</StyledTableCell>
                            <StyledTableCell align='center' className={classes.tableBodyCell}><AddProjButton cur_proj={row} /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}