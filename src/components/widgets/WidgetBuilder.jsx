'use client';
import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { SelectedBlogContext } from "@/app/widgets/layout.js";

import {
  Save,
  RotateCcw,
  List,
  LayoutGrid,
  Rows3,
} from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="border border-gray-200 rounded bg-white">
    <header className="px-3 py-2 text-sm font-semibold bg-gray-100  border-b border-gray-300">
      {title}
    </header>
    <div className="p-4 space-y-4 text-sm">{children}</div>
  </div>
);

const WidgetBuilder = () => {
const { selectedBlog } = useContext(SelectedBlogContext);
const [viewType, setViewType] = useState('magazine');
const [magazineStyle, setMagazineStyle] = useState('small');
const [widthMode, setWidthMode] = useState("responsive");
const [widthValue, setWidthValue] = useState(350);

const [heightMode, setHeightMode] = useState("pixels");
const [heightValue, setHeightValue] = useState(510);

const [autoScroll, setAutoScroll] = useState(false);

const [speed, setSpeed] = useState(4);
const previewRef = useRef(null);


const [blogs, setBlogs] = useState([]);

useEffect(() => {
  if (selectedBlog) {
    console.log("selectedBlog inside WidgetBuilder:", selectedBlog);
    fetch(`http://localhost:8080/feedspotclone/search.php?id=${selectedBlog.id}`)

      .then((res) => res.json())
      .then((data) => {
        console.log("Filtered blogs response:", data);
        setBlogs(data);
      })
      .catch((err) => {
        console.error("Error fetching filtered blogs", err);
      });
  } else {
    fetch("http://localhost:8080/feedspotclone/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("All blogs response:", data);
        setBlogs(data);
      })
      .catch((err) => {
        console.error("Error fetching blogs", err);
      });
  }
}, [selectedBlog]);



useEffect(() => {
  let intervalId;

  if (autoScroll && previewRef.current) {
    intervalId = setInterval(() => {
      previewRef.current.scrollBy({
        top: 1, // scroll 1px per interval
        behavior: 'smooth'
      });
    }, 1000 / speed); // the higher the speed, the faster it scrolls
  }

  return () => clearInterval(intervalId);
}, [autoScroll, speed]);





  const blogData = [
    {
      title: 'Propain Joins the Lightweight eMTB Club',
      date: 'Jun 27, 2025',
      author: 'Bikerumor',
    },
    {
      title: 'What We Learned From Val di Sole',
      date: 'Jun 26, 2025',
      author: 'Vital MTB',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-white max-h-screen overflow-auto scrollbar-hide">
      {/* ─────────────── Left Column */}
      <div className="space-y-6 min-w-[300px]">

        {/* RSS Feed URL */}
        <Section title="RSS Feed URL">
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="http://rss.feedspot.com/folder/869089/rss"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600">
                ➤
              </button>
            </div>
            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option>Homepage</option>
              <option>Sports</option>
              <option>News</option>
            </select>
          </div>
        </Section>
{/* Following Views */}
<Section
  title={
    <div className="flex justify-between items-center w-full">
      <span>Following Views</span>
      <div className="flex gap-2">
        <button
          onClick={() => setViewType('magazine')}
          className={`p-1.5 border rounded ${
            viewType === 'magazine' ? 'bg-gray-200' : ''
          }`}
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => setViewType('list')}
          className={`p-1.5 border rounded ${
            viewType === 'list' ? 'bg-gray-200' : ''
          }`}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => setViewType('grid')}
          className={`p-1.5 border rounded ${
            viewType === 'grid' ? 'bg-gray-200' : ''
          }`}
        >
          <Rows3 size={16} />
        </button>
      </div>
    </div>
  }
