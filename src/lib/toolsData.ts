import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideocamIcon from '@mui/icons-material/Videocam';
import CodeIcon from '@mui/icons-material/Code'; // Example from image
import EditIcon from '@mui/icons-material/Edit'; // Example from image
import CropIcon from '@mui/icons-material/Crop';

export interface ToolInfo {
    id: string;
    name: string;
    description: string;
    href: string;
    icon: React.ElementType; // Use MUI icons directly
    status?: 'active' | 'coming soon';
}

export const tools: ToolInfo[] = [
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        description: 'Compress and optimize your images without losing quality.',
        href: '/image-compressor',
        icon: ImageIcon,
        status: 'active',
    },
    {
        id: 'image-cropper',
        name: 'Image Cropper',
        description: 'Crop your images online with easy-to-use cropper.',
        href: '/image-cropper',
        icon: CropIcon,
        status: 'active',
    },
    {
        id: 'csv-excel-converter',
        name: 'CSV Excel Converter',
        description: 'Convert between CSV and Excel formats seamlessly.',
        href: '/csv-excel-converter',
        icon: TableChartIcon,
        status: 'coming soon',
    },
    {
        id: 'pdf-doc-converter',
        name: 'PDF Converter', // Matches image
        description: 'Convert between Word and PDF formats easily.', // Matches image
        href: '/pdf-doc-converter',
        icon: PictureAsPdfIcon,
        status: 'coming soon',
    },
    {
        id: 'code-formatter', // From image
        name: 'Code Formatter',
        description: 'Format and beautify your code instantly.',
        href: '/code-formatter',
        icon: CodeIcon,
        status: 'coming soon',
    },
    {
        id: 'video-mp3-converter',
        name: 'Video Converter', // Matches image
        description: 'Convert videos to different formats.', // Matches image (modified slightly for specific case) -> Changed to Video->MP3
        href: '/video-mp3-converter',
        icon: VideocamIcon,
        status: 'coming soon', // Assuming this one is planned
    },
    {
        id: 'image-editor', // From image
        name: 'Image Editor',
        description: 'Edit and enhance your images online.',
        href: '/image-editor',
        icon: EditIcon,
        status: 'coming soon',
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize your images by pixel or percentage.',
        href: '/image-resizer',
        icon: ImageIcon,
        status: 'active',
    },
    // Add more tools here...
];