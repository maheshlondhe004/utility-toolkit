'use client';
import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Slider, Card, CardContent } from '@mui/material';
import { CloudUpload, Image as ImageIcon, Download } from '@mui/icons-material';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import imageCompression from 'browser-image-compression';

const textColor = '#0F172A';

const ImageCompressor = () => {
    const [quality, setQuality] = useState(80);
    const [images, setImages] = useState<File[]>([]);
    const [compressedImages, setCompressedImages] = useState<{ url: string; name: string; size: number; originalSize: number; type: string }[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [dropMessage, setDropMessage] = useState('Drag and drop your images here or');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const validFiles = Array.from(files).filter(file => file.size <= 10 * 1024 * 1024 && file.type.startsWith('image/'));
            if (validFiles.length === 0) {
                alert('Please select valid images under 10MB.');
                return;
            }
            setImages(validFiles);
            setDropMessage(`${validFiles.length} image(s) selected.`);
            setIsDropped(true);
            setIsInvalid(false);
        }
    };

    const handleCompress = async () => {
        const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            initialQuality: quality / 100
        };

        const compressed = await Promise.all(images.map(async (file) => {
            const compressedFile = await imageCompression(file, options);
            const url = URL.createObjectURL(compressedFile);
            return {
                url,
                name: file.name,
                size: compressedFile.size,
                originalSize: file.size,
                type: file.type
            };
        }));

        setCompressedImages(compressed);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const getCompressionRatio = (original: number, compressed: number) =>
        ((1 - compressed / original) * 100).toFixed(2) + '%';

    const getSpaceSaved = (original: number, compressed: number) =>
        ((original - compressed) / 1024).toFixed(2) + ' KB';

    return (
        <>
            <Head>
                <title>Image Compressor - Compress Images Online | ToolsVerse</title>
                <meta name="description" content="Compress your images online with ToolsVerse's Image Compressor. Reduce file size without compromising quality and improve performance." />
                {/* ... other meta tags */}
            </Head>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
                crossOrigin="anonymous"
            />

            <Box>
                {/* Title and Upload */}
                <Box display="flex" alignItems="center" sx={{ mb: '16px !important', px: '16px !important' }}>
                    <ImageIcon sx={{ mr: '8px !important', color: textColor }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: textColor, my: '16px !important' }}>Image Compressor</Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" sx={{ px: '16px !important', columnGap: '16px !important' }}>
                    {/* Left Panel */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, mb: { xs: '24px !important', md: 0 } }}>
                        <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                            <CardContent>
                                <Box
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                        setIsDropped(false);
                                        setIsInvalid(false);
                                        setDropMessage('Drag and drop your images here or');
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024);
                                        if (files.length > 0) {
                                            setImages(files);
                                            setDropMessage(`${files.length} image(s) selected.`);
                                            setIsDropped(true);
                                            setIsInvalid(false);
                                        } else {
                                            setIsInvalid(true);
                                            setIsDropped(false);
                                            setImages([]);
                                            setDropMessage('Invalid file format or size. Please upload valid images under 10MB.');
                                        }
                                    }}
                                    sx={{
                                        border: '2px dashed #ccc',
                                        borderRadius: 2,
                                        minHeight: 200,
                                        py: '16px !important',
                                        px: '24px !important',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        bgcolor: isInvalid ? '#fee2e2' : isDropped ? '#d1fae5' : isDragging ? '#e0f2fe' : 'transparent',
                                        borderColor: isInvalid ? '#ef4444' : isDragging ? '#3b82f6' : '#ccc',
                                        transition: 'all 0.3s ease-in-out',
                                    }}
                                >
                                    <CloudUpload fontSize="large" sx={{ color: isInvalid ? '#ef4444' : isDropped ? '#10b981' : '#aaa', fontSize: '2.5rem' }} />
                                    <Typography mt={1} sx={{ color: isInvalid ? '#ef4444' : textColor, my: '16px !important' }}>{dropMessage}</Typography>
                                    <Button variant="contained" onClick={triggerFileInput} sx={{ my: '16px !important' }}>Choose Files</Button>
                                    <input type="file" accept="image/*" ref={fileInputRef} multiple style={{ display: 'none' }} onChange={handleFileChange} />
                                    <Typography variant="caption" sx={{ color: textColor }}>Maximum file size per image: 10MB</Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                            <CardContent>
                                <Typography fontWeight="bold" sx={{ color: textColor, my: '16px !important' }}>Compression Settings</Typography>
                                <Box sx={{ mb: '24px !important' }}>
                                    <Typography variant="subtitle2" gutterBottom sx={{ color: textColor, my: '16px !important' }}>Compression Quality</Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" sx={{ color: textColor }}>Low Quality</Typography>
                                        <Typography variant="caption" sx={{ color: textColor }}>{quality}%</Typography>
                                        <Typography variant="caption" sx={{ color: textColor }}>High Quality</Typography>
                                    </Box>
                                    <Slider value={quality} min={1} max={100} onChange={(e, val) => setQuality(val)} />
                                </Box>
                                <Box sx={{ mt: '16px !important' }}>
                                    <Button variant="contained" fullWidth onClick={handleCompress}>Compress</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Right Panel - Preview and Download */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, pr: { md: '16px !important' } }}>
                        <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                            <CardContent>
                                <Typography fontWeight="bold" sx={{ color: textColor, mb: '16px !important' }}>Compressed Images</Typography>
                                {compressedImages.length === 0 ? (
                                    <Typography sx={{ color: textColor }}>No images compressed yet.</Typography>
                                ) : (
                                    compressedImages.map((img, index) => (
                                        <Box key={index} sx={{ mb: '24px' }}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 200,
                                                    border: '1px solid #ccc',
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    bgcolor: '#f9f9f9',
                                                    mb: '8px'
                                                }}
                                            >
                                                <Image src={img.url} alt={`compressed-${index}`} width={200} height={200} style={{ objectFit: 'contain' }} />
                                            </Box>
                                            <Box sx={{ mt: "16px !important", mb: "16px !important" }} display="flex" justifyContent="space-between" alignItems="flex-start" flexDirection={{ xs: 'row', md: 'column' }}>
                                                <Typography variant="body2" sx={{ color: textColor }}>File name: {img.name}</Typography>
                                                <Typography variant="body2" sx={{ color: textColor }}>Compression ratio: {getCompressionRatio(img.originalSize, img.size)}</Typography>
                                                <Typography variant="body2" sx={{ color: textColor }}>Space saved: {getSpaceSaved(img.originalSize, img.size)}</Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                startIcon={<Download />}
                                                href={img.url}
                                                download={`compressed-${img.name}`}
                                                sx={{ mt: "16px !important", mb: "16px !important" }}
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ImageCompressor;
