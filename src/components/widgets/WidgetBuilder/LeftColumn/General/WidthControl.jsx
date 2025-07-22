'use client';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const WidthControl = ({ widthMode, setWidthMode, widthValue, setWidthValue }) => {
  return (
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
            onClick={() => setWidthValue((prev) => prev - 10)}
          >
            <Minus size={16} />
          </motion.button>

          <input
            type="text"
            className="w-32 text-center py-1"
            value={widthValue}
            readOnly
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
            onClick={() => setWidthValue((prev) => prev + 10)}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default WidthControl;
