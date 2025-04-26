'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

interface ToolInfo {
    id: string;
    name: string;
    description: string;
    href: string;
    icon: React.ElementType;
    status?: string; // 'active' or 'coming soon'
}

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
                height: '100%',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                backgroundColor: 'background.paper',
                padding: '16px ',
            }}
        >
            <CardContent
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent
                        sx={{
                            mr: 1.5,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            color: 'primary.main',
                        }}
                    />
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                        }}
                    >
                        {tool.name}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        lineHeight: 1.6,
                        marginBottom: "8px ",
                    }}
                >
                    {tool.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    // px: { xs: 2, md: 3 },
                    py: 2,
                    // backgroundColor: 'action.hover',
                    borderTop: 1,
                    borderColor: 'divider',
                }}
            >
                <Button
                    size="large"
                    variant={tool.status === 'active' ? 'contained' : 'outlined'}
                    disabled={tool.status !== 'active'}
                    onClick={handleButtonClick}
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