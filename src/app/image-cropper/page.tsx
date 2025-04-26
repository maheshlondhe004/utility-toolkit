'use client';
import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/lib/cropImageUtils';
import { Box, Typography, Button, Slider, Card, CardContent } from '@mui/material';
import { CloudUpload, Crop, Download } from '@mui/icons-material';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

const textColor = '#0F172A';

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImageSrc(reader.result as string);
        }
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels);
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels]);

    return (
        <>
            <Head>
                <title>Image Cropper - Crop Images Online | ToolsVerse</title>
                <meta name="description" content="Crop your images online with ToolsVerse's Image Cropper. Easily select and crop areas to perfection with our free tool." />
                <meta name="keywords" content="image cropper, online crop image, free image cropping, crop tool, photo crop online" />
            </Head>

            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}`}
                crossOrigin="anonymous"
            />

            <Box>
                <Box display="flex" alignItems="center" sx={{ mb: '16px', px: '16px' }}>
                    <Crop sx={{ mr: '8px', color: textColor }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: textColor, my: '16px' }}>
                        Image Cropper
                    </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" sx={{ px: '16px', columnGap: '16px' }}>
                    {/* Upload Section */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, mb: { xs: '24px', md: '0' } }}>
                        <Card sx={{ mb: '16px', p: '16px' }}>
                            <CardContent>
                                {!imageSrc ? (
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
                                            Click to upload an image
                                        </Typography>
                                        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    </Box>
                                ) : (
                                    <>
                                        <Box sx={{ position: 'relative', width: '100%', height: 400, bgcolor: '#000' }}>
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={4 / 3}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={onCropComplete}
                                            />
                                        </Box>
                                        <Box sx={{ mt: '16px' }}>
                                            <Typography gutterBottom>Zoom</Typography>
                                            <Slider
                                                value={zoom}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                aria-labelledby="Zoom"
                                                onChange={(e, zoom) => setZoom(zoom as number)}
                                            />
                                            <Button variant="contained" fullWidth sx={{ mt: '16px' }} onClick={showCroppedImage}>
                                                Crop Image
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Preview and Download Section */}
                    <Box sx={{ width: { xs: '100%', md: '49%' }, pr: { md: '16px' } }}>
                        <Card sx={{ mb: '16px', p: '16px' }}>
                            <CardContent>
                                <Typography fontWeight="bold" sx={{ color: textColor, mb: '16px' }}>
                                    Cropped Image Preview
                                </Typography>
                                {croppedImage ? (
                                    <Box textAlign="center">
                                        <Image src={croppedImage} alt="Cropped" width={300} height={300} style={{ objectFit: 'contain', maxWidth: '100%' }} />
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<Download />}
                                            href={croppedImage}
                                            download="cropped-image.png"
                                            sx={{ mt: '16px' }}
                                            style={{ color: '#FFFFFF'}}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                ) : (
                                    <Typography sx={{ color: textColor }}>No cropped image yet.</Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ImageCropper;
