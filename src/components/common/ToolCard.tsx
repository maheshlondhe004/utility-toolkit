'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { type ToolInfo } from '@/lib/toolsData';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

interface ToolCardProps {
    tool: ToolInfo;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    const IconComponent = tool.icon;

    const router = useRouter();

    const handleButtonClick = () => {
        if (tool.status === 'active') {
            try {
                router.push(tool.href);
            } catch (error) {
                console.error(`Failed to navigate to ${tool.href}:`, error);
            }
        }
    };

    return (
        <Card
            sx={{
                height: { xs: '180px', md: '180px' }, // Increased height
                width: { xs: '100%', sm: '280px', md: '320px' }, // Increased width
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2, // Rounded corners
                boxShadow: 3, // Subtle shadow for depth
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
                '&:hover': {
                    transform: 'scale(1.05)', // Slight zoom on hover
                    boxShadow: 6, // Enhanced shadow on hover
                },
                backgroundColor: 'background.paper',
                padding: "16px !important", // Consistent padding
            }}
        >
            <CardContent
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 3 }, // Responsive padding
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Left-align content
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent
                        sx={{
                            mr: 1.5,
                            fontSize: { xs: '2rem', md: '2.5rem' }, // Larger icon size
                            color: 'primary.main',
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '1.2rem', md: '1.5rem' }, // Larger font size
                        }}
                    >
                        {tool.name}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.9rem', md: '1rem' }, // Slightly larger description font
                        lineHeight: 1.6, // Improved readability
                    }}
                >
                    {tool.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    px: { xs: 2, md: 3 }, // Responsive padding
                    py: 2, // Consistent vertical padding
                    backgroundColor: 'action.hover', // Subtle background for actions
                    borderTop: 1, // Separator line
                    borderColor: 'divider',
                }}
            >
                <Button
                    size="large"
                    variant={tool.status === 'active' ? 'contained' : 'outlined'}
                    disabled={tool.status !== 'active'}
                    onClick={handleButtonClick} // Handle button click
                    sx={{
                        width: '100%',
                        fontWeight: 'bold',
                    }}
                >
                    {tool.status === 'active' ? 'Use Tool' : 'Coming Soon'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ToolCard;