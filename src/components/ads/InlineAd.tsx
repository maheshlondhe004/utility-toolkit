'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Script from 'next/script';

const InlineAd: React.FC = () => {
    useEffect(() => {
        // Ensure adsbygoogle is loaded
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).adsbygoogle.push({});
        }
    }, []);

    return (
        <Box
            sx={{
                p: 2,
                minHeight: '90px',
                width: '100%',
                maxWidth: '728px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.200',
                border: '1px dashed grey',
            }}
        >
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: '90px' }}
                data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT} // Replace with your AdSense publisher ID
                data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT_ID} // Replace with your AdSense ad slot ID
                data-ad-format="auto"
            ></ins>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></Script>
        </Box>
    );
};

export default InlineAd;