// src/app/page.tsx
'use client';
import * as React from 'react';
import Container from '@mui/material/Container'; // Already likely imported via layout
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToolCard from '@/components/common/ToolCard';
import { tools } from '@/lib/toolsData';
import Grid, { GridProps } from '@mui/material/Grid';

const MyGridItem = (props: GridProps) => <Grid {...props} />;
export default function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px', marginBottom: '16px !important', textAlign: 'center', py: { xs: 6, md: 10 } }}> {/* Responsive Padding */}
        <Typography
          variant="h2" // Base variant
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            // Responsive font size adjustments (example)
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
          }}
        >
          All-in-One Utility Tools
        </Typography>
        <Typography
          variant="h6" // Base variant
          component="p" // Use p tag for semantic correctness
          color="text.secondary"
          sx={{
            mb: 4,
            // maxWidth: '700px',
            mx: 'auto',
            // Responsive font size adjustments (example)
            fontSize: { xs: '1rem', md: '1.125rem' }
          }}
        >
          Transform, convert, and optimize your files with our powerful suite of free online tools.
        </Typography>
        {/* Stack buttons on smaller screens */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" size="large" color="primary">
            Get Started
          </Button>
          <Button variant="outlined" size="large" color="primary">
            View Tools
          </Button>
        </Box>
      </Box>

      {/* Tools Grid Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px', marginBottom: '16px', py: { xs: 6, md: 8 } }}> {/* Responsive Padding */}
        <Typography
          variant="h4" // Base variant
          component="h2"
          gutterBottom
          sx={{
            mt: '16px', // Responsive Margin
            mb: { xs: 4, md: 6 }, // Responsive Margin
            fontWeight: 'medium',
            textAlign: 'center' // Center the section title
          }}
        >
          Popular Tools
        </Typography>
        {/* Increased spacing on larger screens */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{display: 'flex', justifyContent: 'center'}}>
          {tools.map((tool) => (
            // @ts-ignore
            <Grid key={tool.id} item xs={12} sm={6} md={4}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}