'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Container from '@mui/material/Container';
import AppsIcon from '@mui/icons-material/Apps';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Head from 'next/head';
import { tools } from '@/lib/toolsData';

export default function Header() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [elevated, setElevated] = React.useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const activeTools = tools.filter(tool => tool.status === 'active' && tool.href && typeof tool.href === 'string' && tool.href.trim() !== '');

    // const scrollLinks = [
    //     { label: 'Tools', href: '/#tools' },
    //     { label: 'Pricing', href: '/#pricing' },
    //     { label: 'Support', href: '/#support' },
    // ];

    // Elevation on scroll
    React.useEffect(() => {
        const handleScroll = () => setElevated(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 2 }}
            >
                ToolsVerse
            </Typography>
            <Divider />
            <List>
                {activeTools.map((item) => (
                    <ListItem key={item.href} disablePadding>
                        <ListItemButton component={Link} href={item.href}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* <ListItem disablePadding>
                    <ListItemButton component={Link} href="/login">
                        <ListItemText primary="Sign In" />
                    </ListItemButton>
                </ListItem> */}
            </List>
        </Box>
    );

    return (
        <>
            <Head>
                <title>ToolsVerse - Your All-in-One Online Toolkit</title>
                <meta name="description" content="ToolsVerse is your ultimate online toolkit offering file compression, optimization, and productivity tools to simplify your work." />
                <meta name="keywords" content="ToolsVerse, online tools, productivity tools, file compressor, image optimizer, work simplification, all-in-one toolkit" />
                <meta name="author" content="ToolsVerse Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="ToolsVerse - Your All-in-One Online Toolkit" />
                <meta property="og:description" content="Explore ToolsVerse's suite of tools to make your work easier and more efficient." />
                <meta property="og:url" content="https://www.toolsverse.in" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.toolsverse.in/assets/og-image.jpg" />
                <link rel="canonical" href="https://www.toolsverse.in" />
            </Head>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    component="nav"
                    position="sticky"
                    color="default"
                    elevation={elevated ? 4 : 0}
                    sx={{
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #eee',
                        transition: 'all 0.3s ease',
                        zIndex: 1100,
                    }}
                >
                    <Container maxWidth="lg">
                        <Toolbar sx={{ justifyContent: 'space-between', px: 0, py: 1.5 }}>
                            {/* Logo */}
                            <Box display="flex" alignItems="center" gap={1}>
                                <AppsIcon color="primary" />
                                <Typography
                                    variant="h6"
                                    component={Link}
                                    href="/"
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 700,
                                        fontSize: '1.3rem',
                                        '&:hover': { opacity: 0.8 },
                                    }}
                                >
                                    ToolsVerse
                                </Typography>
                            </Box>

                            {/* Desktop Nav */}
                            {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            {scrollLinks.map((item) => (
                                <Button
                                    key={item.href}
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        color: 'text.primary',
                                        mx: 1,
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                            <Button
                                variant="contained" size="large" color="primary"
                                sx={{
                                    ml: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                }}
                            >
                                Sign In
                            </Button>
                        </Box> */}

                            {/* Mobile Menu Icon */}
                            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Mobile Drawer */}
                <nav>
                    <Drawer
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </>
    );
}
