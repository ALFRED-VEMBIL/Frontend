'use client';
import { useState } from 'react';
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
  const [viewType, setViewType] = useState('list');

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-white max-h-screen overflow-auto">
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
        <Section title="Following Views">
          {/* View Toggle Buttons */}
          <div className="flex gap-2 mb-3 justify-end">
            <button onClick={() => setViewType('list')} className={`p-1.5 border rounded ${viewType === 'list' ? 'bg-gray-200' : ''}`}><List size={16} /></button>
            <button onClick={() => setViewType('compact')} className={`p-1.5 border rounded ${viewType === 'compact' ? 'bg-gray-200' : ''}`}><Rows3 size={16} /></button>
            <button onClick={() => setViewType('grid')} className={`p-1.5 border rounded ${viewType === 'grid' ? 'bg-gray-200' : ''}`}><LayoutGrid size={16} /></button>
          </div>

          {/* Feed Items */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/64x64?text=Img${i + 1}`}
                    alt="placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-700 leading-snug hover:underline cursor-pointer">
                    Dummy Article Title Goes Here {i + 1}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    By Dummy Author - Jun {21 + i}, 2019
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* General Settings (restored fully) */}
        <Section title="General">
          <div className="border border-gray-300 rounded bg-white text-sm">
            <div className="px-3 py-2 font-semibold bg-gray-100 border-b border-gray-300">
              General
            </div>
            <div className="p-4 space-y-4">
              {/* Width */}
              <div>
                <label className="block font-medium mb-1">Width</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="width" />
                    <span>In Pixels</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="width" defaultChecked />
                    <span>Responsive (Mobile friendly)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button className="bg-gray-200 rounded px-2">−</button>
                    <input type="text" className="w-20 text-center border rounded py-0.5" value="350" readOnly />
                    <button className="bg-gray-200 rounded px-2">+</button>
                  </div>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block font-medium mb-1">Height</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="height" defaultChecked />
                    <span>In Pixels</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="height" />
                    <span>Posts</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button className="bg-gray-200 rounded px-2">−</button>
                    <input type="text" className="w-20 text-center border rounded py-0.5" value="510" readOnly />
                    <button className="bg-gray-200 rounded px-2">+</button>
                  </div>
                </div>
              </div>

              {/* Autoscroll */}
              <div className="flex items-center justify-between">
                <span>Autoscroll</span>
                <div className="bg-blue-600 w-10 h-5 rounded-full flex items-center px-1">
                  <div className="bg-white w-4 h-4 rounded-full" />
                </div>
              </div>

              {/* Speed */}
              <div>
                <label className="block font-medium mb-1">Speed</label>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 rounded px-2">−</button>
                  <input type="text" className="w-16 text-center border rounded py-0.5" value="4" readOnly />
                  <button className="bg-gray-200 rounded px-2">+</button>
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
                  <button className="bg-gray-200 rounded px-2">−</button>
                  <input type="text" className="w-16 text-center border rounded py-0.5" value="5" readOnly />
                  <button className="bg-gray-200 rounded px-2">+</button>
                </div>
              </div>

              {/* Space Between Items */}
              <div>
                <label className="block font-medium mb-1">Space Between Items</label>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 rounded px-2">−</button>
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

        {/* Mountain Bike Blogs (Live Preview) */}
        <div className="border border-gray-300 rounded bg-white overflow-hidden">
          <div className="px-3 py-2 text-sm font-semibold bg-gray-100 border-b border-gray-300">
            Mountain Bike Blogs
          </div>
          <div className={`p-3 text-sm text-gray-700 ${
            viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-3'
          }`}>
            {blogData.map((item, idx) => {
              if (viewType === 'compact') {
                return (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} – {item.date}</p>
                  </div>
                );
              } else if (viewType === 'grid') {
                return (
                  <div key={idx} className="border border-gray-200 rounded p-3 bg-gray-50">
                    <p className="font-medium mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} – {item.date}</p>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="flex flex-col border border-gray-200 rounded p-3 bg-gray-50">
                    <p className="font-medium mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.author} – {item.date}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetBuilder;
