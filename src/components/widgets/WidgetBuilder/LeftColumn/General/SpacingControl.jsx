'use client';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const SpacingControl = ({ label = "Space Between Items", spacing, setSpacing }) => {
  return (
    <div className="flex justify-between items-start">
      <label className="w-1/2 font-block mb-2">{label}</label>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center"
            onClick={() => setSpacing((p) => p - 1)}
          >
            <Minus size={16} />
          </motion.button>

          <div className="w-32 text-center py-1">
            <span>{spacing}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
            onClick={() => setSpacing((p) => p + 1)}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SpacingControl;
