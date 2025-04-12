'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import { tools } from '@/lib/toolsData';

const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Support', href: '/support' },
];

const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
];

export default function Footer() {
    const activeTools = tools.filter(tool => tool.status === 'active');

    return (
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
                    {/* @ts-ignore */}
                    <Grid item xs={12} sm={6} md={3} >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            UtilityHub
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Your all-in-one solution for file conversion and optimization
                        </Typography>
                    </Grid>

                    {/* Tools */}
                    {/* @ts-ignore */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Tools
                        </Typography>
                        {activeTools.map(tool => (
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
                        ))}
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
                    {/* @ts-ignore */}
                    <Grid item xs={12} sm={6} md={3}>
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
                    </Grid>

                    {/* Legal */}
                    {/* @ts-ignore */}
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
                        © {new Date().getFullYear()} UtilityHub. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
