import './assets/css/home.css'
import PageResult from './PageResult'
import Convert from './Convert'

import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'

import { Link } from 'react-router-dom'
import {
  CX_SEARCH,
  KEY_API_SEARCH,
  URL_DB,
  setItemLocalStorage,
  toastInfor,
  toastSuccess,
  toastSuccessz,
  LINK_SEARCH
} from './base/base'

import { ExcelRenderer } from 'react-excel-renderer'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ToastContainer, toast } from 'react-toastify'
import TableUrl from './TableUrl'
import SearchAppBar from './SearchAppBar'

const rows = []

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title='Bắt đầu cào'>
        <IconButton onClick={handleClickOpen}>
          <PlayCircleFilledWhiteIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ width: '350px' }}>
          {'Xin hãy lựa chọn'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn muốn tiếp tục hay bắt đầu, xin hãy lựa chọn !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.handleStart(handleClose)}>
            Post Key
          </Button>
          {/* <Button onClick={e => props.handleContinue(handleClose)} autoFocus>
            Get Key
          </Button> */}
          <Button onClick={e => props.handleSearchUrl(handleClose)} autoFocus>
            Cào bài
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'key',
    numeric: false,
    disablePadding: true,
    label: 'KEY API'
  },
  // {
  //   id: 'search-key',
  //   label: <BasicTextFields />
  // }
]

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
      {/* <TextField
        // value={searchTerm}
        // onChange={e => handleChangeSearchInput(e)}
        id="outlined-basic" label="Tìm kiếm Key" variant="outlined" /> */}
      <SearchAppBar />
    </Box>
  );
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
            <BasicTextFields />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const EnhancedTableToolbar = props => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 600 }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          KEY Tìm kiếm
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <AlertDialog
          handleStart={props.handleStart}
          // handleContinue={props.handleContinue}
          handleSearchUrl={props.handleSearchUrl}
        />
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

