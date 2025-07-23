'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CustomToggle from './CustomToggle';
import TitleInput from './TitleInput';
import FontSizeControl from './FontSizeControl';
import BoldToggle from './BoldToggle';
import ColorPicker from './ColorPicker';

const FeedTitleCard = ({
  isCustomTitle, setIsCustomTitle,
  mainTitle, setMainTitle,
  mainTitleLink, setMainTitleLink,
  fontSize, setFontSize,
  isBold, setIsBold,
  backgroundColor, setBackgroundColor,
  fontColor, setFontColor
}) => {
  return (
    <div className="bg-white text-sm space-y-8 px-2 py-2 rounded-md ">
      {/* Toggle */}
      <CustomToggle isCustomTitle={isCustomTitle} setIsCustomTitle={setIsCustomTitle} />

      {/* Animated content using AnimatePresence */}
      <AnimatePresence>
        {isCustomTitle && (
          <motion.div
            key="custom-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden space-y-6"
          >
            <TitleInput label="Main Title" value={mainTitle} setValue={setMainTitle} />
            <TitleInput label="Main Title Link" value={mainTitleLink} setValue={setMainTitleLink} />
            <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
            <BoldToggle isBold={isBold} setIsBold={setIsBold} />

            <div>
              <h3 className="text-md font-semibold mb-2">Colors</h3>
              <ColorPicker
                label="Background Color"
                value={backgroundColor}
                setValue={setBackgroundColor}
              />
              <ColorPicker
                label="Font Color"
                value={fontColor}
                setValue={setFontColor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedTitleCard;
