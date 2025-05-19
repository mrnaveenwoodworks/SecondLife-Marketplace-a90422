import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import PostItemPage from "./pages/PostItemPage";
import MessagesPage from "./pages/MessagesPage";
import AuthPage from "./pages/AuthPage";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  
  if (!authToken) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4CAF50",
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: "#F44336",
            },
          },
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<ProductListPage />} />
            <Route path="/category/:categoryId" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />
            
            {/* Protected Routes */}
            <Route
              path="/post-item"
              element={
                <ProtectedRoute>
                  <PostItemPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages/:threadId"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route for 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8 text-center">
                    <div>
                      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Page Not Found
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => window.history.back()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;