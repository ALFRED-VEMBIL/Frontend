// components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="bg-white px-6 py-10 "style={{ fontFamily: 'Helvetica' }}>
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2" >Feedspot Widgets</h1>
        <h3 className="text-2xl font-normal text-gray-600 mt-5">Embed RSS Widget on your Website</h3>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-6 lg:space-y-0">
        {/* Left paragraph */}
        <div className="lg:w-1/2 text-gray-800 leading-relaxed">
          <p>
            Feedspot Widget is a handy widget which lets you embed and display latest updates from your favourite sources 
            (Blogs, News Websites, Podcasts, Youtube Channels, RSS Feeds, etc) on your website.{' '}
            <a href="#" className="text-cyan-600 underline">Watch Video</a>
          </p>
        </div>

        {/* Right steps */}
        <div className="lg:w-1/2 text-gray-800 space-y-3 leading-relaxed">
          <p><strong>Step 1</strong> - Get started by adding your favourite websites to your account as content source for widget. <a href="#" className="text-cyan-600 underline">Watch Video</a></p>
          <p><strong>Step 2</strong> - Customize the look and feel of the widget to match your website style.</p>
          <p><strong>Step 3</strong> - Click on "Save and Get Code" button, copy the embed code and paste on your website.</p>
          <p><strong>Step 4</strong> - Widget updates automatically when new content is available.</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
