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

// Define base spacing value manually based on theme.ts
// Fallback to 8 if theme.spacing is not defined for some reason
const baseSpacing = typeof theme.spacing === 'function'
  ? 8 // Default MUI spacing if theme.spacing is somehow still a function reference
  : (theme.spacing || 8);


export const metadata: Metadata = {
  title: 'Utility Toolkit - All-in-One Online Tools',
  description: 'Compress images, convert files (CSV, Excel, PDF, DOC, Video to MP3), and more with our free online utility tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
              {/* Fixed Header */}
              <Box
                component="header"
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 1100,
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  marginBottom: `calc(${baseSpacing}px * 5) !important`, // Adjust based on Footer height
                }}
              >
                <Header />
              </Box>

              {/* Scrollable Content */}
              <Box
                component="main"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  padding: `100px 24px !important`, // Use base spacing value
                  gap: '16px !important',
                  // flexGrow: 1,
                  // overflowY: 'auto',
                  // marginTop: '64px', // Adjust based on Header height
                  // marginBottom: '64px', // Adjust based on Footer height
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