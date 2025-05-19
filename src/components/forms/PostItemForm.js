import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { products } from "../../utils/api";
import { formatFileSize } from "../../utils/formatters";

const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters"),
  description: yup.string().required("Description is required").min(20, "Description must be at least 20 characters"),
  category: yup.string().required("Category selection is required"),
  subcategory: yup.string().required("Subcategory selection is required"),
  condition: yup.string().required("Condition selection is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  location: yup.string().required("Location is required"),
  contactMethod: yup.string().required("Contact preference is required"),
  images: yup.array() // Remove min validation to allow placeholder images
});

// Array of placeholder product images
const placeholderImages = [
  "https://via.placeholder.com/600x400?text=Product+Image+1",
  "https://via.placeholder.com/600x400?text=Product+Image+2",
  "https://via.placeholder.com/600x400?text=Product+Image+3",
  "https://via.placeholder.com/600x400?text=Product+Image+4",
  "https://via.placeholder.com/600x400?text=Product+Image+5"
];

// Helper function to convert URL to File object
const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

const PostItemForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usingPlaceholderImage, setUsingPlaceholderImage] = useState(false);
  const [placeholderImage, setPlaceholderImage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subcategory: "",
      condition: "used-good",
      price: "",
      location: "",
      contactMethod: "app-messages",
      images: [],
    },
  });

  const selectedCategory = useWatch({ control, name: "category" });

  useEffect(() => {
    // Select a random placeholder image URL
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    setPlaceholderImage(placeholderImages[randomIndex]);
  }, []);

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      subcategories: ["Phones", "Computers", "TVs & Audio", "Cameras", "Other Electronics"],
    },
    {
      id: "furniture",
      name: "Furniture",
      subcategories: ["Sofas", "Beds", "Tables", "Chairs", "Storage", "Other Furniture"],
    },
    {
      id: "clothing",
      name: "Clothing",
      subcategories: ["Men's", "Women's", "Kids", "Shoes", "Accessories"],
    },
    {
      id: "vehicles",
      name: "Vehicles",
      subcategories: ["Cars", "Motorcycles", "Bicycles", "Parts & Accessories"],
    },
    {
      id: "books",
      name: "Books & Media",
      subcategories: ["Books", "Textbooks", "Magazines", "Movies", "Music"],
    },
    {
      id: "sports",
      name: "Sports & Hobbies",
      subcategories: ["Exercise Equipment", "Outdoor Sports", "Collectibles", "Musical Instruments", "Games & Toys"],
    },
    {
      id: "other",
      name: "Other",
      subcategories: ["Miscellaneous"],
    },
  ];

  const conditionOptions = [
    { id: "new", label: "New" },
    { id: "used-likenew", label: "Like New" },
    { id: "used-good", label: "Good" },
    { id: "used-fair", label: "Fair" },
    { id: "used-poor", label: "Poor" },
  ];

  const contactMethodOptions = [
    { id: "app-messages", label: "App Messages" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ];

  const handleImageUpload = (uploadedImages) => {
    // If we were using a placeholder but now have real images, turn off placeholder
    if (usingPlaceholderImage && uploadedImages.length > 0) {
      setUsingPlaceholderImage(false);
    }

    setImages([...images, ...uploadedImages]);
    setValue("images", [...images, ...uploadedImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setValue("images", updatedImages);

    // If all images are removed, we'll need to use a placeholder again
    if (updatedImages.length === 0) {
      setUsingPlaceholderImage(false);
    }
  };

  const usePlaceholderImage = async () => {
    setUsingPlaceholderImage(true);
    
    try {
      // We'll fetch and convert the placeholder to a File object when needed for actual API submission
      await trigger("images");
    } catch (error) {
      console.error("Error setting placeholder image:", error);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["title", "description"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["category", "subcategory", "condition"];
    } else if (currentStep === 3) {
      // Check if we need to use a placeholder image
      if (images.length === 0 && !usingPlaceholderImage) {
        await usePlaceholderImage();
      }
      
      // No validation needed for images since we'll use a placeholder
      fieldsToValidate = [];
    }
    
    const isStepValid = fieldsToValidate.length === 0 || await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const prepareFinalData = async (formData) => {
    // If user didn't upload images and we're using a placeholder
    if (images.length === 0 || usingPlaceholderImage) {
      try {
        // Convert placeholder URL to a File object for submission
        const placeholderFile = await urlToFile(
          placeholderImage, 
          `placeholder-${Date.now()}.jpg`
        );
        formData.images = [placeholderFile];
      } catch (error) {
        console.error("Error creating placeholder file:", error);
        // Fall back to just the URL if conversion fails
        formData.placeholderImageUrl = placeholderImage;
      }
    }
    
    return formData;
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Prepare data with placeholder image if needed
      const finalData = await prepareFinalData(data);
      
      console.log("Form submitted with:", finalData);
      
      // Upload images
      let imageUrls = [];
      if (finalData.images && finalData.images.length > 0) {
        try {
          // Simulate image upload success
          imageUrls = finalData.images.map((_, i) => 
            `https://secondlife-marketplace.example.com/images/product-${Date.now()}-${i}.jpg`
          );
          
          // In a real app, you'd use the API:
          // const uploadResult = await products.uploadImages(productId, finalData.images);
          // imageUrls = uploadResult.imageUrls;
        } catch (error) {
          console.error("Error uploading images:", error);
        }
      } else if (finalData.placeholderImageUrl) {
        imageUrls = [finalData.placeholderImageUrl];
      }
      
      // Create the product with image URLs
      const productData = {
        ...finalData,
        imageUrls
      };
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app:
      // await products.create(productData);
      
      // Show success and redirect
      alert("Your item has been successfully listed!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error posting your listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Item Details</h2>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="What are you selling?"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                {...register("description")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your item (condition, features, etc.)"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Item Classification</h2>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <select
                id="subcategory"
                {...register("subcategory")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={!selectedCategory}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory &&
                  categories
                    .find((cat) => cat.id === selectedCategory)
                    ?.subcategories.map((sub, index) => (
                      <option key={index} value={sub.toLowerCase().replace(/\s+/g, "-")}>
                        {sub}
                      </option>
                    ))}
              </select>
              {errors.subcategory && (
                <p className="mt-1 text-sm text-red-600">{errors.subcategory.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <div className="grid grid-cols-3 gap-4">
                {conditionOptions.map((option) => (
                  <label 
                    key={option.id}
                    className={`
                      flex items-center justify-center p-3 border rounded-md cursor-pointer
                      ${getValues("condition") === option.id 
                        ? "border-blue-500 bg-blue-50 text-blue-700" 
                        : "border-gray-300 hover:bg-gray-50"}
                    `}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value={option.id}
                      {...register("condition")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.condition && (
                <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Add Photos</h2>
            <p className="text-sm text-gray-500">
              Add up to 10 photos to showcase your item. The first image will be your cover image.
            </p>
            
            <ImageUploader 
              onImagesUploaded={handleImageUpload}
              existingImages={images}
              onImageRemoved={removeImage}
              maxImages={10}
            />
            
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
            )}
            
            <div className="grid grid-cols-5 gap-2 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index}`} 
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            {images.length === 0 && (
              <div className="mt-4">
                <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No images uploaded yet. If you continue without uploading, a placeholder image will be used.
                      </p>
                    </div>
                  </div>
                </div>
                
                {placeholderImage && (
                  <div className="border rounded-md p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview of placeholder image:</p>
                    <img 
                      src={placeholderImage} 
                      alt="Placeholder Preview" 
                      className="h-40 w-full object-contain rounded-md bg-gray-100"
                    />
                    <div className="mt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={usePlaceholderImage}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                      >
                        Use this placeholder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Price & Location</h2>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  {...register("price")}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="City, State"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <div className="space-y-2">
                {contactMethodOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value={option.id}
                      {...register("contactMethod")}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.contactMethod && (
                <p className="mt-1 text-sm text-red-600">{errors.contactMethod.message}</p>
              )}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Submit</h2>
            
            <div className="rounded-md bg-gray-50 p-6 border border-gray-200">
              <div className="divide-y divide-gray-200">
                <div className="flex justify-between py-3">
                  <h3 className="text-sm font-medium text-gray-600">Title</h3>
                  <p className="text-sm font-semibold text-gray-900">{getValues("title")}</p>
                </div>
                
                <div className="py-3">
                  <h3 className="text-sm font-medium text-gray-600">Description</h3>
                  <p className="mt-1 text-sm text-gray-900">{getValues("description")}</p>
                </div>
                
                <div className="flex justify-between py-3">
                  <h3 className="text-sm font-medium text-gray-600">Category</h3>
                  <p className="text-sm text-gray-900">
                    {categories.find((cat) => cat.id === getValues("category"))?.name || ""}
                    {" > "}
                    {getValues("subcategory").replace(/-/g, " ")}
                  </p>
                </div>
                
                <div className="flex justify-between py-3">
                  <h3 className="text-sm font-medium text-gray-600">Condition</h3>
                  <p className="text-sm text-gray-900">
                    {conditionOptions.find((cond) => cond.id === getValues("condition"))?.label || ""}
                  </p>
                </div>
                
                <div className="flex justify-between py-3">
                  <h3 className="text-sm font-medium text-gray-600">Price</h3>
                  <p className="text-sm font-semibold text-green-600">${getValues("price")}</p>
                </div>
                
                <div className="flex justify-between py-3">
                  <h3 className="text-sm font-medium text-gray-600">Location</h3>
                  <p className="text-sm text-gray-900">{getValues("location")}</p>
                </div>
                
                <div className="py-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Photos</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <img 
                          key={index} 
                          src={URL.createObjectURL(image)} 
                          alt={`Item ${index}`} 
                          className="h-16 w-full object-cover rounded-md"
                        />
                      ))
                    ) : (
                      <div className="col-span-2">
                        <img 
                          src={placeholderImage} 
                          alt="Placeholder Preview" 
                          className="h-16 w-full object-cover rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-1">Placeholder image will be used</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Please review before submitting
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    By posting this listing, you agree to our terms of service and confirm that all information provided is accurate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {["Details", "Classification", "Photos", "Price & Location", "Review"].map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStep > index + 1 
                      ? "bg-green-500" 
                      : currentStep === index + 1 
                        ? "bg-blue-500" 
                        : "bg-gray-200"
                  } text-white text-sm font-medium`}
                >
                  {currentStep > index + 1 ? (
                    <span>✓</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="mt-1 text-xs">{step}</span>
              </div>
              
              {index < 4 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {renderFormStep()}
        
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            className={`px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                "Post Listing"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostItemForm;