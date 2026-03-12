import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';

const ProfilePicture = ({ 
  size = 'md', 
  className = '',
  src = null,
  editable = false,
  onImageChange = null
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
    '3xl': 'w-24 h-24',
    'sidebar': 'w-24 h-24' // Larger for sidebar
  };

  // Load saved image from localStorage (temporary until database)
  useEffect(() => {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage && !src) {
      setImageSrc(savedImage);
    }
  }, [src]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(uploadedImage, croppedAreaPixels);
      
      // Save to localStorage (temporary until database)
      localStorage.setItem('profilePicture', croppedImage);
      
      setImageSrc(croppedImage);
      setShowCropper(false);
      setUploadedImage(null);
      
      if (onImageChange) {
        onImageChange(croppedImage);
      }
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        }, 'image/jpeg');
      };
      image.onerror = reject;
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={`relative ${sizes[size] || sizes.md} ${className}`}>
        {/* Profile Image */}
        <div 
          className={`w-full h-full rounded-full overflow-hidden border-2 border-retail-red shadow-lg bg-gray-800 cursor-pointer ${editable ? 'hover:opacity-80 transition-opacity' : ''}`}
          onClick={editable ? triggerFileInput : undefined}
        >
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-retail-red to-red-800 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">LM</span>
            </div>
          )}
        </div>

        {/* Edit Overlay (only if editable) */}
        {editable && (
          <>
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-retail-red text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-colors"
              title="Change profile picture"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Adjust Your Profile Picture</h3>
            
            <div className="relative h-64 w-full bg-gray-800 rounded-lg overflow-hidden mb-4">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
              />
            </div>

            {/* Zoom Slider */}
            <div className="mb-4">
              <label className="text-sm text-gray-300 mb-1 block">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-retail-red"
              />
            </div>

            {/* Preview */}
            <div className="mb-4">
              <p className="text-sm text-gray-300 mb-2">Preview:</p>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-retail-red">
                  {uploadedImage && (
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      style={{
                        transform: `translate(${-crop.x}px, ${-crop.y}px) scale(${zoom})`,
                        transformOrigin: 'top left',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCropper(false);
                  setUploadedImage(null);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createCroppedImage}
                className="px-4 py-2 bg-retail-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;