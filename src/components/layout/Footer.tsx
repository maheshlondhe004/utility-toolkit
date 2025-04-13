'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import { tools } from '@/lib/toolsData';
import Head from 'next/head';

// const companyLinks = [
//     { label: 'About', href: '/about' },
//     { label: 'Pricing', href: '/pricing' },
//     { label: 'Support', href: '/support' },
// ];

const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    // { label: 'Terms of Service', href: '/terms-of-service' },
    // { label: 'Cookie Policy', href: '/cookie-policy' },
];

export default function Footer() {
    const activeTools = tools.filter(tool => tool.status === 'active' && tool.href && typeof tool.href === 'string' && tool.href.trim() !== '');
    return (
        <>
            <Head>
                <title>Explore More Tools | ToolsVerse</title>
                <meta name="description" content="Discover more tools and features in ToolsVerse's footer section. Simplify your work with our suite of tools." />
                <meta name="keywords" content="ToolsVerse footer, explore tools, productivity tools, online tools, all-in-one toolkit" />
                <meta property="og:title" content="Explore More Tools | ToolsVerse" />
                <meta property="og:description" content="Explore ToolsVerse's footer section to find more tools and features to simplify your work." />
                <meta property="og:url" content="https://www.toolsverse.in/footer" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://www.toolsverse.in/assets/footer-og.jpg" />
                <link rel="canonical" href="https://www.toolsverse.in/footer" />
            </Head>
            <Box
                component="footer"
                sx={{
                    backgroundColor: '#0F172A', // Dark navy
                    color: 'white',
                    mt: 8,
                    pt: 6,
                    pb: 4,
                }}
            >
                <Container maxWidth="lg" sx={{ padding: '24px !important', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>
                    <Grid container spacing={4} sx={{
                        textAlign: 'center', // Center text horizontally
                        display: 'flex', // Use flexbox for alignment
                        flexDirection: 'row', // Stack content vertically
                        justifyContent: 'center', // Center content vertically
                    }}>
                        {/* Left: Branding */}
                        {/* @ts-expect-error ToolCard expects a specific type for "tool" */}
                        <Grid item xs={12} sm={6} md={3} >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                ToolsVerse
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Your all-in-one solution for file conversion and optimization
                            </Typography>
                        </Grid>

                        {/* Tools */}
                        {/* @ts-expect-error ToolCard expects a specific type for "tool" */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Tools
                            </Typography>
                            {activeTools.map(tool => {
                                if (!tool.href || typeof tool.href !== 'string' || tool.href.trim() === '') {
                                    console.warn(`Invalid href for tool with id: ${tool.id}`);
                                    return null; // Skip rendering if href is invalid
                                }
                                return (
                                    <Link
                                        component={NextLink}
                                        key={tool.id}
                                        href={tool.href}
                                        underline="none"
                                        sx={{
                                            display: 'block',
                                            mb: 0.5,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { color: '#fff' },
                                        }}
                                    >
                                        {tool.name}
                                    </Link>
                                );
                            })}
                            <Link
                                component={NextLink}
                                href="/all-tools"
                                underline="none"
                                sx={{
                                    display: 'block',
                                    mt: 1,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    '&:hover': { color: '#fff' },
                                }}
                            >
                                More Tools
                            </Link>
                        </Grid>

                        {/* Company */}
                        {/* <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Company
                            </Typography>
                            {companyLinks.map(link => (
                                <Link
                                    component={NextLink}
                                    key={link.label}
                                    href={link.href}
                                    underline="none"
                                    sx={{
                                        display: 'block',
                                        mb: 0.5,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': { color: '#fff' },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Grid> */}

                        {/* Legal */}
                        {/* @ts-expect-error ToolCard expects a specific type for "tool" */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Legal
                            </Typography>
                            {legalLinks.map(link => (
                                <Link
                                    component={NextLink}
                                    key={link.label}
                                    href={link.href}
                                    underline="none"
                                    sx={{
                                        display: 'block',
                                        mb: 0.5,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': { color: '#fff' },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Footer bottom */}
                    <Box mt={6} textAlign="center">
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            © {new Date().getFullYear()} ToolsVerse. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
