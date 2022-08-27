import '../assets/css/header.css'
import { Link } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


// allTool.filter((val) => {
//     if (searchTerm === "") {
//         return val;
//     } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
//         return val;
//     }
// }).map((value, index) => { })


const Header = () => {
    const [searchTerm, setSearchTerm] = React.useState('')
    function BasicTextFields() {
        return (
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    value={searchTerm}
                    // onChange={e => handleChangeSearchInput(e)}
                    id="outlined-basic" label="Tìm kiếm Key" variant="outlined" />
            </Box>
        );
    }
    return (
        <div className="header">
            <Link className="logo" to="/">Home</Link>
            <BasicTextFields />
        </div>
    )
}

export default Header;