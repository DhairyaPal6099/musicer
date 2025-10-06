import { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import getCroppedImg from './cropImage';
import Image from 'next/image';
import placeholderimage from '../../../public/placeholderimage.jpg';

export default function ProfilePicture() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null);
      }
      reader.readAsDataURL(file);

      e.target.value = '';
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };


  const showCroppedImage = async () => {
    try {
      const cropped = await getCroppedImg(imageSrc!, croppedAreaPixels!);
      setCroppedImage(cropped);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <Image className="cursor-pointer rounded-full object-cover" src={croppedImage || placeholderimage} alt="Profile photo" onClick={handleImageClick} width={256} height={256} />

      {imageSrc && !croppedImage && (
        <div className="flex flex-col items-center space-y-4">
            {/* Cropper container */}
            <div className="relative w-64 h-64">
            <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
            </div>

            <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-64"
                />
            <button onClick={() => setImageSrc(null)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
            </button>
            <button
                onClick={showCroppedImage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                >
            Save Crop
            </button>
        </div>
        )}

    </div>
  );
}