'use client';

import React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

const PrivacyPolicyPage = () => {
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>Privacy Policy | ToolsVerse</title>
                <meta name="description" content="Read the privacy policy of ToolsVerse and understand how we handle your data, services usage, and user responsibilities." />
                <meta name="keywords" content="Privacy Policy, ToolsVerse, data handling, user responsibility, cookies, metadata, ad personalization" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="ToolsVerse Team" />
                <meta property="og:title" content="Privacy Policy | ToolsVerse" />
                <meta property="og:description" content="Understand how ToolsVerse manages your data and maintains your privacy." />
                <meta property="og:url" content="https://www.toolsverse.in/privacy-policy" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.toolsverse.in/privacy-policy" />
            </Head>

            {/* Hero Section */}
            <Box
                component="section"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    py: { xs: 6, md: 16 },
                    padding: '24px !important',
                    color: '#fff',
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center !important',
                    paddingBottom: "16px !important",
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#fff' }}>
                    Privacy Policy
                </Typography>
                <Typography variant="h6" maxWidth="700px" mx="auto" sx={{ color: '#fff' }}>
                    Learn how ToolsVerse protects your privacy, respects your data, and outlines your responsibilities while using our services.
                </Typography>
            </Box>

            {/* Policy Content */}
            <Box
                sx={{
                    width: '100%',
                    px: 0,
                    backgroundColor: '#fff',
                }}
            >
                <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
                    {[
                        {
                            title: '1. Use at Your Own Risk',
                            desc: 'You are solely responsible for your usage of the services provided by toolsverse.in. Any consequences that arise from such usage are your responsibility.'
                        },
                        {
                            title: '2. Responsibility for Uploaded Data',
                            desc: 'Any data you upload to our services is your responsibility. Ensure that it complies with legal standards and does not contain sensitive or unlawful material.'
                        },
                        {
                            title: '3. No Illegal Content',
                            desc: 'You agree not to upload or process any illegal or copyrighted content through our platform.'
                        },
                        {
                            title: '4. No Integration into Other Apps',
                            desc: 'Our tools are for direct use only. You may not integrate toolsverse.in into third-party applications or services.'
                        },
                        {
                            title: '5. Personal and Commercial Use',
                            desc: 'You are welcome to use our tools for both personal and commercial purposes without restriction.'
                        },
                        {
                            title: '6. Service Changes',
                            desc: 'We may modify or discontinue our tools and services at any time without prior notice.'
                        },
                        {
                            title: '7. Terms Updates',
                            desc: 'This privacy policy may be updated periodically. Continued use of our services indicates your agreement to the latest terms.'
                        },
                        {
                            title: '8. No Guarantees',
                            desc: 'While we aim for reliability, toolsverse.in does not guarantee uninterrupted access, accuracy, or availability of its services.'
                        },
                        {
                            title: '9. Data Storage Policy',
                            desc: 'Uploaded files are not stored permanently on our servers. In cases of caching, data is deleted once the cache is cleared.'
                        },
                        {
                            title: '10. No Data Sharing',
                            desc: 'We do not access, share, or use the content of your uploaded or generated files for any purpose.'
                        },
                        {
                            title: '11. Metadata Usage',
                            desc: 'To improve our services, we may collect and analyze metadata like file size, type, or request time — never the file content.'
                        },
                        {
                            title: '12. Use of Cookies and Ads',
                            desc: 'We and our advertising partners, including Google, may use cookies for personalization and analytics. You can manage ad preferences in your Google Account. By using this site, you agree to our cookie usage.'
                        },
                    ].map((section, index) => (
                        <Box key={index}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, marginTop: "16px !important" }}>
                                {section.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: "16px !important" }}>
                                {section.desc}
                            </Typography>
                            {index !== 11 && <Divider sx={{ mb: "16px !important" }} />}
                        </Box>
                    ))}
                </Container>
            </Box>
        </>
    );
};

export default PrivacyPolicyPage;
