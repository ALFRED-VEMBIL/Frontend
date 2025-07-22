    'use client';

    import WidgetNameInput from './WidgetNameInput';
    import PreviewBox from './PreviewBox';
    import PreviewActions from './SaveResetButtons';

    const PreviewSection = ({
    widgetName,
    setWidgetName,
    blogs,
    viewType,
    magazineStyle,
    fontStyle,
    textAlign,
    widthValue,
    heightValue,
    widthMode,
    heightMode,
    borderColor,
    borderEnabled,
    cornerStyle,
    padding,
    spacing,
    previewRef,
    handleSave,
    handleReset,
    }) => {
    return (
        <div className="space-y-4 sticky top-4 h-fit flex-1 min-w-[300px] self-start">
        <WidgetNameInput
            widgetName={widgetName}
            setWidgetName={setWidgetName}
        />

        <PreviewActions
            handleSave={handleSave}
            handleReset={handleReset}
        />

        <PreviewBox
            blogs={blogs}
            viewType={viewType}
            magazineStyle={magazineStyle}
            fontStyle={fontStyle}
            textAlign={textAlign}
            widthValue={widthValue}
            heightValue={heightValue}
            widthMode={widthMode}
            heightMode={heightMode}
            borderColor={borderColor}
            borderEnabled={borderEnabled}
            cornerStyle={cornerStyle}
            padding={padding}
            spacing={spacing}
            previewRef={previewRef}
        
        />
        </div>
    );
    };

    export default PreviewSection;
