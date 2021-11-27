import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicTable(cards) {

    const [sort, setSort] = useState('desc');
    const [column, setColumn] = useState('score');

    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    if (sort === 'desc') {  // DESC
        cards = cards.sort((a, b) => (a[column] > b[column]) ? -1 : 1)
    } else {  // ASC
        cards = cards.sort((a, b) => (a[column] > b[column]) ? 1 : -1)
    }

    return (
    <>
    <tr>
    <FormControl sx={{ m: 1, minWidth: 80 }} variant="standard">
    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Sort"
        onChange={handleChange(setSort)}
    >
        <MenuItem value='desc'>Desc</MenuItem>
        <MenuItem value='asc'>Asc</MenuItem>
    </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 80 }} variant="standard">
    <InputLabel id="demo-simple-select-label">Column</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={column}
        label="Column"
        onChange={handleChange(setColumn)}
    >
        <MenuItem value='name'>Name</MenuItem>
        <MenuItem value='subject'>Subject</MenuItem>
        <MenuItem value='score'>Score</MenuItem>
    </Select>
    </FormControl>
    </tr>
    

    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Score</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {cards.map((row) => (
            <TableRow
                key={row.name + row.subject}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.score}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>

    </>
    );
}
