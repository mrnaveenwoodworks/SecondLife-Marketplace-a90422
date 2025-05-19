import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserListings from "./UserListings";

const UserProfile = ({ userId, isOwnProfile = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user data
        const mockUser = {
          id: userId,
          name: "John Doe",
          username: "johndoe123",
          avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx1c2VyJTJCcHJvZmlsZSUyQnBpY3R1cmV8ZW58MHx8fHwxNzQ3NTUwNDczfDA&ixlib=rb-4.1.0&q=80&w=1080",
          coverPhoto: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTJCY292ZXIlMkJwaG90b3xlbnwwfHx8fDE3NDc1NTA0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          joinDate: "2022-01-15",
          location: "New York, NY",
          bio: "Passionate about finding great deals and giving items a second life!",
          stats: {
            listings: 45,
            sales: 38,
            rating: 4.8,
            reviews: 42,
            followers: 156,
            following: 89
          },
          badges: [
            {
              id: "verified",
              name: "Verified Seller",
              icon: "verified-badge",
              color: "blue"
            },
            {
              id: "top-seller",
              name: "Top Seller",
              icon: "crown",
              color: "yellow"
            },
            {
              id: "quick-response",
              name: "Quick Responder",
              icon: "lightning",
              color: "purple"
            }
          ],
          recentReviews: [
            {
              id: 1,
              reviewer: {
                name: "Alice Smith",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxyZXZpZXdlciUyQmF2YXRhcnxlbnwwfHx8fDE3NDc1NTA0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              rating: 5,
              comment: "Great seller! Item was exactly as described.",
              date: "2023-11-15"
            },
            {
              id: 2,
              reviewer: {
                name: "Bob Johnson",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxyZXZpZXdlciUyQmF2YXRhcnxlbnwwfHx8fDE3NDc1NTA0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              rating: 4,
              comment: "Quick response and smooth transaction.",
              date: "2023-11-10"
            }
          ]
        };

        setUser(mockUser);
        setError(null);
      } catch (err) {
        setError("Failed to load user profile");
        console.error("Error fetching user profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleMessageUser = () => {
    navigate(`/messages/new?recipient=${userId}`);
  };

  const handleFollow = () => {
    // Implement follow functionality
    console.log("Follow user:", userId);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg mb-8"></div>
        <div className="flex flex-col items-center -mt-20">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="mt-4 h-6 bg-gray-200 w-48 rounded"></div>
          <div className="mt-2 h-4 bg-gray-200 w-32 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 bg-gray-200 overflow-hidden">
        {user.coverPhoto ? (
          <img
            src={user.coverPhoto}
            alt="Profile cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center -mt-20">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>
              )}
            </div>
            {user.badges.some(badge => badge.id === "verified") && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
            )}
          </div>

          {/* User Info */}
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>

          {/* Location and Join Date */}
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">{user.location}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="84 132 100 124 100 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M138.14,132a16,16,0,1,1,26.64,17.63L136,180h32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">
                Joined {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-4 flex space-x-2">
            {user.badges.map(badge => (
              <div
                key={badge.id}
                className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm
                  ${badge.color === "blue" ? "bg-blue-100 text-blue-800" :
                    badge.color === "yellow" ? "bg-yellow-100 text-yellow-800" :
                    badge.color === "purple" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"}
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="136" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="68" x2="160" y2="68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M84,187.21a60,60,0,0,1,88,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-1">{badge.name}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleMessageUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="96" y1="100" x2="160" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="140" x2="160" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Message</span>
              </button>
              <button
                onClick={handleFollow}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="204" y1="136" x2="244" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="224" y1="116" x2="224" y2="156" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="108" cy="100" r="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Follow</span>
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{user.stats.listings}</div>
              <div className="text-sm text-gray-500">Active Listings</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{user.stats.sales}</div>
              <div className="text-sm text-gray-500">Items Sold</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">
                {user.stats.rating}
                <span className="text-yellow-500 ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </span>
              </div>
              <div className="text-sm text-gray-500">{user.stats.reviews} Reviews</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mt-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600">{user.bio}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 justify-center">
            <button
              onClick={() => setActiveTab("listings")}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === "listings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              Listings
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "listings" ? (
            <UserListings userId={userId} />
          ) : (
            <div className="space-y-4">
              {user.recentReviews.map(review => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {review.reviewer.avatar ? (
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {review.reviewer.name}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </time>
                      </div>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;