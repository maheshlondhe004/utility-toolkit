import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InlineAd from '@/components/ads/InlineAd'; // Placeholder for Ad
import ImageCompressorUI from '@/components/tools/ImageCompressorUI'; // Actual tool UI

// Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
    // Fetch data if needed, or use static data
    const title = 'Online Image Compressor | Compress JPG, PNG, WebP';
    const description = 'Reduce image file size online without losing quality. Fast, free, and easy-to-use image optimizer for JPG, PNG, GIF, and WebP.';
    const keywords = ['image compressor', 'optimize images', 'reduce image size', 'jpg compressor', 'png compressor', 'online tool'];

    // Basic Schema Markup (SoftwareApplication)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication', // More specific than SoftwareApplication if purely web-based
        name: title,
        description: description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any', // Web-based
        offers: {
            '@type': 'Offer',
            price: '0', // Assuming it's free
            priceCurrency: 'USD',
        },
        // Add URL once deployed
        // url: "https://yourdomain.com/image-compressor"
    };


    return {
        title: title,
        description: description,
        keywords: keywords.join(', '),
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            // Add URL and image later
            // url: 'https://yourdomain.com/image-compressor',
            // images: ['https://yourdomain.com/og-image-compressor.png'],
        },
        // Include JSON-LD script in the component (see below) or via alternates/other mechanisms if preferred
    };
}


export default function ImageCompressorPage() {
    // Define JSON-LD data here again for insertion
    const title = 'Online Image Compressor | Compress JPG, PNG, WebP';
    const description = 'Reduce image file size online without losing quality. Fast, free, and easy-to-use image optimizer for JPG, PNG, GIF, and WebP.';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title,
        description: description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        // Add URL once deployed
        // url: "https://yourdomain.com/image-compressor"
    };


    return (
        <Container maxWidth="md">
            {/* Add JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', my: 4 }}>
                Image Compressor
            </Typography>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                {/* Your Image Compressor UI Component Goes Here */}
                <ImageCompressorUI />
                {/* Example Inline Ad Placement */}
                <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                    <InlineAd />
                </Box>
            </Paper>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>How it Works</Typography>
                <Typography paragraph>
                    Detailed explanation of the image compression process...
                </Typography>
            </Box>
        </Container>
    );
}