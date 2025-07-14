// components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="bg-white p-6  mt-4 ">
      {/* Centered Title and Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold mb-2">Feedspot Widgets</h1>
        <h2 className="text-2xl text-gray-600">Embed RSS Widget on your Website</h2>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Paragraph */}
        <div className="lg:w-1/2 text-gray-700 mb-4 lg:mb-0">
          <p>
            Feedspot Widget is a handy widget which lets you embed and display latest updates from your favourite sources 
            (Blogs, News Websites, Podcasts, YouTube Channels, RSS Feeds, etc) on your website. <a href="#" className="text-blue-500">Watch Video</a>
          </p>
        </div>

        {/* Step Instructions */}
        <div className="lg:w-1/2 text-gray-700 space-y-1">
          <p><strong>Step 1</strong> - Get started by adding your favourite websites... <a href="#" className="text-blue-500">Watch Video</a></p>
          <p><strong>Step 2</strong> - Customize the look and feel of the widget.</p>
          <p><strong>Step 3</strong> - Click on "Save and Get Code"... </p>
          <p><strong>Step 4</strong> - Widget updates automatically...</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
