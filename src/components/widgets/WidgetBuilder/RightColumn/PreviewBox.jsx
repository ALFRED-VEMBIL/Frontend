'use client';
import { useState, useMemo } from 'react';

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
  isCustomTitle,
  mainTitle,
  mainTitleLink,
  fontSize,
  isBold,
  category,
  fontColor,
  backgroundColor,
}) => {
  const [selectedTitle, setSelectedTitle] = useState('');

  const getWidth = () => (widthMode === 'pixels' ? `${widthValue}px` : '100%');
  const getHeight = () => (heightMode === 'pixels' ? `${heightValue}px` : 'auto');

  // ✅ Filtered Blogs by selected category
const filteredBlogs = useMemo(() => {
  if (!category || category === 'All') return blogs;
  return blogs.filter(blog =>
    blog.category?.toLowerCase().trim() === category.toLowerCase().trim()
  );
}, [blogs, category]);


  const defaultTitle = filteredBlogs.length > 0
    ? filteredBlogs[0].category || 'Live Preview'
    : 'Live Preview';

  const effectiveTitle = isCustomTitle && mainTitle?.trim() ? mainTitle : defaultTitle;

  return (
    <div
      ref={previewRef}
      style={{
        width: getWidth(),
        height: getHeight(),
        fontFamily: fontStyle,
        textAlign: textAlign,
        color: fontColor || '#000',
        border: borderEnabled ? `1px solid ${borderColor}` : 'none',
        borderRadius:
          cornerStyle === 'rounded' ? '12px' :
          cornerStyle === 'pill' ? '999px' :
          '0px',
        overflow: 'auto',
        backgroundColor: '#fff',
      }}
      className="scrollbar-hide text-sm"
    >
      {/* Title Section */}
      {(effectiveTitle || filteredBlogs.length > 0) && (
        <div
          className="sticky top-0 z-10 px-3 py-2 text-sm text-center"
          style={{
            backgroundColor: isCustomTitle ? (backgroundColor || '#f3f4f6') : '#f3f4f6',
            color: fontColor || '#000',
            fontSize: fontSize ? `${fontSize}px` : '14px',
            fontWeight: isBold ? 'bold' : 'normal',
          }}
        >
          {mainTitleLink ? (
            <a href={mainTitleLink} target="_blank" rel="noopener noreferrer">
              {effectiveTitle}
            </a>
          ) : (
            effectiveTitle
          )}
        </div>
      )}

      {/* Blog Content Section */}
      <div
        style={{
          padding: `${padding}px`,
          gap: `${spacing}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {widgetName && widgetName.trim() !== '' && (
          <h3 className="font-semibold text-base px-3 py-2 border-b border-gray-200">
            {widgetName}
          </h3>
        )}

        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-400">No blog posts available for this category.</p>
        ) : (
          <>
            {/* Magazine Small */}
            {viewType === 'magazine' && magazineStyle === 'small' && (
              <div className="space-y-4">
                {filteredBlogs.map(blog => (
                  <div key={blog.id || blog.url} className="flex gap-3 items-start">
                    <img src={blog.image || blog.image_url} alt={blog.title} className="w-24 h-20 object-cover rounded" />
                    <div>
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-cyan-700 hover:underline cursor-pointer"
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

            {/* Magazine Large */}
            {viewType === 'magazine' && magazineStyle === 'large' && (
              <div className="space-y-4">
                {filteredBlogs.map(blog => (
                  <div key={blog.id || blog.url} className="border rounded overflow-hidden">
                    <img src={blog.image || blog.image_url} alt={blog.title} className="w-full h-40 object-cover" />
                    <div className="p-2">
                      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline cursor-pointer">
                        {blog.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewType === 'list' && (
              <div className="space-y-4">
                {filteredBlogs.map(blog => (
                  <div key={blog.id || blog.url} className="flex gap-3 items-start border-b pb-2">
                    <img src={blog.image || blog.image_url} alt={blog.title} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                        {blog.title}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grid View */}
            {viewType === 'grid' && (
              <div className="grid grid-cols-2 gap-3">
                {filteredBlogs.map(blog => (
                  <div key={blog.id || blog.url} className="border rounded p-2 bg-gray-50">
                    <img src={blog.image || blog.image_url} alt={blog.title} className="w-full h-24 object-cover rounded mb-1" />
                    <a href={blog.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
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
