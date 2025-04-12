import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const SidebarAd: React.FC = () => {
    // In production, replace this with your Google AdSense script/component
    return (
        <Paper elevation={1} sx={{ p: 2, height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.200', position: 'sticky', top: '80px' }}>
            <Typography variant="caption" color="text.secondary">
                Sidebar Ad Space (e.g., 240x600)
            </Typography>
            {/* <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async strategy="lazyOnload" /> */}
            {/* AdSense Unit Code */}
        </Paper>
    );
};

export default SidebarAd;