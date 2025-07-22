'use client';
import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { SelectedBlogContext } from "@/app/widgets/layout.js";
import { useSearchParams, useRouter } from "next/navigation";

import FeedTitleCard from './LeftColumn/FeedTitle/FeedTitleCard';
import SpacingControl from './LeftColumn/General/SpacingControl';
import PaddingControl from './LeftColumn/General/PaddingControl';
import CornerSelector from './LeftColumn/General/CornerSelector';
import BorderColorPicker from './LeftColumn/General/BorderColorPicker';
import BorderToggle from './LeftColumn/General/BorderToggle';
import TextAlignSelector from './LeftColumn/General/TextAlignSelector';
import FontStyleSelector from './LeftColumn/General/FontStyleSelector';
import AutoScrollToggle from './LeftColumn/General/AutoScrollToggle';
import HeightControl from './LeftColumn/General/HeightControl';
import WidthControl from './LeftColumn/General/WidthControl';
import PreviewSection from './RightColumn/PreviewSection';



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
const { selectedBlog, setSelectedBlog } = useContext(SelectedBlogContext);

const [viewType, setViewType] = useState('magazine');
const [magazineStyle, setMagazineStyle] = useState('small');
const [widthMode, setWidthMode] = useState("responsive");
const [widthValue, setWidthValue] = useState(350);
const [topic, setTopic] = useState('');
const [feedUrl, setFeedUrl] = useState('');

const [selectedTitle, setSelectedTitle] = useState('');

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

const [padding, setPadding] = useState(10);
const [spacing, setSpacing] = useState(10);

const [isCustomTitle, setIsCustomTitle] = useState(false);
const [mainTitle, setMainTitle] = useState('');
const [mainTitleLink, setMainTitleLink] = useState('');
const [fontSize, setFontSize] = useState(13);
const [isBold, setIsBold] = useState(false);
const [backgroundColor, setBackgroundColor] = useState('#ffffff');
const [fontColor, setFontColor] = useState('#acadae');





