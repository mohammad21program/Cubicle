import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../assets/images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import NotificationSection from "./NotificationSection";
import {Logout} from "../../store/auth/actions";
import {useState} from "react";
import {useNavigate} from "react-router";
import LoadingProgressBar from "../../utils/LoadingProgressBar";


function Layout() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const {Auth: {currentUser}} = useSelector(state => state);
    const dispatch = useDispatch();
    const [IsLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <LoadingProgressBar IsLoading={IsLoading}/>
                <Avatar onClick={() => {
                    navigate("/")
                }} src={Logo} sx={{display: {xs: 'none', md: 'flex'}, mr: 1, cursor: "pointer"}}/>
                <Avatar onClick={() => {
                    navigate("/")
                }} src={Logo} sx={{display: {xs: 'flex', md: 'none'}, mr: 1, cursor: "pointer"}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                />
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>

                <Box sx={{flexGrow: 0}}>
                    <NotificationSection/>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="Remy Sharp" src={`/auth/get/profile_picture/${currentUser?.Photo}`}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleCloseUserMenu();
                            navigate("/password/reset")
                        }}>
                            <Typography textAlign="center">Password Reset</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleCloseUserMenu();
                            dispatch(Logout(setIsLoading, navigate))
                        }}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    );
}

export default Layout;
