'use client';

import { useState } from 'react';

const PreviewBox = ({
  blogs,
  viewType,
  widgetName,
  magazineStyle,
  fontStyle,
  textAlign,
  widthValue,
  heightValue,
  widthMode,
  heightMode,
  borderColor,
  borderEnabled,
  cornerStyle,
  padding,
  spacing,
  previewRef,
}) => {
  const [selectedTitle, setSelectedTitle] = useState('');

  const getWidth = () => (widthMode === 'pixels' ? `${widthValue}px` : '100%');
  const getHeight = () => (heightMode === 'pixels' ? `${heightValue}px` : 'auto');

  const containerStyle = {
    width: getWidth(),
    height: getHeight(),
    fontFamily: fontStyle,
    textAlign: textAlign,
    border: borderEnabled ? `1px solid ${borderColor}` : 'none',
    borderRadius:
      cornerStyle === 'rounded'
        ? '12px'
        : cornerStyle === 'pill'
        ? '999px'
        : '0px',
    padding: `${padding}px`,
    gap: `${spacing}px`,
  };

  return (
    <div className="mt-4  ">
      <h2 className="text-md font-semibold mb-2">
  {blogs.length > 0 ? blogs[0].category || 'Live Preview' : 'Live Preview'}
</h2>


      <div
        ref={previewRef}
        className="border border-gray-300 rounded overflow-auto scrollbar-hide text-sm text-gray-700"
        style={containerStyle}
      >
        {/* ✅ Widget title display */}
        {widgetName && widgetName.trim() !== '' && (
          <h3 className="font-semibold text-gray-800 text-base px-3 py-2 border-b border-gray-200">
            {widgetName}
          </h3>
        )}

        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center">No blog posts available.</p>
        ) : (
          <>
            {/* ─────────────── Magazine Small */}
            {viewType === 'magazine' && magazineStyle === 'small' && (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id || blog.url} className="flex gap-3 items-start">
                    <img
                      src={blog.image || blog.image_url}
                      alt={blog.title}
                      className="w-24 h-20 object-cover rounded"
                    />
                    <div>
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-700 hover:underline cursor-pointer"
                        onClick={() => setSelectedTitle(blog.title)}
                      >
                        {blog.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─────────────── Magazine Large */}
            {viewType === 'magazine' && magazineStyle === 'large' && (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id || blog.url} className="border rounded overflow-hidden">
                    <img
                      src={blog.image || blog.image_url}
                      alt={blog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2">
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-700 hover:underline cursor-pointer"
                        onClick={() => setSelectedTitle(blog.title)}
                      >
                        {blog.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─────────────── List */}
            {viewType === 'list' && (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id || blog.url}
                    className="flex gap-3 items-start border-b pb-2"
                  >
                    <img
                      src={blog.image || blog.image_url}
                      alt={blog.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                        onClick={() => setSelectedTitle(blog.title)}
                      >
                        {blog.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─────────────── Grid */}
            {viewType === 'grid' && (
              <div className="grid grid-cols-2 gap-3">
                {blogs.map((blog) => (
                  <div key={blog.id || blog.url} className="border rounded p-2 bg-gray-50">
                    <img
                      src={blog.image || blog.image_url}
                      alt={blog.title}
                      className="w-full h-24 object-cover rounded mb-1"
                    />
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                      onClick={() => setSelectedTitle(blog.title)}
                    >
                      {blog.title}
                    </a>
                    <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewBox;
