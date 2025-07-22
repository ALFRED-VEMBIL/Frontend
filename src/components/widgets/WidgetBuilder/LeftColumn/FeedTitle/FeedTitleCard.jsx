'use client';
import React from 'react';
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
    <div className="border rounded bg-white shadow p-4 space-y-4">
      <h2 className="text-blue-600 text-lg font-bold border-b pb-1">Feed Title</h2>
      
      <CustomToggle isCustomTitle={isCustomTitle} setIsCustomTitle={setIsCustomTitle} />
      <TitleInput label="Main Title" value={mainTitle} setValue={setMainTitle} />
      <TitleInput label="Main Title Link" value={mainTitleLink} setValue={setMainTitleLink} />
      <FontSizeControl fontSize={fontSize} setFontSize={setFontSize} />
      <BoldToggle isBold={isBold} setIsBold={setIsBold} />

      <div>
        <h3 className="text-md font-semibold mt-2 mb-1">Colors</h3>
        <ColorPicker label="Background color" value={backgroundColor} setValue={setBackgroundColor} />
        <ColorPicker label="Font color" value={fontColor} setValue={setFontColor} />
      </div>
    </div>
  );
};

export default FeedTitleCard;
