import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/user/UserProfile";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const UserProfilePage = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // Simulate API call to fetch user information for breadcrumbs
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock breadcrumbs data
        setBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Users", path: "/users" },
          { name: "Profile", path: null }
        ]);

        setError(null);
      } catch (err) {
        setError("Failed to load user profile information");
        console.error("Error fetching user profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Check if viewing own profile
  const isOwnProfile = currentUser && currentUser.id === userId;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span className="mx-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </span>
                )}
                {crumb.path ? (
                  <a href={crumb.path} className="hover:text-blue-600">
                    {crumb.name}
                  </a>
                ) : (
                  <span className="text-gray-800">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main Profile Content */}
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="my-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="my-8 text-center text-red-600">
            <div className="text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
            </div>
            <p className="text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <UserProfile userId={userId} isOwnProfile={isOwnProfile} />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;