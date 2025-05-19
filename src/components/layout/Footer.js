import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Marketplace",
      links: [
        { name: "Browse Categories", to: "/categories" },
        { name: "Popular Items", to: "/popular" },
        { name: "Recent Listings", to: "/recent" },
        { name: "Deals & Discounts", to: "/deals" },
        { name: "Sell an Item", to: "/post-item" },
      ],
    },
    {
      title: "Customer Support",
      links: [
        { name: "Help Center", to: "/help" },
        { name: "Safety Tips", to: "/safety" },
        { name: "Contact Us", to: "/contact" },
        { name: "Report an Issue", to: "/report" },
        { name: "Feedback", to: "/feedback" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About SecondLife", to: "/about" },
        { name: "How It Works", to: "/how-it-works" },
        { name: "Careers", to: "/careers" },
        { name: "Press", to: "/press" },
        { name: "Blog", to: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", to: "/terms" },
        { name: "Privacy Policy", to: "/privacy" },
        { name: "Cookie Policy", to: "/cookies" },
        { name: "Prohibited Items", to: "/prohibited" },
        { name: "Accessibility", to: "/accessibility" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "facebook", url: "https://facebook.com" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com" },
    { name: "YouTube", icon: "youtube", url: "https://youtube.com" },
    { name: "Pinterest", icon: "pinterest", url: "https://pinterest.com" },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="152 232 128 208 152 184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="194.63 75.19 185.84 107.98 153.06 99.19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="78.96 140.77 70.16 108 37.39 116.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M70.16,108l-44,76A16,16,0,0,0,40,208H88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,208h88a16,16,0,0,0,13.84-24l-23.14-40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M185.84,108l-44-76a16,16,0,0,0-27.7,0L91,72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <span className="text-xl font-bold">SecondLife</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Buy and sell pre-owned items easily on SecondLife Marketplace.
              Give your items a second chance and find great deals in your community.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M88,176S32.85,144,40.78,56c0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24H240l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12S72,200,88,176Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download App Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Get the SecondLife App</h3>
            <p className="text-gray-300 mb-4">
              Download our app for a better experience
            </p>
            <div className="flex space-x-4">
              <a
                href="#app-store"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M216,73.52C204.53,62.66,185,56,168,56a63.72,63.72,0,0,0-40,14h0A63.71,63.71,0,0,0,88.88,56C52,55.5,23.06,86.3,24,123.19a119.62,119.62,0,0,0,37.65,84.12A31.92,31.92,0,0,0,83.6,216h87.7a31.75,31.75,0,0,0,23.26-10c15.85-17,21.44-33.2,21.44-33.2h0c-16.79-11.53-24-30.87-24-52.78,0-18.3,11.68-34.81,24-46.48Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M148,12a32.12,32.12,0,0,0-9.77,8.37" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">App Store</span>
              </a>
              <a
                href="#google-play"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M56,224.14a8,8,0,0,0,12.06,6.77L235.9,134.84a7.75,7.75,0,0,0,0-13.68L68.06,25.09A8,8,0,0,0,56,31.86Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="58.33" y1="26.33" x2="192" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="58.33" y1="229.67" x2="191.98" y2="96.02" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Google Play</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="88" y1="148" x2="64" y2="148" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="168 144 168 24 200 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M232,176V116a52,52,0,0,0-52-52H76a52,52,0,0,1,52,52v68h96A8,8,0,0,0,232,176Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,224V184H32a8,8,0,0,1-8-8V116A52,52,0,0,1,76,64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-2">support@secondlife.com</span>
            </div>
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="64" y="24" width="128" height="208" rx="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="64" x2="192" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="192" x2="192" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-2">(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-2">123 Market St, San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} SecondLife Marketplace. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
              <p className="text-gray-400">
                Get the latest listings and deals delivered to your inbox
              </p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full md:w-64 text-gray-900 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;