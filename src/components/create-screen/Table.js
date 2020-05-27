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


function createData(pName, pId, pNumber) {
    return {pName, pId, pNumber};
}

const rows = [
    createData('testProj', 'testProj', '1234'),
    createData('opench', 'openchProj', '2340589'),
    createData('robert', 'Robert', '123048')
];

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

export default function CustomizedTable() {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Project Name</StyledTableCell>
                        <StyledTableCell align='center'>Project ID</StyledTableCell>
                        <StyledTableCell align='center'>Project Number</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.pName}>
                            <StyledTableCell component="th" scope="row" align='center'>
                                {row.pName}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.pId}</StyledTableCell>
                            <StyledTableCell align='center'>{row.pNumber}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}