>
  {/* Magazine style selector */}
  {viewType === 'magazine' && (
    <div className="flex justify-center items-center overflow-hidden mt-3">
      <div className="flex gap-2">
        <div
          className={`
            cursor-pointer
            border-2
            rounded
            overflow-hidden
            ${magazineStyle === 'small' ? 'border-blue-500' : 'border-gray-300'}
          `}
          onClick={() => setMagazineStyle('small')}
        >
          <img
            src="https://www.feedspot.com/widgets/Assets/images/template_images/4.webp"
            alt="small"
            className="max-w-full max-h-80 object-contain"
          />
        </div>
        <div
          className={`
            cursor-pointer
            border-2
            rounded
            overflow-hidden
            ${magazineStyle === 'large' ? 'border-blue-500' : 'border-gray-300'}
          `}
          onClick={() => setMagazineStyle('large')}
        >
          <img
            src="https://www.feedspot.com/widgets/Assets/images/template_images/5.webp"
            alt="large"
            className="max-w-full max-h-80 object-contain"
          />
        </div>
      </div>
    </div>
  )}

  {/* List style selector */}
  {viewType === 'list' && (
    <div className="flex justify-center items-center overflow-hidden mt-3">
      <div className="flex gap-2">
        <div
          className="cursor-pointer border-2 rounded overflow-hidden border-blue-500"
        >
          <img
            src="https://www.feedspot.com/widgets/Assets/images/template_images/1.webp"
            alt="list-style"
            className="max-w-full max-h-80 object-contain"
          />
        </div>
      </div>
    </div>
  )}

  {/* Grid style selector */}
  {viewType === 'grid' && (
    <div className="flex justify-center items-center overflow-hidden mt-3">
      <div className="flex gap-2">
        <div
          className="cursor-pointer border-2 rounded overflow-hidden border-blue-500"
        >
          <img
            src="https://www.feedspot.com/widgets/Assets/images/template_images/6.webp"
            alt="grid-style"
            className="max-w-full max-h-80 object-contain"
          />
        </div>
      </div>
    </div>
  )}
</Section>

