import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const [mode, setMode] = useState(searchParams.get("mode") === "register" ? "register" : "login");
  const [slideDirection, setSlideDirection] = useState(null);

  useEffect(() => {
    // If user is already authenticated, redirect to home or previous page
    if (isAuthenticated) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  useEffect(() => {
    // Update mode when URL search params change
    const newMode = searchParams.get("mode") === "register" ? "register" : "login";
    if (newMode !== mode) {
      setSlideDirection(newMode === "register" ? "left" : "right");
      setMode(newMode);
    }
  }, [searchParams, mode]);

  const toggleMode = (newMode) => {
    setSlideDirection(newMode === "register" ? "left" : "right");
    navigate(`/auth${newMode === "register" ? "?mode=register" : ""}`, {
      state: location.state
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" fill="none"/><polyline points="152 232 128 208 152 184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="194.63 75.19 185.84 107.98 153.06 99.19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="78.96 140.77 70.16 108 37.39 116.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M70.16,108l-44,76A16,16,0,0,0,40,208H88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,208h88a16,16,0,0,0,13.84-24l-23.14-40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M185.84,108l-44-76a16,16,0,0,0-27.7,0L91,72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === "login" ? "Welcome back!" : "Create your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === "login" ? "Sign in to access your account" : "Join SecondLife Marketplace"}
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Mode Toggle Tabs */}
          <div className="sm:hidden mb-8">
            <select
              value={mode}
              onChange={(e) => toggleMode(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="login">Sign In</option>
              <option value="register">Create Account</option>
            </select>
          </div>

          <div className="hidden sm:block mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => toggleMode("login")}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${mode === "login"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  Sign In
                </button>
                <button
                  onClick={() => toggleMode("register")}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${mode === "register"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  Create Account
                </button>
              </nav>
            </div>
          </div>

          {/* Form Animation Container */}
          <div className="relative overflow-hidden">
            <div
              className={`
                transform transition-transform duration-300 ease-in-out
                ${slideDirection === "left" ? "-translate-x-full" : ""}
                ${slideDirection === "right" ? "translate-x-full" : ""}
              `}
            >
              {mode === "login" ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">
            Trusted by thousands of users
          </h3>
          <div className="flex justify-center space-x-8">
            {/* Trust badges or partner logos could go here */}
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="block text-xs mt-1">Secure</span>
            </div>
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="block text-xs mt-1">Verified</span>
            </div>
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="block text-xs mt-1">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="space-x-4">
          <a href="/help" className="hover:text-gray-900">
            Help Center
          </a>
          <span>•</span>
          <a href="/privacy" className="hover:text-gray-900">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-gray-900">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;