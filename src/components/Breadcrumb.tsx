'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Typography, Breadcrumbs } from '@mui/material';

export default function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname ? pathname.split('/').filter((segment) => segment) : [];

    // Hide breadcrumb if on the Home page
    if (pathname === '/') {
        return null;
    }

    return (
        <Box sx={{ marginLeft: '16px ', marginBottom: '16px ' }}>
            <Breadcrumbs aria-label="breadcrumb">
                {/* Home Link */}
                <Link href="/" passHref>
                    <Typography color="text.primary">Home</Typography>
                </Link>
                {/* Dynamic Path Segments */}
                {pathSegments.map((segment, index) => {
                    const href = '/' + pathSegments.slice(0, index + 1).join('/');
                    const isLast = index === pathSegments.length - 1;

                    return isLast ? (
                        <Typography key={href} color="text.secondary">
                            {segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </Typography>
                    ) : (
                        <Link key={href} href={href} passHref>
                            <Typography color="text.primary">
                                {segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                            </Typography>
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
}
