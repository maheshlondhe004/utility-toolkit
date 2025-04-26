// src/lib/theme.ts
'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Base theme definition
let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0F172A', // navy blue
        },
        secondary: {
            main: '#FFBE0B', // A contrasting yellow/gold
        },
        background: {
            default: '#F8F9FA', // Off-white background
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A', // Add your desired primary text color here
            secondary: '#6C757D',
        }
        // Add more customizations
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: { fontWeight: 700, color: '#0F172A' },
        h2: { fontWeight: 700, color: '#0F172A' },
        h3: { fontWeight: 600, color: '#0F172A' },
        h4: { fontWeight: 600, color: '#0F172A' },
        h5: { fontWeight: 500, color: '#0F172A' },
        h6: { fontWeight: 500, color: '#0F172A' },
        // Reduce default body font size slightly if desired
        // body1: { fontSize: '0.95rem' },
    },
    spacing: 8, // Keep MUI default spacing factor (can be adjusted)
    shape: {
        borderRadius: 8, // Slightly more rounded corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Prevent uppercase default
                    borderRadius: 6,
                    padding: '8px 20px ', // Adjust button padding
                },
            },
            defaultProps: {
                // Remove default variant if you want more control per instance
                // variant: 'contained',
                disableElevation: true, // Flatter buttons by default
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                    border: '1px solid #e9ecef', // Subtle border
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)', // Slightly softer hover shadow
                        transform: 'translateY(-4px)',
                    },
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF', // White AppBar
                    color: '#212529', // Dark text on white AppBar
                }
            },
            defaultProps: {
                elevation: 0, // Remove default shadow, add border instead if desired
                // position: 'sticky', // Make AppBar sticky
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '24px ',
                    paddingRight: '24px ',
                    width: '100% ',
                    maxWidth: '100% ',
                },
            },
            defaultProps: {
                // maxWidth: 'lg' // Default max width for containers
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontWeight: 500, // Adjust font weight
                    fontSize: '1rem', // Adjust font size
                    color: '#0F172A', // Navy blue color
                    padding: '8px 16px ', // Adjust padding
                },
            },
        }
        // Add more component overrides
    }
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;