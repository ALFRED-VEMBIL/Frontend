'use client';
import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { SelectedBlogContext } from "@/app/widgets/layout.js";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


import {
  Save,
  RotateCcw,
  List,
  LayoutGrid,
  Rows3,
  Plus,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
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
const { selectedBlog, setSelectedBlog } = useContext(SelectedBlogContext);

const [viewType, setViewType] = useState('magazine');
const [magazineStyle, setMagazineStyle] = useState('small');
const [widthMode, setWidthMode] = useState("responsive");
const [widthValue, setWidthValue] = useState(350);
const [topic, setTopic] = useState('');
const [feedUrl, setFeedUrl] = useState('');


const [heightMode, setHeightMode] = useState("pixels");
const [heightValue, setHeightValue] = useState(510);

const [autoScroll, setAutoScroll] = useState(false);

const [widgetName, setWidgetName] = useState("");
const [loading, setLoading] = useState(false);


const [speed, setSpeed] = useState(4);
const previewRef = useRef(null);

const searchParams = useSearchParams();
const router = useRouter();
const editId = searchParams.get("id");

const [blogs, setBlogs] = useState([]);
const [fontStyle, setFontStyle] = useState("Arial, Helvetica, sans-serif");
const [textAlign, setTextAlign] = useState("left");
const [borderEnabled, setBorderEnabled] = useState(true);

const [borderColor, setBorderColor] = useState('#d61445');
const [cornerStyle, setCornerStyle] = useState('rounded'); // 'rounded' or 'square'
const [customCSS, setCustomCSS] = useState('');
const [padding, setPadding] = useState(5);
const [spacing, setSpacing] = useState(10);
const [showDivider, setShowDivider] = useState(false);




const handleSave = async () => {
  const effectiveFeedUrl = selectedBlog?.url || feedUrl;

  if (!effectiveFeedUrl) {
    alert("❌ Please select a blog (topic) or enter a feed URL.");
    return;
  }

  const widgetData = {
    user_id: 1, // ✅ TEMP STATIC — replace with dynamic user ID from auth later
    widget_name: widgetName,
    feed_url: effectiveFeedUrl,
    layout: viewType,
    sublayout: magazineStyle,
    width_mode: widthMode,
    width_value: widthValue,
    height_mode: heightMode,
    height_value: heightValue,
    topic: topic
  };

  if (editId) {
    widgetData.id = editId;
  }

  try {
    const url = editId
      ? "http://localhost:8080/feedspotclone/edit.php"
      : "http://localhost:8080/feedspotclone/saveWidgets.php";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(widgetData)
    });

    const data = await response.json();
    console.log("Saved/Updated widget response:", data);

    if (data.success) {
      alert(editId ? "✅ Widget updated!" : "✅ Widget saved!");
      router.push("/widgets");
    } else {
      alert("❌ Failed: " + data.error);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("❌ Could not save widget.");
  }
};