const handleSave = async () => {
  console.log("DEBUG START ----------------------");

  console.log("selectedBlog", selectedBlog);               // full object
  console.log("selectedBlog?.url", selectedBlog?.url);     // specific URL
  console.log("feedUrl", feedUrl);                         // form field
  const effectiveFeedUrl = (feedUrl?.trim() || selectedBlog?.url?.trim() || "").trim();
  console.log("effectiveFeedUrl", effectiveFeedUrl);

  if (!effectiveFeedUrl) {
    alert("❌ Please select a blog (topic) or enter a feed URL.");
    return;
  }

  const widgetData = {
    user_id: 1,
    widget_name: widgetName,
    feed_url: effectiveFeedUrl,
    layout: viewType,
    sublayout: magazineStyle,
    width_mode: widthMode,
    width_value: widthValue,
    height_mode: heightMode,
    height_value: heightValue,
    topic: topic,
    image: selectedBlog?.image || "",
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widgetData),
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




useEffect(() => {
  if (!editId && selectedBlog) {
    setTopic(selectedBlog.title || '');
    setFeedUrl(selectedBlog.url || '');
   
  }
}, [selectedBlog, editId]);

useEffect(() => {
  const fetchBlogs = async () => {
    if (editId) return; // ❌ Don't fetch blogs in edit mode

    if (selectedBlog && selectedBlog.id !== undefined && selectedBlog.id !== null) {
      try {
        const res = await fetch(`http://localhost:8080/feedspotclone/search.php?id=${selectedBlog.id}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
          const fullBlog = data[0];
          setSelectedBlog(fullBlog);
          setFeedUrl(fullBlog.url || "");
        }
      } catch (err) {
        console.error("Error fetching filtered blogs", err);
      }
    } else {
      try {
        const res = await fetch("http://localhost:8080/feedspotclone/blogs.php");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs", err);
      }
    }
  };

  fetchBlogs();
}, [selectedBlog, editId]);


useEffect(() => {
  if (!editId) return;

  setLoading(true);

  fetch(`http://localhost:8080/feedspotclone/getWidgets.php?id=${editId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const w = data.data;

        let widget = {};
        try {
          widget = typeof w.widget === "string" ? JSON.parse(w.widget) : w.widget || {};
        } catch (err) {
          console.error("Failed to parse widget JSON:", w.widget, err);
          widget = {};
        }

        // Fill all settings from widget
        setWidgetName(widget.widget_name || "");
        setViewType(widget.layout || "magazine");
        setMagazineStyle(widget.sublayout || "small");
        setWidthMode(widget.width_mode || "pixels");
        setWidthValue(Number(widget.width_value) || 300);
        setHeightMode(widget.height_mode || "pixels");
        setHeightValue(Number(widget.height_value) || 300);
        setFontStyle(widget.font_style || "inherit");
        setTextAlign(widget.text_align || "left");
        setBorderEnabled(widget.border_enabled !== "false");
        setBorderColor(widget.border_color || "#cccccc");
        setCornerStyle(widget.corner_style || "square");
        setPadding(Number(widget.padding) || 12);
        setSpacing(Number(widget.spacing) || 8);
        setTopic(widget.topic || "");

        // ✅ Build a single blog object from widget
const blogObj = {
  id: widget.id,
  title: widget.topic || widget.widget_name,
  url: widget.feed_url || "",
  image: widget.image || widget.image_url || "",  // ← Add this
  category: widget.category || "",                // ← Add this
};
        


setSelectedBlog(blogObj);
setBlogs([blogObj]);
setFeedUrl(widget.feed_url || "");
setFeedUrl(widget.image || "");

      } else {
        alert("Failed to load widget: " + data.error);
      }
    })
    .catch((err) => {
      console.error("Error fetching widget", err);
      alert("Could not load widget.");
    })
    .finally(() => setLoading(false));
}, [editId]);





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



const handleReset = () => {
  setWidgetName('');
  setBlogs([]);
  setViewType('magazine');
  setMagazineStyle('small');
  setWidthMode("responsive");
  setWidthValue(350);
  setHeightMode("pixels");
  setHeightValue(510);
  setAutoScroll(false);
  setFontStyle("Arial, Helvetica, sans-serif");
  setTextAlign("left");
  setBorderEnabled(true);
  setBorderColor('#d61445');
  setCornerStyle('rounded');
  setPadding(10);
  setSpacing(10);

  // Feed & Blog Info
  setSelectedBlog(null);
  setFeedUrl('');
  setTopic('');

  // Title Styling
  setIsCustomTitle(false);
  setMainTitle('');
  setMainTitleLink('');
  setFontSize(13);
  setIsBold(false);
  setBackgroundColor('#ffffff');
  setFontColor('#acadae');
};


  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full top-4 p-4 bg-white">


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
    <WidthControl
      widthMode={widthMode}
      setWidthMode={setWidthMode}
      widthValue={widthValue}
      setWidthValue={setWidthValue}
    />
    <HeightControl
      heightMode={heightMode}
      setHeightMode={setHeightMode}
      heightValue={heightValue}
      setHeightValue={setHeightValue}
    />
    <AutoScrollToggle autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
    <FontStyleSelector fontStyle={fontStyle} setFontStyle={setFontStyle} />
    <TextAlignSelector textAlign={textAlign} setTextAlign={setTextAlign} />
    <BorderToggle borderEnabled={borderEnabled} setBorderEnabled={setBorderEnabled} />
    <BorderColorPicker borderColor={borderColor} setBorderColor={setBorderColor} />
    <CornerSelector cornerStyle={cornerStyle} setCornerStyle={setCornerStyle} />
    <PaddingControl padding={padding} setPadding={setPadding} />
    <SpacingControl spacing={spacing} setSpacing={setSpacing} />



  </div>
</Section>
<Section>
      <FeedTitleCard
      isCustomTitle={isCustomTitle}
      setIsCustomTitle={setIsCustomTitle}
      mainTitle={mainTitle}
      setMainTitle={setMainTitle}
      mainTitleLink={mainTitleLink}
      setMainTitleLink={setMainTitleLink}
      fontSize={fontSize}
      setFontSize={setFontSize}
      isBold={isBold}
      setIsBold={setIsBold}
      backgroundColor={backgroundColor}
      setBackgroundColor={setBackgroundColor}
      fontColor={fontColor}
      setFontColor={setFontColor}
     />
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
  <PreviewSection
  widgetName={widgetName}
  setWidgetName={setWidgetName}
  blogs={blogs}
  viewType={viewType}
  magazineStyle={magazineStyle}
  fontStyle={fontStyle}
  textAlign={textAlign}
  widthValue={widthValue}
  heightValue={heightValue}
  widthMode={widthMode}
  heightMode={heightMode}
  borderColor={borderColor}
  borderEnabled={borderEnabled}
  cornerStyle={cornerStyle}
  padding={padding}
  spacing={spacing}
  previewRef={previewRef}
  handleSave={handleSave}
  handleReset={handleReset}
/>


    </div>
    </div>
  );
};


export default WidgetBuilder;
