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
                display: 'flex !important',
                flexDirection: 'column !important',
                height: '100vh !important',
                backgroundColor: '#F8F9FA !important',
              }}
            >
              {/* Fixed Header */}
              <Box
                component="header"
                sx={{
                  position: 'fixed !important',
                  top: '0 !important',
                  left: '0 !important',
                  right: '0 !important',
                  height: '64px !important',
                  zIndex: '1100 !important',
                  backgroundColor: 'background.default !important',
                  boxShadow: '1 !important',
                }}
              >
                <Header />
              </Box>

              {/* Scrollable Main Content */}
              <Box
                component="main"
                sx={{
                  flex: '1 !important',
                  marginTop: '64px !important',
                  marginBottom: {xs: '200px !important', sm: '200px !important', md: '160px !important'},
                  overflowY: 'auto !important',
                  paddingLeft: { xs: '8px !important', sm: '8px !important', md: '24px !important' },
                  paddingRight: { xs: '8px !important', sm: '8px !important', md: '24px !important' },
                }}
              >
                <Container maxWidth="lg" sx={{ paddingTop: '24px !important', paddingBottom: '24px !important' }}>
                  {children}
                </Container>
              </Box>

              {/* Fixed Footer */}
              <Box
                component="footer"
                sx={{
                  position: 'fixed !important',
                  bottom: '0 !important',
                  left: '0 !important',
                  right: '0 !important',
                  height: {xs: '200px !important', sm: '200px !important', md: '160px !important'},
                  backgroundColor: 'background.paper !important',
                  boxShadow: '1 !important',
                  zIndex: '1100 !important',
                }}
              >
                <Footer />
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
