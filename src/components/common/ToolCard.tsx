// src/components/common/ToolCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { type ToolInfo } from '@/lib/toolsData';

interface ToolCardProps {
    tool: ToolInfo;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    const IconComponent = tool.icon;

    return (
        // Ensure card takes full height available in the grid row
        <Card sx={{
            height: '100%', display: 'flex', flexDirection: 'column', border: 'none', // Remove border if theme adds one, let hover handle it
            backgroundColor: 'background.paper'
        }}>
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}> {/* Responsive Padding */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconComponent sx={{
                        mr: 1.5,
                        fontSize: { xs: '1.8rem', md: '2.2rem' }, // Responsive Icon Size
                        color: 'primary.main'
                    }} />
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium', fontSize: { xs: '1.1rem', md: '1.25rem' } }}> {/* Responsive Font Size */}
                        {tool.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {tool.description}
                </Typography>
            </CardContent>
            <CardActions sx={{
                justifyContent: 'flex-end',
                px: { xs: 2, md: 3 }, // Responsive Padding
                py: 2, // Consistent vertical padding
                backgroundColor: 'action.hover', // Subtle background for actions
                borderTop: 1, // Separator line
                borderColor: 'divider'
            }}>
                {tool.status === 'coming soon' ? (
                    <Button size="small" disabled variant='outlined'> {/* Outlined for disabled */}
                        Coming Soon
                    </Button>
                ) : (
                    <Button component={Link} href={tool.href} size="small" variant='contained'> {/* Contained for primary action */}
                        Use Tool
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ToolCard;