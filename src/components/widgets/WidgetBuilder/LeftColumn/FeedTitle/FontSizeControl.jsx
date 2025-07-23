
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';


const FontSizeControl = ({ fontSize, setFontSize }) => (
  <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Font Size</label>
    <div className="flex items-center gap-2">
        <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
         onClick={() => setFontSize(fontSize - 1)} className="bg-gray-400 text-white rounded-full w-7 h-7 flex items-center justify-center">
          <Minus size={16} />
        </motion.button>
    <div className="w-32 text-center py-1">
          <span>{fontSize}</span>
        </div>
        <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setFontSize(fontSize + 1)} className="bg-cyan-700 text-white rounded-full w-7 h-7 flex items-center justify-center"><Plus size={16} />
        </motion.button>
  </div>
  </div>
);
export default FontSizeControl;