{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* General Settings */}
        <Section title="General">
          <div className="border border-gray-300 rounded bg-white text-sm">
         
            <div className="p-4 space-y-4">
              {/* Width */}
             
              <label className="block font-medium mb-1">Width</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="width"
                      checked={widthMode === "pixels"}
                      onChange={() => setWidthMode("pixels")}
                    />
                    <span>In Pixels</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="width"
                      checked={widthMode === "responsive"}
                      onChange={() => setWidthMode("responsive")}
                    />
                    <span>Responsive (Mobile friendly)</span>
                  </label>
                  {widthMode === "pixels" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setWidthValue((prev) => prev - 10)}
                        className="bg-gray-200 rounded px-2"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-20 text-center border rounded py-0.5"
                        value={widthValue}
                        readOnly
                      />
                      <button
                        onClick={() => setWidthValue((prev) => prev + 10)}
                        className="bg-gray-200 rounded px-2"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

             

              {/* Height */}
              <label className="block font-medium mb-1">Height</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="height"
                    checked={heightMode === "pixels"}
                    onChange={() => setHeightMode("pixels")}
                  />
                  <span>In Pixels</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="height"
                    checked={heightMode === "posts"}
                    onChange={() => setHeightMode("posts")}
                  />
                  <span>Posts</span>
                </label>
                {heightMode === "pixels" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHeightValue((prev) => prev - 10)}
                      className="bg-gray-200 rounded px-2"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-20 text-center border rounded py-0.5"
                      value={heightValue}
                      readOnly
                    />
                    <button
                      onClick={() => setHeightValue((prev) => prev + 10)}
                      className="bg-gray-200 rounded px-2"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>


              {/* Autoscroll */}
              <div className="flex items-center justify-between">
                <span>Autoscroll</span>
                <div
                  className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${
                    autoScroll ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  onClick={() => setAutoScroll((prev) => !prev)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transition-transform ${
                      autoScroll ? "translate-x-5" : ""
                    }`}
                  />
                </div>
              </div>


              {/* Speed */}
              <div>
                <label className="block font-medium mb-1">Speed</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSpeed((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-200 rounded px-2"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-16 text-center border rounded py-0.5"
                    value={speed}
                    readOnly
                  />
                  <button
                    onClick={() => setSpeed((prev) => prev + 1)}
                    className="bg-gray-200 rounded px-2"
                  >
                    +
                  </button>
                </div>
              </div>


              {/* Open links */}
              <div>
                <label className="block font-medium mb-1">Open links</label>
                <select className="w-full border rounded px-2 py-1">
                  <option>New window</option>
                  <option>Same tab</option>
                </select>
              </div>

              {/* Font style */}
              <div>
                <label className="block font-medium mb-1">Font Style</label>
                <select className="w-full border rounded px-2 py-1">
                  <option>Arial, Helvetica, sans-serif</option>
                  <option>Georgia, serif</option>
                </select>
              </div>

              {/* Text alignment */}
              <div>
                <label className="block font-medium mb-1">Text alignment</label>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white w-8 h-8 rounded-sm" />
                  <button className="bg-gray-300 w-8 h-8 rounded-sm" />
                  <button className="bg-gray-300 w-8 h-8 rounded-sm" />
                </div>
              </div>

              {/* Border toggle */}
              <div className="flex items-center justify-between">
                <span>Border</span>
                <div className="bg-blue-600 w-10 h-5 rounded-full flex items-center px-1">
                  <div className="bg-white w-4 h-4 rounded-full" />
                </div>
              </div>

              {/* Border Color */}
              <div>
                <label className="block font-medium mb-1">Border color</label>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 border rounded" />
                  <input type="text" value="#dbdbdb" className="border rounded px-2 py-0.5" readOnly />
                </div>
              </div>

              {/* Corner */}
              <div>
                <label className="block font-medium mb-1">Corner</label>
                <div className="flex gap-2">
                  <button className="bg-gray-300 px-4 py-1 rounded-sm">Square</button>
                  <button className="border px-4 py-1 rounded">Rounded</button>
                </div>
              </div>

              {/* CSS Link */}
              <div>
                <label className="block font-medium mb-1">Custom CSS link</label>
                <input type="text" className="w-full border rounded px-2 py-1" placeholder="https://example.com/styles.css" />
              </div>

              {/* Padding */}
              <div>
                <label className="block font-medium mb-1">Padding</label>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 rounded px-2">-</button>
                  <input type="text" className="w-16 text-center border rounded py-0.5" value="5" readOnly />
                  <button className="bg-gray-200 rounded px-2">+</button>
                </div>
              </div>

              {/* Space Between Items */}
              <div>
                <label className="block font-medium mb-1">Space Between Items</label>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 rounded px-2">-</button>
                  <input type="text" className="w-16 text-center border rounded py-0.5" value="10" readOnly />
                  <button className="bg-gray-200 rounded px-2">+</button>
                </div>
              </div>

              {/* Divider toggle */}
              <div className="flex items-center justify-between">
                <span>Divider B/W Items</span>
                <div className="bg-gray-400 w-10 h-5 rounded-full flex items-end px-1">
                  <div className="bg-white w-4 h-4 rounded-full" />
                </div>
              </div>

              {/* Advanced Settings */}
              <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 text-center">
                Advanced Settings ▼
              </button>
            </div>
          </div>
        </Section>
      </div>

{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}


      {/* ─────────────── Right Column */}
      <div className="sticky top-4 h-fit flex-1 min-w-[300px] space-y-4 self-start">
        <input
          type="text"
          placeholder="Enter Widget Name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
        />

        {/* Save/Reset Buttons */}
        <div className="flex gap-2 justify-end">
          <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm font-semibold px-3 py-1.5 rounded shadow-sm">
            <Save size={14} /> Save & Get Code
          </button>
          <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded shadow-sm">
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div
  ref={previewRef}
  className="border border-gray-300 rounded p-3 text-sm text-gray-700 space-y-3 overflow-auto scrollbar-hide"
  style={{
    height: heightMode === "pixels" ? `${heightValue}px` : undefined,
    width: widthMode === "pixels" ? `${widthValue}px` : "100%",
  }}
>
  {/* magazine preview */}
  {viewType === "magazine" && magazineStyle === "small" && (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="flex gap-3 items-start">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-24 h-20 object-cover rounded"
          />
          <div>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 hover:underline cursor-pointer"
            >
              {blog.title}
            </a>
            <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
          </div>
        </div>
      ))}
    </div>
  )}

  {viewType === "magazine" && magazineStyle === "large" && (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-2">
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-700 hover:underline cursor-pointer"
            >
              {blog.title}
            </a>
            <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* list preview */}
  {viewType === "list" && (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="flex gap-3 items-start border-b pb-2">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {blog.title}
            </a>
            <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* grid preview */}
  {viewType === "grid" && (
    <div className="grid grid-cols-2 gap-3">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded p-2 bg-gray-50">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-24 object-cover rounded mb-1"
          />
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            {blog.title}
          </a>
          <div className="text-xs text-gray-500 mt-1">{blog.category}</div>
        </div>
      ))}
    </div>
  )}
</div>


      </div>
    </div>
  );
};

export default WidgetBuilder;
