import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const InlineAd: React.FC = () => {
    // In production, replace this with your Google AdSense script/component
    return (
        <Box sx={{ p: 2, minHeight: '90px', width: '100%', maxWidth: '728px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.200', border: '1px dashed grey' }}>
            <Typography variant="caption" color="text.secondary">
                Inline Ad Space (e.g., 728x90)
            </Typography>
            {/* <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async strategy="lazyOnload" /> */}
            {/* AdSense Unit Code */}
        </Box>
    );
};

export default InlineAd;