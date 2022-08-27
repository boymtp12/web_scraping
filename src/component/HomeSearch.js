import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const HomeSearch = () => {

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
                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
                
            </Box>
        );
    }
    let searchTerms = "google";
    return (
        <>
            <BasicTextFields/>
            <div sx={{marginTop: '150px'}}>
                <div>
                <Link to="/">https://www.google.com.vn</Link>
                <h3 className="">Google</h3>
                </div>
            </div>
        </>
    )
}

export default HomeSearch;