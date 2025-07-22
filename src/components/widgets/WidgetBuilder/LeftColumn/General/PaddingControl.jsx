'use client';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const PaddingControl = ({ padding, setPadding }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Padding</label>
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding((p) => p - 1)}
        >
          <Minus size={16} />
        </motion.button>

        <div className="w-32 text-center py-1">
          <span>{padding}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
          onClick={() => setPadding((p) => p + 1)}
        >
          <Plus size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export default PaddingControl;
