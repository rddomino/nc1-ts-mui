import React, { FC } from 'react';
import { AppBar, Typography, CssBaseline } from '@mui/material';

interface IHeaderProps {
    title: string;
}

const appStyles = {
    justifyContent: "center",
    height: "100px",
    backgroundColor: "#FFCC26",
    color: "#414141",
    boxShadow: "none",
    borderBottom: "1px solid #000000",
}

const typoStyles = {
    marginRight: "91px",
    fontSize: "32px",
    fontFamily: "'Anek Telugu', sans-serif",
    fontWeight: "600",
    textAlign: "end",
}

const Header: FC<IHeaderProps> = ({ title }) => {
    return (
        <>
            <CssBaseline />
            <AppBar position="static" sx={appStyles}>
                <Typography variant="h6" component="div" sx={typoStyles}>
                    {title}
                </Typography>
            </AppBar>
        </>
    )
}

export default Header;
