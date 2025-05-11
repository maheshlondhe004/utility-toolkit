// src/app/layout.tsx
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './globals.css';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'ToolsVerse - Your All-in-One Online Toolkit',
  description: 'Compress images, convert files, and more with our free online utility tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex ',
                flexDirection: 'column ',
                height: '100vh ',
                backgroundColor: '#F8F9FA ',
              }}
            >
              {/* Fixed Header */}
              <Box
                component="header"
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '64px',
                  zIndex: 1100,
                  backgroundColor: 'background.default',
                  boxShadow: 1,
                }}
              >
                <Header />
              </Box>

              {/* Scrollable Main Content */}
              <Box
                component="main"
                sx={{
                  flex: 1,
                  marginTop: '64px',
                  marginBottom: { xs: 0, sm: 0, md: 0 },
                  overflowY: { xs: 'unset', sm: 'unset', md: 'auto' },
                  paddingLeft: { xs: '8px', sm: '8px', md: '24px' },
                  paddingRight: { xs: '8px', sm: '8px', md: '24px' },
                }}
              >
                <Container maxWidth="lg" sx={{ paddingTop: '24px', paddingBottom: '24px' }}>
                  <Breadcrumb />
                  {children}
                </Container>
              </Box>

              {/* Fixed Footer */}
              <Box
                component="footer"
                sx={{
                  // position: { xs: 'relative', sm: 'relative', md: 'fixed' },
                  bottom: { xs: 'unset', sm: 'unset', md: 0 },
                  left: 0,
                  right: 0,
                  height: { xs: 'auto', sm: 'auto', md: 'auto' },
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  zIndex: 1100,
                }}
              >
                <Footer />
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
