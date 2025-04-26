import { Area } from 'react-easy-crop';

export const getCroppedImg = async (imageSrc: string, crop: Area): Promise<string> => {
    const createImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = (error) => reject(error);
        });
    };

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Failed to get canvas context');

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(URL.createObjectURL(blob));
            }
        }, 'image/jpeg');
    });
};
