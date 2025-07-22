'use client';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const HeightControl = ({ heightMode, setHeightMode, heightValue, setHeightValue }) => {
  return (
    <div className="flex justify-between items-start">
      <div className="w-1/2">
        <label className="font-block mb-2">Height</label>
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
              onClick={() => setHeightValue(prev => prev - 10)}
            >
              <Minus size={16} />
            </motion.button>

            <input
              type="text"
              className="w-32 text-center py-1"
              value={heightValue}
              readOnly
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
              onClick={() => setHeightValue(prev => prev + 10)}
            >
              <Plus size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeightControl;
