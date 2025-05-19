import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostItemForm from "../components/forms/PostItemForm";

const PostItemPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/post-item", message: "You need to login to post an item." } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post Your Item</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below to list your item for sale on SecondLife Marketplace.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-400 flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="21.49" y="82.75" width="213.02" height="90.51" rx="8" transform="translate(-53.02 128) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="64" x2="160" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="96" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="128" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold">Sell Fast, Earn Cash</h2>
            <p className="text-blue-100">Items with clear photos and detailed descriptions sell up to 60% faster</p>
          </div>
        </div>

        <PostItemForm />
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="24" y="64" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="200 112 244 80 244 176 200 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <span className="ml-2">Quality Photos</span>
          </h3>
          <p className="text-gray-600 text-sm">
            Add clear, well-lit photos from multiple angles to attract more buyers.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <span className="ml-2">Detailed Description</span>
          </h3>
          <p className="text-gray-600 text-sm">
            Be honest about condition and include all relevant details about your item.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <span className="ml-2">Fair Pricing</span>
          </h3>
          <p className="text-gray-600 text-sm">
            Research similar items to set a competitive price that will attract buyers.
          </p>
        </div>
      </div>

      <div className="mt-8 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-lg mb-2 flex items-center text-yellow-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="128" y1="192" x2="128" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 128 144 160 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M80,168a79.86,79.86,0,0,1-32-63.53C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,49.77,144.1A19.81,19.81,0,0,0,168,184h0a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-.23A19.8,19.8,0,0,0,80,168Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          <span className="ml-2">Seller Tips</span>
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-sm text-yellow-800">
          <li>Always meet buyers in public places for safety</li>
          <li>Don't share personal financial information with potential buyers</li>
          <li>Respond promptly to inquiries to increase your chances of selling</li>
          <li>Consider reasonable offers even if they're below your asking price</li>
          <li>Update your listing if the condition or availability of the item changes</li>
        </ul>
      </div>
    </div>
  );
};

export default PostItemPage;