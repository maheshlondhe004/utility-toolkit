import React from 'react';
import Paper from '@mui/material/Paper';
import InlineAd from '@/components/ads/InlineAd';
const SidebarAd: React.FC = () => {
    // In production, replace this with your Google AdSense script/component
    return (
        <Paper elevation={1} sx={{ p: 2, height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.200', position: 'sticky', top: '80px' }}>
            <InlineAd />
        </Paper>
    );
};

export default SidebarAd;