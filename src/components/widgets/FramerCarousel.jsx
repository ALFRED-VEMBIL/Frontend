  'use client';

  import { useState, useRef } from 'react';
  import { motion } from 'framer-motion';
  import { ChevronLeft, ChevronRight } from 'lucide-react';

  const sampleBlogs = [
    { id: 1, image: "https://cdn.feedspot.com/widgets/Assets/images/examples/Capture8.PNG" },
    { id: 2, image: "https://cdn.feedspot.com/widgets/Assets/images/examples/techcrunch-list.png" },
    { id: 3, image: "https://cdn.feedspot.com/widgets/Assets/images/examples/Capture6.PNG" },
    { id: 4, image: "https://cdn.feedspot.com/widgets/Assets/images/examples/youtube.png" },
    { id: 5, image: "https://cdn.feedspot.com/widgets/Assets/images/examples/Capture7.PNG" },
  ];

  export default function FramerCarousel({ blogs = sampleBlogs }) {
    const visibleCount = 3;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef(null);

    const total = blogs.length;

    const handleNext = () => {
      setDirection(1);
      setIndex(prev => (prev + 1) % total);
    };

    const handlePrev = () => {
      setDirection(-1);
      setIndex(prev => (prev - 1 + total) % total);
    };

    const getVisibleBlogs = () => {
      if (index + visibleCount <= total) {
        return blogs.slice(index, index + visibleCount);
      } else {
        return [...blogs.slice(index), ...blogs.slice(0, (index + visibleCount) % total)];
      }
    };

    return (
      <div className="relative w-full bg-white py-6 overflow-hidden">
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-105"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            className="flex gap-2"
            initial={{ x: direction === 1 ? 200 : -200 }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {getVisibleBlogs().map((blog, i) => (
              <div key={blog.id} className="w-1/3 flex-shrink-0">
                <div className="w-full h-82 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={blog.image}
                    alt={`blog-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
