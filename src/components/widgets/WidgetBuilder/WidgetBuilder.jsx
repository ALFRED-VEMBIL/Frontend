'use client';
import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { SelectedBlogContext } from "@/app/widgets/layout.js";
import { useSearchParams, useRouter } from "next/navigation";

import FeedTitleCard from './LeftColumn/FeedTitle/FeedTitleCard';
import GeneralSettings from './LeftColumn/General/GeneralSettings';
import PreviewSection from './RightColumn/PreviewSection';
import FeedUrlCard from './LeftColumn/FeedUrlCard/FeedUrlCard';
import FollowingViewsCard from './LeftColumn/FollowingViews/FollowingViewsCard';
import ViewStyleSelector from './LeftColumn/FollowingViews/ViewStyleSelector'; 

const Section = ({ title, children }) => (
  <div className="border border-gray-200 rounded bg-white">
    <header className="px-3 py-2 text-xl font-semibold bg-gray-100 text-cyan-800 border-b border-gray-300">
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
const [category, setCategory] = useState('');

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

const [borderColor, setBorderColor] = useState('#0e7490');
const [cornerStyle, setCornerStyle] = useState('Square'); // 'rounded' or 'square'

const [padding, setPadding] = useState(10);
const [spacing, setSpacing] = useState(10);

const [isCustomTitle, setIsCustomTitle] = useState(false);
const [mainTitle, setMainTitle] = useState("Default Title");
const [mainTitleLink, setMainTitleLink] = useState("");
const [fontSize, setFontSize] = useState(18);
const [isBold, setIsBold] = useState(false);
const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
const [fontColor, setFontColor] = useState("#0e7490");




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
    category: category,

    image: selectedBlog?.image || "",
     // Add FeedTitle & General customization values:
    background_color: backgroundColor,
    font_color: fontColor,
    font_size: fontSize,
    is_bold: isBold,
    is_custom_title: isCustomTitle,
    // Add any other general settings like padding, spacing, etc.
    padding: padding,
    spacing: spacing,
    border_enabled: borderEnabled,
    border_color: borderColor,
    font_style: fontStyle,
    text_align: textAlign,
    corner_style: cornerStyle,
    title: mainTitle,
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
    setCategory(selectedBlog.category || '');
    setFeedUrl(selectedBlog.url || '');
   
  }
}, [selectedBlog, editId]);

useEffect(() => {
  const fetchBlogs = async () => {
    if (editId) return; // ❌ Don't fetch blogs in edit mode

    if (selectedBlog && selectedBlog.id !== undefined && selectedBlog.id !== null) {
      try {
        const res = await fetch(`http://localhost:8080/feedspotclone/search.php?category=${selectedBlog.category}`);
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
        setBorderEnabled(widget.border_enabled !== "false" && widget.border_enabled !== false);
        setBorderColor(widget.border_color || "#cccccc");
        setCornerStyle(widget.corner_style || "square");
        setPadding(Number(widget.padding) || 12);
        setSpacing(Number(widget.spacing) || 8);
        setCategory(widget.category || "");

        setBackgroundColor(widget.background_color || "#f3f4f6");
        setFontColor(widget.font_color || "#000000");
        setFontSize(widget.font_size || 14);
        setIsBold(widget.is_bold || false);
        setIsCustomTitle(widget.is_custom_title || false);
        setMainTitle(widget.title || "");
        setMainTitleLink(widget.main_title_link || "");

        // Build blog object
        const blogObj = {
  id: widget.id,
  title: widget.widget_name,
  url: widget.feed_url || "",
  image: widget.image || widget.image_url || "",
  category: widget.category || "", // ✅ this should exist
};


        setSelectedBlog(blogObj);
        setBlogs([blogObj]);
        setFeedUrl(widget.feed_url || "");
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
  setCategory('');


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
         <FeedUrlCard />
        </Section>
        <Section title={<FollowingViewsCard viewType={viewType} setViewType={setViewType} />}>
          <ViewStyleSelector
            viewType={viewType}
            magazineStyle={magazineStyle}
            setMagazineStyle={setMagazineStyle}
          />
        </Section>
{/*-----------------------------------------------------------------------------------------------------------------------------------------*/}

<Section title="General">
  <GeneralSettings
    widthMode={widthMode}
    setWidthMode={setWidthMode}
    widthValue={widthValue}
    setWidthValue={setWidthValue}
    heightMode={heightMode}
    setHeightMode={setHeightMode}
    heightValue={heightValue}
    setHeightValue={setHeightValue}
    autoScroll={autoScroll}
    setAutoScroll={setAutoScroll}
    fontStyle={fontStyle}
    setFontStyle={setFontStyle}
    textAlign={textAlign}
    setTextAlign={setTextAlign}
    borderEnabled={borderEnabled}
    setBorderEnabled={setBorderEnabled}
    borderColor={borderColor}
    setBorderColor={setBorderColor}
    cornerStyle={cornerStyle}
    setCornerStyle={setCornerStyle}
    padding={padding}
    setPadding={setPadding}
    spacing={spacing}
    setSpacing={setSpacing}
  />
</Section>


<Section title="Feed Title">
      <FeedTitleCard
      isCustomTitle={isCustomTitle} setIsCustomTitle={setIsCustomTitle}
  mainTitle={mainTitle} setMainTitle={setMainTitle}
  mainTitleLink={mainTitleLink} setMainTitleLink={setMainTitleLink}
  fontSize={fontSize} setFontSize={setFontSize}
  isBold={isBold} setIsBold={setIsBold}
  backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
  fontColor={fontColor} setFontColor={setFontColor}
     />
</Section>

</div>

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
  isCustomTitle={isCustomTitle}
  mainTitle={mainTitle}
  mainTitleLink={mainTitleLink}
  fontSize={fontSize}
  isBold={isBold}
  backgroundColor={backgroundColor}
  fontColor={fontColor}
  category={category}
  setCategory={setCategory}
/>




    </div>
    </div>
  );
};


export default WidgetBuilder;
