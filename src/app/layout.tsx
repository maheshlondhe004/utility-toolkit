// src/app/layout.tsx
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme'; // Keep importing theme for ThemeProvider and base value access
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SidebarAd from '@/components/layout/SidebarAd';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './globals.css';
import Script from 'next/script';


// Define base spacing value manually based on theme.ts
// Fallback to 8 if theme.spacing is not defined for some reason
// const baseSpacing = typeof theme.spacing === 'function'
//   ? 8 // Default MUI spacing if theme.spacing is somehow still a function reference
//   : (theme.spacing || 8);


export const metadata: Metadata = {
  title: 'ToolsVerse - Your All-in-One Online Toolkit',
  description: 'Compress images, convert files (CSV, Excel, PDF, DOC, Video to MP3), and more with our free online utility tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>ToolsVerse - Your All-in-One Online Toolkit</title>
        <meta name="keywords" content="ToolsVerse, online tools, productivity tools, file compressor, image optimizer, file converter, work simplification, all-in-one toolkit" />
        <meta name="author" content="ToolsVerse Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="ToolsVerse - Your All-in-One Online Toolkit" />
        <meta property="og:description" content="Simplify your work with ToolsVerse's suite of tools, including file compression, optimization, and productivity tools." />
        <meta property="og:url" content="https://www.toolsverse.in" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.toolsverse.in/assets/home-og.jpg" />
        <link rel="canonical" href="https://www.toolsverse.in" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ backgroundColor: '#F8F9FA', margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              {/* Fixed Header */}
              <Box
                component="header"
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 1100,
                  backgroundColor: 'background.default',
                  boxShadow: 1,
                }}
              >
                <Header />
              </Box>

              {/* Scrollable Content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto !important', // Enable scrolling
                  marginTop: '64px !important', // Adjust based on Header height
                  marginBottom: '64px !important', // Adjust based on Footer height
                  display: 'flex !important',
                  justifyContent: 'center !important',
                  padding: `24px !important`,
                  gap: '16px !important',
                }}
              >
                <Container sx={{ display: 'flex', flexGrow: 1, py: { xs: 3, sm: 4, md: 5 } }}>
                  <Box component="main" sx={{ flexGrow: 1, pr: { lg: 0 } }}>
                    {children}
                  </Box>

                  {/* Sidebar Ad Area */}
                  <Box
                    sx={{
                      width: { lg: 280 },
                      flexShrink: 0,
                      display: { xs: 'none', lg: 'block' },
                      position: 'sticky',
                      top: '64px', // Adjust based on Header height
                      height: 'calc(100vh - 128px)', // Adjust based on Header + Footer height
                    }}
                  >
                    <SidebarAd />
                  </Box>
                </Container>
              </Box>

              {/* Fixed Footer */}
              <Box
                component="footer"
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 1100,
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
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