// When a blog is selected in Navbar, sync topic + feedUrl into form
useEffect(() => {
  if (selectedBlog) {
    setTopic(selectedBlog.title || '');
    setFeedUrl(selectedBlog.url || '');
  }
}, [selectedBlog]);



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
  if (!editId) return;

  setLoading(true); // Optional: show spinner if needed

  fetch(`http://localhost:8080/feedspotclone/getWidgets.php?id=${editId}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const w = data.data;

        setWidgetName(w.widget_name || "");
        setViewType(w.layout || "magazine");
        setMagazineStyle(w.sublayout || "small");
        setWidthMode(w.width_mode || "pixels");
        setWidthValue(Number(w.width_value) || 300);
        setHeightMode(w.height_mode || "pixels");
        setHeightValue(Number(w.height_value) || 300);
        setBlogs(Array.isArray(w.blogs) ? w.blogs : JSON.parse(w.blogs || "[]"));
        setFontStyle(w.font_style || "inherit");
        setTextAlign(w.text_align || "left");
        setBorderEnabled(w.border_enabled !== "false");
        setBorderColor(w.border_color || "#cccccc");
        setCornerStyle(w.corner_style || "square");
        setPadding(Number(w.padding) || 12);
        setSpacing(Number(w.spacing) || 8);
        setTopic(w.topic || '');
        setFeedUrl(w.feed_url || '');
        setSelectedBlog({
          id: w.id,
          title: w.topic || w.widget_name,
          url: w.feed_url || '',
        });
      } else {
        alert("Failed to load widget: " + data.error);
      }
    })
    .catch(err => {
      console.error("Error fetching widget", err);
      alert("Could not load widget.");
    })
    .finally(() => setLoading(false)); // Optional: hide spinner
}, [editId, setSelectedBlog]);




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





  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full top-4 p-4 bg-white max-h-screen overflow-y-scroll scrollbar-hide">

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

<Section title="General">
  <div className="bg-white text-sm space-y-5 px-4 py-2">
    {/* Width */}
    <div className="flex justify-between items-start">
      <div className="w-1/2">
        <label className="font-normal block mb-2">Width</label>
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
        </div>
      </div>

      {/* Pixel control */}
      {widthMode === "pixels" && (
        <div className="flex items-center gap-2">
          <button onClick={() => setWidthValue((prev) => prev - 10)} className="bg-gray-400 text-white rounded-full w-6 h-6">-</button>
          <input
            type="text"
            className="w-32 text-center py-1 "
            value={widthValue}
            readOnly
          />
          <button onClick={() => setWidthValue((prev) => prev + 10)} className="bg-cyan-700 text-white rounded-full w-6 h-6">+</button>
        </div>
      )}
    </div>

    {/* Height */}
    <div className="flex justify-between items-start">
      <div className="w-1/2">
        <label className="font- block mb-2">Height</label>
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
        </div>
      </div>

      <div className="space-y-3">
        {heightMode === "pixels" && (
          <div className="flex items-center gap-2">
            <button onClick={() => setHeightValue((prev) => prev - 10)} className="bg-gray-400 text-white rounded-full w-6 h-6">-</button>
            <input
              type="text"
              className="w-32 text-center  py-1 "
              value={heightValue}
              readOnly
            />
            <button onClick={() => setHeightValue((prev) => prev + 10)} className="bg-cyan-700 text-white rounded-full w-6 h-6">+</button>
          </div>
        )}

        
      </div>
    </div>

    {/* Autoscroll */}
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Autoscroll</label>
      <div
        className={`w-15 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-500 delay-75 ${
          autoScroll ? "bg-cyan-700" : "bg-gray-400"
        }`}
        onClick={() => setAutoScroll((prev) => !prev)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transition-all ease-in-out duration-500 delay-75 ${
            autoScroll ? "translate-x-8" : ""
          }`}
        />
      </div>
    </div>
    {/* Font Style */}
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Font Style</label>
      <select
        value={fontStyle}
        onChange={(e) => setFontStyle(e.target.value)}
        className="w-1/2 border rounded px-2 py-1"
      >
        <option value="Arial, Helvetica, sans-serif">Arial, Helvetica, sans-serif</option>
        <option value="Georgia, serif">Georgia, serif</option>
        <option value="Tahoma, sans-serif">Tahoma, sans-serif</option>
        <option value="Courier New, monospace">Courier New, monospace</option>
      </select>
    </div>
{/* Text Alignment */}
<div className="flex justify-between items-center">
  <label className="font-normal w-1/2">Text alignment</label>
  <div className="flex gap-2">
    <button
      onClick={() => setTextAlign("left")}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        textAlign === "left" ? "bg-cyan-700 text-white" : "bg-gray-400 text-white"
      }`}
    >
      <AlignLeft size={16} />
    </button>
    <button
      onClick={() => setTextAlign("center")}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        textAlign === "center" ? "bg-cyan-700 text-white" : "bg-gray-400 text-white"
      }`}
    >
      <AlignCenter size={16} />
    </button>
    <button
      onClick={() => setTextAlign("right")}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        textAlign === "right" ? "bg-cyan-700 text-white" : "bg-gray-400 text-white"
      }`}
    >
      <AlignRight size={16} />
    </button>
    <button
      onClick={() => setTextAlign("justify")}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        textAlign === "justify" ? "bg-cyan-700 text-white" : "bg-gray-400 text-white"
      }`}
    >
      <AlignJustify size={16} />
    </button>
  </div>
</div>


    {/* Border Toggle */}
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Border</label>
      <div
        className={`w-15 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-500 delay-75 ${
          borderEnabled ? "bg-cyan-700" : "bg-gray-400"
        }`}
        onClick={() => setBorderEnabled((prev) => !prev)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transition-all ease-in-out duration-500 delay-75 ${
            borderEnabled ? "translate-x-8 " : ""
          }`}
        />
      </div>
    </div>
 {/* Border Color */}
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Border color</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
        <input
          type="text"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="border px-2 py-1 text-sm rounded w-28"
        />
      </div>
    </div>

    {/* Corner Style */}
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Corner</label>
      <div className="flex gap-2">
        <button
          onClick={() => setCornerStyle('square')}
          className={ ` border  border-cyan-800 px-3 py-1 rounded ${cornerStyle === 'square' ? 'bg-cyan-700 text-white' : ''}`}
        >
          Square
        </button>
        <button
          onClick={() => setCornerStyle('rounded')}
          className={`border px-3 py-1 rounded ${cornerStyle === 'rounded' ? 'bg-cyan-700 text-white' : ''}`}
        >
          Rounded
        </button>
      </div>
    </div>



    {/* Padding */}
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Padding</label>
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding(p => p + 1)}
        >
          <Minus size={16} />
        </motion.button>

        <div className="w-32 text-center  py-1 "><span>{padding}</span></div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding(p => p + 1)}
        >
          <Plus size={16} />
        </motion.button>

      </div>
    </div>

    {/* Space Between Items */}
    <div className="flex justify-between items-start">
      <label className="w-1/2 font-block mb-2">Space Between Items</label>
      <div className='space-y-3'> 
        <div className="flex items-center space-y-3 gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding(p => p - 1)}
        >
          <Minus size={16} />
        </motion.button>
         <div className="w-32 text-center   py-1 "><span>{spacing}</span></div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding(p => p + 1)}
        >
          <Plus size={16} />
        </motion.button>
        </div>
      </div>
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
        value={widgetName }
        onChange={(e) => setWidgetName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
        />


        {/* Save/Reset Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm font-semibold px-3 py-1.5 rounded shadow-sm"
          >
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
            fontFamily: fontStyle,
            textAlign: textAlign,
            border: borderEnabled ? "1px solid #ccc" : "none",
            borderRadius: cornerStyle === 'rounded' ? '12px' : '0px',
            border: `1px solid ${borderColor}`,
            padding: `${padding}px`,
            gap: `${spacing}px`,
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
