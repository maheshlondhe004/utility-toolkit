'use client';
import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Slider, Card, CardContent } from '@mui/material';
import { CloudUpload, Image, Download } from '@mui/icons-material';

const textColor = '#0F172A';

const ImageCompressor = () => {
    const [quality, setQuality] = useState(80);
    const [image, setImage] = useState<string | null>(null);
    const [compressedImage, setCompressedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState('');
    const [imageType, setImageType] = useState('');
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            if (file && file.size <= 10 * 1024 * 1024) {
                setImageName(file.name);
                setImageType(file.type);
                setOriginalSize(file.size);
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && e.target.result) {
                        setImage(e.target.result as string);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image smaller than 10MB.');
            }
        }
    };

    const handleCompress = async () => {
        if (!image) return;

        const img = new window.Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
            } else {
                alert('Failed to get canvas context. Please try again.');
            }

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        setCompressedImage(url);
                        setCompressedSize(blob.size);
                    } else {
                        alert('Failed to compress image. Please try with another image.');
                    }
                },
                'image/jpeg',
                quality / 100
            );
        };
        img.onerror = () => {
            alert('Failed to load the image. Please try a different file.');
        };
        img.src = image;
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const getCompressionRatio = () => {
        if (!originalSize || !compressedSize) return '-';
        return ((1 - compressedSize / originalSize) * 100).toFixed(2) + '%';
    };

    const getSpaceSaved = () => {
        if (!originalSize || !compressedSize) return '-';
        const diff = originalSize - compressedSize;
        return (diff / 1024).toFixed(2) + ' KB';
    };

    return (
        <Box>
            {/* Google Ads Banner */}
            <Box width="97%" height={60} bgcolor="#f0f0f0" display="flex" justifyContent="center" alignItems="center" sx={{ mt: '16px !important', mb: '16px !important' }}>
                <Typography sx={{ color: textColor }}>Advertisement</Typography>
            </Box>

            {/* Title Section */}
            <Box display="flex" alignItems="center" sx={{ mb: '16px !important', px: '16px !important' }}>
                <Image sx={{ mr: '8px !important', color: textColor }} />
                <Typography variant="h5" fontWeight="bold" sx={{ color: textColor, my: '16px !important' }}>Image Compressor</Typography>
            </Box>

            <Box display="flex" flexWrap="wrap" sx={{ px: '16px !important', columnGap: '16px !important' }}>
                {/* Left Side */}
                <Box sx={{ width: { xs: '100%', md: '49%' }, mb: { xs: '24px !important', md: 0 } }}>
                    {/* Upload Image Section */}
                    <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    border: '2px dashed #ccc',
                                    borderRadius: 2,
                                    height: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <CloudUpload fontSize="large" sx={{ color: '#aaa' }} />
                                <Typography mt={1} sx={{ color: textColor, my: '16px !important' }}>Drag and drop your image here or</Typography>
                                <Button variant="contained" onClick={triggerFileInput} sx={{ my: '16px !important' }}>
                                    Choose File
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <Typography variant="caption" sx={{ color: textColor }}>Maximum file size: 10MB</Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Compression Settings Section */}
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

                    {/* Google Ads Section */}
                    <Card sx={{ height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ color: textColor }}>Advertisement</Typography>
                    </Card>
                </Box>

                {/* Right Side */}
                <Box sx={{ width: { xs: '100%', md: '49%' }, pr: { md: '16px !important' } }}>
                    {/* Preview Section */}
                    <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 250,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: '#f9f9f9'
                                }}
                            >
                                {compressedImage ? (
                                    <img src={compressedImage} alt="Compressed preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <Image fontSize="large" sx={{ color: '#ccc' }} />
                                )}
                            </Box>
                            <Box sx={{ mt: '16px !important' }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<Download />}
                                    href={compressedImage || ''}
                                    download="compressed-image.jpg"
                                    disabled={!compressedImage}
                                >
                                    Download
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Image Information Section */}
                    <Card sx={{ mb: '16px !important', p: '16px !important' }}>
                        <CardContent>
                            <Typography fontWeight="bold" sx={{ color: textColor, my: '16px !important' }}>Image Information</Typography>
                            <Typography variant="body2" sx={{ color: textColor, my: '16px !important' }}>
                                File name: {imageName || 'Not selected'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: textColor, my: '16px !important' }}>
                                File type: {imageType || '-'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: textColor, my: '16px !important' }}>
                                Compression ratio: {getCompressionRatio()}
                            </Typography>
                            <Typography variant="body2" sx={{ color: textColor, my: '16px !important' }}>
                                Space saved: {getSpaceSaved()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Bottom Google Ads */}
            <Box width="100%" height={60} bgcolor="#f0f0f0" display="flex" justifyContent="center" alignItems="center" sx={{ mt: '24px !important' }}>
                <Typography sx={{ color: textColor }}>Advertisement</Typography>
            </Box>
        </Box>
    );
};

export default ImageCompressor;
