import {useEffect, useState} from 'react';
import {
    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TablePagination,TableSortLabel,Paper,TextField,Box
} from '@mui/material';
import useTableApi from './useTableApi';

function descendingComparator(a,b,orderBy) {
    if(b[orderBy] < a[orderBy]) return -1;
    if(b[orderBy] > a[orderBy]) return 1;
    return 0;
}
function getComparator(order,orderBy) {
    return order === 'desc'
        ? (a,b) => descendingComparator(a,b,orderBy) : (a,b) => -descendingComparator(a,b,orderBy);
}
function applySortFilter(data,comparator,filterText,filterField){
    const filtered = filterText ? data.filter(row => {
        const val = row[filterField];
        return val?.toString().toLowerCase().includes(filterText.toLowerCase());
    })
    : data ;
    return [...filtered].sort(comparator);
}

export default function CustomGrid({tableName,columns,filterField}){

    const {list} = useTableApi(tableName);
    const [rows,setRows] = useState([]);
    const [order,setOrder] = useState([]);
    const [orderBy,setOrderBy] = useState(columns[0]?.field || 'id');
    const [filterText,setFilterText] = useState('');
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await list();
                setRows(data);
            } catch (err) {
                console.error('Failed to load data:',err);
            }
        };
        fetch();
        console.log('list:',list);
    },[tableName,list]);

    const handleSort =(field) => {
        const isAsc = orderBy === field && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage= (e) => {
        setRowsPerPage(parseInt(e.target.value,10));
        setPage(0);
    };

    const sortedFilteredRows = applySortFilter(rows,getComparator(order,orderBy),filterText,filterField);
    const paginatedRows = sortedFilteredRows.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage);

    return (
        <Paper sx={{mt:3,p:2}}>
            <Box mb={2}>
                <TextField label={`Search by ${String(filterField)}`} value={filterText}
                    onChange={(e) => setFilterText(e.target.value)} fullWidth
                />
            </Box>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <TableCell key={col.field} sortDirection={orderBy === col.field ? order : false}>
                                    {typeof col.headerName === 'string' && col.headerName ? (
                                    <TableSortLabel
                                        active={orderBy === col.field}
                                        direction={orderBy === col.field ? order : 'asc'}
                                        onClick={() => handleSort(col.field)}
                                    >
                                       {col.headerName}
                                    </TableSortLabel>
                                    ): (<>{col.field}</>)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map(col => (
                                    <TableCell key={col.field}>
                                        {col.render ? col.render(row[col.field],row) : row[col.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {paginatedRows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination component="div" page={page}
                count={sortedFilteredRows.length} onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5,10,25,50]}
            />
        </Paper>
    );
}