import './assets/css/home.css'

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { Button, TextField } from '@mui/material';
import { CX_SEARCH, KEY_API_SEARCH, URL_DB, toastInfor } from './base/base';
import { Link } from 'react-router-dom';
import SearchAppBar from './SearchAppBar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleClickOpen} className='btn-content'>Chi tiết</div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chi tiết Nội dung</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.content ?? "Không lấy được html"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const rows = [

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'url',
        numeric: false,
        disablePadding: true,
        label: 'URL',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Tiêu đề',
    },
    {
        id: 'url_new',
        numeric: false,
        disablePadding: true,
        label: 'URL mới',
    },
    {
        id: 'content',
        numeric: false,
        disablePadding: true,
        label: 'Nội dung',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ padding: "0 16px" }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                marginBottom: '28px'
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Typography
                        sx={{ flex: '1 1 60%', marginRight: '32px', fontWeight: 600 }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Danh sách URL
                    </Typography>
                    <DropdownFilter />
                    <SearchAppBar />
                </>
            )}

            {/* <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip> */}

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                // value={searchTerm}
                // onChange={e => handleChangeSearchInput(e)}
                id="outlined-basic" label="Tìm kiếm URL" variant="outlined" />
        </Box>
    );
}

function DropdownFilter() {
    const handleDropDown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    return (
        <div className="dropdown">
            <button onClick={handleDropDown} className="dropbtn">Lọc URL</button>
            <div id="myDropdown" className="dropdown-content">
                <div>Tất cả</div>
                <div>Đã cào</div>
                <div>Chưa cào</div>
            </div>
        </div>
    )
}

function TableUrl(props) {
    const { keyArr, displayUrl, setDisplayUrl } = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ position: 'fixed', top: '0', right: '150px', width: '62%', margin: '120px 0 0 120px', bottom: 100, overflowY: 'auto', border: '1px solid #cccccc8a', borderRadius: '5px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={displayUrl.length}
                        />
                        <TableBody>
                            {stableSort(displayUrl, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index) => {
                                    const isItemSelected = isSelected(data[index]);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontWeight: 500 }}>
                                                <a href={data.url} target="_blank">
                                                    {data.url}
                                                </a>
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontWeight: 500 }}>
                                                {data.title}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontWeight: 500 }}>
                                                <a href={data.newUrl} target="_blank">
                                                    {data.newUrl}
                                                </a>
                                            </TableCell>
                                            <TableCell sx={{ width: '150px', fontWeight: 500 }} align="left">
                                                {/* <div className='btn-content'>Chi tiết</div> */}
                                                <FormDialog content={data.content} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={displayUrl.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box >

    );
}

export default TableUrl;
