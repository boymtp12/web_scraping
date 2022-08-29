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
    
    return (
        <div className="header">
            <Link className="logo" to="/">Home</Link>
            <Link to="/back-list">Back List</Link>
        </div>
    )
}

export default Header;