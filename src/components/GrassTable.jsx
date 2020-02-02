import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const GrassTable = props => {

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">contribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.grassArray.map((x, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {x.data_date}
              </TableCell>
              <TableCell align="right">{x.data_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GrassTable;