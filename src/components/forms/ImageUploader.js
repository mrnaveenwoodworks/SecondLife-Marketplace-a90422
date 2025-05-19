import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Array of placeholder image URLs to use as fallbacks
const PLACEHOLDER_IMAGES = [
  "https://via.placeholder.com/800x600?text=Product+Image+1",
  "https://via.placeholder.com/800x600?text=Product+Image+2",
  "https://via.placeholder.com/800x600?text=Product+Image+3",
  "https://via.placeholder.com/800x600?text=Product+Image+4",
  "https://via.placeholder.com/800x600?text=Product+Image+5"
];

// Helper function to convert URL to File object for submission
const urlToFile = async (url, filename = "placeholder.jpg") => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type || "image/jpeg" });
  } catch (error) {
    console.error("Error converting URL to File:", error);
    return null;
  }
};

// Generate a random placeholder image URL
const getRandomPlaceholder = () => {
  const index = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
  return PLACEHOLDER_IMAGES[index];
};

const ImageUploader = ({ 
  onImagesUploaded, 
  onImageRemoved,
  maxImages = 5,
  existingImages = [],
  className = ""
}) => {
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderUrl, setPlaceholderUrl] = useState("");
  const previewsRef = useRef([]);

  // Initialize with existing images if provided
  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      const initialPreviews = existingImages.map(file => ({
        url: URL.createObjectURL(file),
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      }));
      
      setPreviews(initialPreviews);
      previewsRef.current = initialPreviews;
    }
    
    // Generate a random placeholder URL for fallback
    setPlaceholderUrl(getRandomPlaceholder());
    
    // Cleanup URLs when component unmounts
    return () => {
      previews.forEach(preview => {
        if (preview.url.startsWith("blob:")) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [existingImages]);

  const validateFile = (file) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "File type not supported. Please upload JPEG, PNG, or WebP images only.";
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File size too large. Maximum size is ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB.`;
    }
    
    return null;
  };

  const handleUsePlaceholder = async () => {
    setIsLoading(true);
    try {
      // Convert the placeholder URL to a File
      const placeholderFile = await urlToFile(
        placeholderUrl, 
        `placeholder-${Date.now()}.jpg`
      );
      
      if (placeholderFile) {
        const newPreview = {
          url: placeholderUrl,
          file: placeholderFile,
          id: `placeholder-${Date.now()}`,
          isPlaceholder: true
        };
        
        const updatedPreviews = [...previewsRef.current, newPreview];
        setPreviews(updatedPreviews);
        previewsRef.current = updatedPreviews;
        
        // Notify parent component about the new image
        onImagesUploaded([placeholderFile]);
      }
    } catch (error) {
      console.error("Failed to use placeholder image:", error);
      setErrors(["Failed to load placeholder image. Please try again or upload your own image."]);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setErrors([]);
    setIsLoading(true);
    
    const newErrors = [];
    const newPreviews = [...previewsRef.current];

    // Check if adding new files would exceed maxImages
    if (newPreviews.length + acceptedFiles.length > maxImages) {
      setErrors([`Maximum ${maxImages} images allowed`]);
      setIsLoading(false);
      return;
    }

    // Process each dropped file
    const processedFiles = [];
    
    acceptedFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(`${file.name}: ${error}`);
        return;
      }

      // Create preview URL and add to list
      const previewUrl = URL.createObjectURL(file);
      const newPreview = {
        url: previewUrl,
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };
      
      newPreviews.push(newPreview);
      processedFiles.push(file);
    });

    if (newErrors.length) {
      setErrors(newErrors);
    }

    setPreviews(newPreviews);
    previewsRef.current = newPreviews;
    
    // Notify parent component about the added images
    if (processedFiles.length > 0) {
      onImagesUploaded(processedFiles);
    }
    
    setIsLoading(false);
  }, [maxImages, onImagesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": []
    },
    multiple: true,
    disabled: isLoading
  });

  const removeImage = (idToRemove) => {
    const imageToRemove = previews.find(preview => preview.id === idToRemove);
    if (!imageToRemove) return;
    
    const newPreviews = previews.filter(preview => preview.id !== idToRemove);
    setPreviews(newPreviews);
    previewsRef.current = newPreviews;
    
    // Notify parent component
    if (onImageRemoved) {
      onImageRemoved(previews.findIndex(preview => preview.id === idToRemove));
    }

    // Revoke the URL to prevent memory leaks
    if (imageToRemove.url.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  const dragProps = {
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDrop: () => setIsDragging(false)
  };

  return (
    <div className={className}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        {...dragProps}
        className={`
          relative p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
          transition-colors duration-200
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          ${isDragActive || isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"}
        `}
      >
        <input {...getInputProps()} disabled={isLoading} />
        
        <div className="space-y-4">
          {/* Upload Icon */}
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48">
              <rect width="256" height="256" fill="none"/>
              <path d="M216,152V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <path d="M40,184V200a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V184" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <path d="M128,120v-64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <polyline points="96 88 128 56 160 88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <line x1="216" y1="152" x2="40" y2="152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-sm text-gray-500">Processing...</p>
              </div>
            ) : (
              <>
                <p className="text-base text-gray-600">
                  Drag and drop your images here, or{" "}
                  <span className="text-blue-600">browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPEG, PNG, WebP up to 5MB each
                </p>
                <p className="text-sm text-gray-500">
                  {maxImages - previews.length} of {maxImages} spots remaining
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-red-600 bg-red-50 px-4 py-2 rounded mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder Option (when no images) */}
      {previews.length === 0 && !isLoading && (
        <div className="mt-4 border border-gray-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-700">No images yet?</h4>
              <p className="text-xs text-gray-500 mt-1">
                You can use a placeholder image and update it later
              </p>
            </div>
            <button
              type="button"
              onClick={handleUsePlaceholder}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md"
            >
              Use Placeholder
            </button>
          </div>
          
          <div className="mt-3">
            <img 
              src={placeholderUrl} 
              alt="Placeholder example" 
              className="h-20 w-40 object-cover rounded-md mx-auto opacity-50"
            />
          </div>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="relative group aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={preview.url}
                alt={preview.isPlaceholder ? "Placeholder image" : "Upload preview"}
                className="w-full h-40 object-cover"
              />
              
              {/* Placeholder Indicator */}
              {preview.isPlaceholder && (
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-md">
                  Placeholder
                </div>
              )}
              
              {/* Overlay with Remove Button */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(preview.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all transform scale-75 group-hover:scale-100"
                  title="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* File Size Indicator (for real uploads) */}
              {preview.file && !preview.isPlaceholder && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
                  {(preview.file.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add More Images Button (when some images exist but below max) */}
      {previews.length > 0 && previews.length < maxImages && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add More Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;