'use client';

import WidthControl from './WidthControl';
import HeightControl from './HeightControl';
import AutoScrollToggle from './AutoScrollToggle';
import FontStyleSelector from './FontStyleSelector';
import TextAlignSelector from './TextAlignSelector';
import BorderToggle from './BorderToggle';
import BorderColorPicker from './BorderColorPicker';
import CornerSelector from './CornerSelector';
import PaddingControl from './PaddingControl';
import SpacingControl from './SpacingControl';

const GeneralSettings = ({
  widthMode,
  setWidthMode,
  widthValue,
  setWidthValue,
  heightMode,
  setHeightMode,
  heightValue,
  setHeightValue,
  autoScroll,
  setAutoScroll,
  fontStyle,
  setFontStyle,
  textAlign,
  setTextAlign,
  borderEnabled,
  setBorderEnabled,
  borderColor,
  setBorderColor,
  cornerStyle,
  setCornerStyle,
  padding,
  setPadding,
  spacing,
  setSpacing
}) => {
  return (
    <div className="bg-white text-sm space-y-8 px-4 py-2">
      <WidthControl
        widthMode={widthMode}
        setWidthMode={setWidthMode}
        widthValue={widthValue}
        setWidthValue={setWidthValue}
      />
      <HeightControl
        heightMode={heightMode}
        setHeightMode={setHeightMode}
        heightValue={heightValue}
        setHeightValue={setHeightValue}
      />
      <AutoScrollToggle autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
      <FontStyleSelector fontStyle={fontStyle} setFontStyle={setFontStyle} />
      <TextAlignSelector textAlign={textAlign} setTextAlign={setTextAlign} />
      <BorderToggle borderEnabled={borderEnabled} setBorderEnabled={setBorderEnabled} />
      <BorderColorPicker borderColor={borderColor} setBorderColor={setBorderColor} />
      <CornerSelector cornerStyle={cornerStyle} setCornerStyle={setCornerStyle} />
      <PaddingControl padding={padding} setPadding={setPadding} />
      <SpacingControl spacing={spacing} setSpacing={setSpacing} />
    </div>
  );
};

export default GeneralSettings;
