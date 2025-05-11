'use client';
import React, { useState, useRef } from 'react';
import {
    Box, Typography, Button, Card, CardContent,
    Tabs, Tab, TextField, Checkbox, FormControlLabel
} from '@mui/material';
import { CloudUpload, Image as ImageIcon, Download } from '@mui/icons-material';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

const textColor = '#0F172A';

const ImageResizer = () => {
    const [tabValue, setTabValue] = useState(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [imageSrcs, setImageSrcs] = useState<string[]>([]);
    const [resizedImages, setResizedImages] = useState<string[]>([]);
    const [width, setWidth] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [widthError, setWidthError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [aspectRatio, setAspectRatio] = useState(true);
    const [doNotEnlarge, setDoNotEnlarge] = useState(true);
    const [percentage, setPercentage] = useState(50);
    const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setImageFiles(files);

            const readers = files.map(file => {
                return new Promise<{ src: string; dimensions: { width: number; height: number } }>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const img = new window.Image();
                        img.src = reader.result as string;
                        img.onload = () => {
                            resolve({
                                src: reader.result as string,
                                dimensions: { width: img.width, height: img.height },
                            });
                        };
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then(results => {
                setImageSrcs(results.map(r => r.src));
                setOriginalDimensions(results.map(r => r.dimensions));
                setResizedImages([]);
                setWidth('');
                setHeight('');
                setWidthError('');
                setHeightError('');
            });
        }
    };

    const resetForm = () => {
        setImageFiles([]);
        setImageSrcs([]);
        setResizedImages([]);
        setOriginalDimensions([]);
        setWidth('');
        setHeight('');
        setWidthError('');
        setHeightError('');
        setTabValue(0);
        setPercentage(50);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resizeImageWithCanvas = (
        src: string,
        targetWidth: number,
        targetHeight: number,
        maintainAspect: boolean,
        preventEnlarge: boolean
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context not supported'));
                    return;
                }

                let newWidth = targetWidth;
                let newHeight = targetHeight;

                if (maintainAspect) {
                    const aspect = img.width / img.height;
                    if (newWidth / newHeight > aspect) {
                        newWidth = newHeight * aspect;
                    } else {
                        newHeight = newWidth / aspect;
                    }
                }

                if (preventEnlarge) {
                    newWidth = Math.min(newWidth, img.width);
                    newHeight = Math.min(newHeight, img.height);
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                resolve(canvas.toDataURL('image/png', 1.0));
            };
            img.onerror = () => reject(new Error('Image loading failed'));
        });
    };

    const validateDimension = (value: number, max: number, field: 'width' | 'height') => {
        if (value <= 0) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0.`;
        }
        if (value > max) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed original image ${field} (${max}px).`;
        }
        return '';
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWidthError('');
        setHeightError('');

        if (value === '') {
            setWidth('');
            if (aspectRatio && originalDimensions.length > 0) {
                setHeight('');
            }
        } else {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
                if (originalDimensions.length > 0) {
                    const maxWidth = originalDimensions[0].width;
                    const error = validateDimension(numValue, maxWidth, 'width');
                    if (error) {
                        setWidthError(error);
                        return;
                    }
                }
                setWidth(numValue);
                if (aspectRatio && originalDimensions.length > 0) {
                    const aspect = originalDimensions[0].width / originalDimensions[0].height;
                    const newHeight = Math.round(numValue / aspect);
                    const heightError = validateDimension(newHeight, originalDimensions[0].height, 'height');
                    if (heightError) {
                        setHeightError(heightError);
                    } else {
                        setHeight(newHeight);
                    }
                }
            }
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWidthError('');
        setHeightError('');

        if (value === '') {
            setHeight('');
            if (aspectRatio && originalDimensions.length > 0) {
                setWidth('');
            }
        } else {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
                if (originalDimensions.length > 0) {
                    const maxHeight = originalDimensions[0].height;
                    const error = validateDimension(numValue, maxHeight, 'height');
                    if (error) {
                        setHeightError(error);
                        return;
                    }
                }
                setHeight(numValue);
                if (aspectRatio && originalDimensions.length > 0) {
                    const aspect = originalDimensions[0].width / originalDimensions[0].height;
                    const newWidth = Math.round(numValue * aspect);
                    const widthError = validateDimension(newWidth, originalDimensions[0].width, 'width');
                    if (widthError) {
                        setWidthError(widthError);
                    } else {
                        setWidth(newWidth);
                    }
                }
            }
        }
    };

    const handleResize = async () => {
        if (widthError || heightError) {
            alert('Please correct the errors in width or height.');
            return;
        }

        const resized: string[] = [];

        for (const src of imageSrcs) {
            let targetWidth: number;
            let targetHeight: number;

            if (tabValue === 0) {
                targetWidth = typeof width === 'number' ? width : 0;
                targetHeight = typeof height === 'number' ? height : 0;

                if (targetWidth <= 0 || targetHeight <= 0) {
                    alert('Please enter valid width and height.');
                    return;
                }
            } else {
                const img = new window.Image();
                img.src = src;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });

                const scale = (100 - percentage) / 100;
                targetWidth = img.width * scale;
                targetHeight = img.height * scale;
            }

            try {
                const resizedSrc = await resizeImageWithCanvas(
                    src,
                    targetWidth,
                    targetHeight,
                    aspectRatio,
                    doNotEnlarge
                );
                resized.push(resizedSrc);
            } catch (error) {
                console.error('Error resizing image:', error);
                alert('Failed to resize one or more images.');
            }
        }

        setResizedImages(resized);
    };

    return (
        <>
            <Head>
                <title>Image Resizer - Resize Images Online | ToolsVerse</title>
                <meta name="description" content="Resize your images online with ToolsVerse's Image Resizer. Adjust dimensions by pixel or percentage with ease." />
                <meta name="keywords" content="image resizer, resize image online, free image resizing, resize by pixel, resize by percentage, onlime image resize" />
            </Head>

            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
                crossOrigin="anonymous"
            />

            <Box>
                <Box display="flex" alignItems="center" sx={{ mb: '16px', px: '16px' }}>
                    <ImageIcon sx={{ mr: '8px', color: textColor }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: textColor, my: '16px' }}>
                        Image Resizer
                    </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" sx={{ px: '16px', columnGap: '16px' }}>
                    {/* LEFT PANEL */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, mb: { xs: '24px', md: '0' } }}>
                        <Card sx={{ mb: '16px', p: '16px' }}>
                            <CardContent>
                                {imageSrcs.length === 0 ? (
                                    <Box
                                        onClick={triggerFileInput}
                                        sx={{
                                            border: '2px dashed #ccc',
                                            borderRadius: 2,
                                            minHeight: 200,
                                            py: '16px',
                                            px: '24px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            bgcolor: '#f9f9f9',
                                            transition: 'all 0.3s ease-in-out',
                                        }}
                                    >
                                        <CloudUpload fontSize="large" sx={{ color: '#aaa', fontSize: '2.5rem' }} />
                                        <Typography mt={1} sx={{ color: textColor, my: '16px' }}>
                                            Click to upload image(s)
                                        </Typography>
                                        <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CloudUpload />}
                                            onClick={triggerFileInput}
                                            sx={{ mb: '16px' }}
                                        >
                                            Upload New Image(s)
                                        </Button>
                                        <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                                            <Tab label="By Pixel" />
                                            <Tab label="By Percentage" />
                                        </Tabs>

                                        {tabValue === 0 && (
                                            <Box sx={{ mt: '16px' }}>
                                                <TextField
                                                    label="Width (px)"
                                                    type="number"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={width}
                                                    onChange={handleWidthChange}
                                                    inputProps={{ min: 1, pattern: '[0-9]*' }}
                                                    error={!!widthError}
                                                    helperText={widthError}
                                                    sx={{
                                                        mb: '16px',
                                                        '& .MuiInputBase-root': {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '8px',
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            textAlign: 'center',
                                                            fontSize: '1rem',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            fontSize: '1rem',
                                                            textAlign: 'center',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            transition: 'all 0.2s ease-out',
                                                            marginLeft: '8px',
                                                        },
                                                        '& .MuiInputLabel-shrink': {
                                                            top: 0,
                                                            transform: 'translate(8px, -8.5px) scale(0.75)',
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    label="Height (px)"
                                                    type="number"
                                                    fullWidth
                                                    value={height}
                                                    onChange={handleHeightChange}
                                                    inputProps={{ min: 1, pattern: '[0-9]*' }}
                                                    error={!!heightError}
                                                    helperText={heightError}
                                                    sx={{
                                                        mb: '16px',
                                                        '& .MuiInputBase-root': {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '8px',
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            textAlign: 'center',
                                                            fontSize: '1rem',
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            fontSize: '1rem',
                                                            textAlign: 'center',
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            transition: 'all 0.2s ease-out',
                                                            marginLeft: '8px',
                                                        },
                                                        '& .MuiInputLabel-shrink': {
                                                            top: 0,
                                                            transform: 'translate(8px, -8.5px) scale(0.75)',
                                                        },
                                                    }}
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={aspectRatio} onChange={(e) => setAspectRatio(e.target.checked)} />}
                                                    label="Maintain Aspect Ratio"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={doNotEnlarge} onChange={(e) => setDoNotEnlarge(e.target.checked)} />}
                                                    label="Do not enlarge if smaller"
                                                />
                                            </Box>
                                        )}

                                        {tabValue === 1 && (
                                            <Box sx={{ mt: '16px' }}>
                                                {[25, 50, 75].map((val) => (
                                                    <Button
                                                        key={val}
                                                        variant={percentage === val ? 'contained' : 'outlined'}
                                                        onClick={() => setPercentage(val)}
                                                        sx={{ mr: '8px', mb: 1 }}
                                                    >
                                                        {val}% smaller
                                                    </Button>
                                                ))}
                                            </Box>
                                        )}

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{ mt: '16px' }}
                                            onClick={handleResize}
                                            disabled={imageSrcs.length === 0 || !!widthError || !!heightError}
                                        >
                                            Resize Image(s)
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Box>

                    {/* RIGHT PANEL */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, pr: { md: '16px' } }}>
                        <Card sx={{ mb: '16px', p: '16px' }}>
                            <CardContent>
                                <Typography fontWeight="bold" sx={{ color: textColor, mb: '16px' }}>
                                    Resized Image Preview
                                </Typography>
                                {resizedImages.length > 0 ? (
                                    <>
                                        {resizedImages.map((src, index) => (
                                            <Box key={index} textAlign="center" sx={{ mb: 4 }}>
                                                <Image src={src} alt={`Resized ${index}`} width={300} height={300} style={{ objectFit: 'contain', maxWidth: '100%' }} />
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    startIcon={<Download />}
                                                    href={src}
                                                    download={`resized-image-${index + 1}.png`}
                                                    sx={{ mt: 2 }}
                                                    style={{ color: '#FFFFFF' }}
                                                >
                                                    Download
                                                </Button>
                                            </Box>
                                        ))}
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={resetForm}
                                            sx={{ mt: '16px' }}
                                        >
                                            Select New Image(s)
                                        </Button>
                                    </>
                                ) : (
                                    <Typography sx={{ color: textColor }}>No resized images yet.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ImageResizer;