import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import BarChartIcon from '@mui/icons-material/BarChart';
import {ThemeProvider, createTheme, Tooltip} from "@mui/material";
import Routes from "@/constants/routes";
import Link from "next/link";
import LoginIcon from '@mui/icons-material/Login';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const menuItems = [
    {
        title: "Encuestas",
        to: Routes.OBS_SURVEY,
    }
];
const ResponsiveAppBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*Desktop - Icon*/}
                        <BarChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                        {/*Desktop - Cepra*/}
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href={Routes.HOME}>
                                CEPRA
                            </Link>
                        </Typography>

                        {/*Mobile - Menu items*/}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {menuItems.map((menuItem) => (
                                    <Link key={menuItem.title} href={menuItem.to}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <span>{menuItem.title}</span>
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>

                        {/*Mobile - Icon*/}
                        <BarChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                        {/*Modile - Cepra*/}
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href={Routes.HOME}>
                                CEPRA
                            </Link>
                        </Typography>

                        {/*Desktop - Menu items*/}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {menuItems.map((menuItem, index) => (
                                <Link key={index} href={menuItem.to}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {menuItem.title}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        {/*Mobile - Login*/}
                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                            <Link href={Routes.MANAGEMENT} sx={{textDecoration: 'none'}}>
                                <Button variant="contained" color="success">
                                    <LoginIcon />
                                </Button>
                            </Link>
                        </Box>

                        {/*Desktop - Login*/}
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            <Link href={Routes.MANAGEMENT} sx={{textDecoration: 'none'}}>
                                <Button variant="contained" color="success">
                                    Iniciar Sesión
                                </Button>
                            </Link>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default ResponsiveAppBar;
