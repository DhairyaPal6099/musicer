import Cropper from 'react-easy-crop';
import { useState } from 'react';

export default function ProfileCropper({ imageSrc }: { imageSrc: string }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
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
      />
    </div>
  );
}