function Home() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)

  const [searchTerms, setSearchTerms] = React.useState()

  const [file, setFile] = React.useState({
    cols: [],
    rows: []
  })

  // datas mảng chứa tất cả dữ liệu sau khi tìm kiếm bằng KEY
  const [datas, setDatas] = React.useState([])
  const [displayUrl, setDisplayUrl] = React.useState([])
  const [resetHome, setResetHome] = React.useState(false)
  const [keysArr, setKeysArr] = React.useState([])

  const [searchTerm, setSearchTerm] = React.useState('')

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const fileHandler = event => {
    let fileObj = event.target.files[0]

    ExcelRenderer(fileObj, (err, resp) => {
      console.log(resp.rows)
      toastSuccess('Import thành công!')
      resp.rows.splice(0, 2)
      console.log(resp.rows)
      if (err) {
        console.log(err)
      } else {
        setFile({
          cols: resp.cols,
          rows: resp.rows.filter(item => item.length !== 0).reverse()
        })
      }
    })
  }
  const getKey = () => {
    let keyArr = []
    fetch(`${URL_DB}WebClone/rd/xml/a/get-key`)
      .then(response => response.json())
      .then(rs => {
        if (rs.length !== 0) {
          rs.map(item => {
            keyArr.push({
              id: item.id,
              ten: item.ten,
              check: item.check
            })
          })
        } else {
          keyArr.push({
            ten: 'Chưa có Key nào trong Database'
          })
        }
        setKeysArr(keyArr)
      })
  }

  React.useEffect(() => {
    getKey()
  }, [])

  React.useEffect(() => {
    let baiVietAll = []
    fetch(`${URL_DB}WebClone/rd/xml/a/get-bai-viet-all`)
      .then(response => response.json())
      .then(rs => {
        if (rs.length !== 0) {
          rs.map(async item => {
            await fetch(
              `${URL_DB}WebClone/rd/xml/a/get-url-by-id/${item.id_url}`
            )
              .then(response => response.json())
              .then(rss => {
                baiVietAll.push({
                  url: rss[0].url,
                  title: item.post_title ? item.post_title : '',
                  content: item.post_content,
                  newUrl: `${URL_DB}WebClone/${item.post_name}`
                    ? `${URL_DB}WebClone/${item.post_name}`
                    : ''
                })
                return baiVietAll
              })
              .then(rs => {
                setDisplayUrl([...rs])
              })
          })
        }
      })
  }, [])

  // Hàm logic xử lý cào

  const handleStart = handleClose => {
    if (file.rows.length !== 0) {
      handlePostKey(file.rows)
    } else {
      toast.warning('Chưa có dữ liệu')
    }
    handleClose()
  }

  // End hàm logic xử lý cào

  const handleDisplayUrl = id => {
    if (id) {
      fetch(`${URL_DB}WebClone/rd/xml/a/get-url/${id}`)
        .then(response => response.json())
        .then(rs => {
          let arrDetail = []
          let urlArr = []
          rs.map(item => {
            urlArr.push({
              idUrl: item.id,
              url: item.url
            })
          })
          urlArr = [...urlArr]
          urlArr.map(async item => {
            await fetch(
              `${URL_DB}WebClone/rd/xml/a/get-bai-viet-by-url/${item.idUrl}`
            )
              .then(response => response.json())
              .then(rs => {
                arrDetail.push({
                  url: item.url,
                  title: rs[0] === undefined ? '' : rs[0].post_title,
                  content: rs[0] === undefined ? '' : rs[0].post_content,
                  newUrl:
                    rs[0] === undefined
                      ? ''
                      : `${URL_DB}WebClone/${rs[0].post_name}`
                })
                return arrDetail
              })
              .then(rs => {
                setDisplayUrl([...rs])
              })
          })
        })
    } else {
    }
  }

  // const handleGetKey = async () => {
  //   let keyArr = [];
  //   await fetch(`${URL_DB}WebClone/rd/xml/a/get-key`)
  //     .then(response => response.json())
  //     .then(rs => {
  //       if(rs.length !== 0) {
  //         rs.map(item => {
  //           keyArr.push({
  //             id: item.id,
  //             ten: item.ten,
  //             check: item.check
  //           })
  //         })
  //       } else {
  //         keyArr.push({
  //           ten: "Chưa có dữ liệu người dùng"
  //         })
  //       }
  //       setKeysArr(keyArr)
  //     })
  // }

  const cutKeyAndUrl = myString => {
    let index = myString.indexOf('-')
    return [myString.slice(0, index), myString.slice(index + 1).trim()]
  }

  const handlePostKey = datas => {
    let arr = []
    datas.map(item => {
      arr.push({
        // tien_to:item[2],
        ten: item[3]
        // hau_to:item[4],
        // key1: cutKeyAndUrl(item[5]),
        // key2: cutKeyAndUrl(item[6]),
        // key3: cutKeyAndUrl(item[7]),
        // top_view1: cutKeyAndUrl(item[9]),
        // top_view2: cutKeyAndUrl(item[10]),
        // top_view3: cutKeyAndUrl(item[11])
      })
    })
    console.log(arr)
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arr)
    }
    fetch(`${URL_DB}WebClone/rd/xml/a/save-key`, options)
      .then(response => response.json())
      .then(rs => {
        toastSuccess('Thêm Key vào Database thành công')
      })
  }

  const handleSearchUrl = handleClose => {
    let newKeysArr = []
    keysArr.map(async (item, index) => {
      if (item.check === 0) {
        newKeysArr.push({ id: item.id, ten: item.ten })
      }
    })
    newKeysArr.map(async (item, index) => {
      var urlAll = []
      await fetch(
        `${LINK_SEARCH}key=${KEY_API_SEARCH}&cx=${CX_SEARCH}&start=1&num=10&q=${item.ten}`
      )
        .then(response => {
          return response.json()
        })
        .then(rs => {
          let arr = rs.items
          for (let i in arr) {
            urlAll.push({ url: arr[i].formattedUrl })
          }
          //em muốn lấy ra 20 url ở đây, sau đó truyền vào options và gọi API save URL,
        })

      await fetch(
        `${LINK_SEARCH}key=${KEY_API_SEARCH}&cx=${CX_SEARCH}&start=11&num=10&q=${item.ten}`
      )
        .then(response => {
          console.log(response)
          return response.json()
        })
        .then(rs => {
          console.log(rs)
          let arr = rs.items
          for (let i in arr) {
            urlAll.push({
              url: arr[i].link.split(' ').join('')
            })
          }
        })

      console.log(urlAll)
      setDatas(prev => [...prev, urlAll])
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(urlAll)
      }
      await fetch(`${URL_DB}WebClone/rd/xml/a/save-url/${item.id}`, options)
        .then(response => response.json())
        .then(async rs => {
          let options2 = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([])
          }
          await fetch(
            `${URL_DB}WebClone/rd/xml/a/check-key/${item.id}`,
            options2
          )
            .then(response => response.json())
            .then(rs2 => {
              console.log('thanh cong myx man')
            })
        })
    })
    toastSuccess('Cào bài thành công')
    handleClose()
  }

  return (
    <>
      <Box
        className="container"
        sx={{ position: 'relative', width: '22%', margin: '100px 0 0 120px' }}
      >
        <label htmlFor='inputTag'>
          <span className='btn-import'>
            Import
            <i className="fa-solid fa-file-import"></i>
          </span>
          <input
            id='inputTag'
            type='file'
            onChange={e => fileHandler(e)}
            style={{ display: 'none' }}
          />
        </label>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleStart={handleStart}
            // handleContinue={handleContinue}
            handleSearchUrl={handleSearchUrl}
          />
          <TableContainer>
            <Table
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(keysArr, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, index) => {
                    const isItemSelected = isSelected(data[index])
                    const labelId = `enhanced-table-checkbox-${index}`
                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        className='table-row'
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={data.check === 1}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 500 }}
                          align='left'
                          onClick={() => handleDisplayUrl(data.id)}
                        >
                          {data.ten}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows
                    }}
                  >
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[100, 200, 500]}
            component='div'
            count={keysArr.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label='Dense padding'
        />
      </Box>
      <TableUrl
        keyArr={file.rows}
        displayUrl={displayUrl}
        setDisplayUrl={setDisplayUrl}
      />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Home
