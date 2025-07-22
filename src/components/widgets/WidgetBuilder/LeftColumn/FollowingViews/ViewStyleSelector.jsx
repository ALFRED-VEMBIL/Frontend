'use client';

const ViewStyleSelector = ({ viewType, magazineStyle, setMagazineStyle }) => {
  return (
    <>
      {/* Magazine style selector */}
      {viewType === 'magazine' && (
        <div className="flex justify-center items-center overflow-hidden mt-3">
          <div className="flex gap-2">
            <div
              className={`
                cursor-pointer
                border-2
                rounded
                overflow-hidden
                ${magazineStyle === 'small' ? 'border-blue-500' : 'border-gray-300'}
              `}
              onClick={() => setMagazineStyle('small')}
            >
              <img
                src="https://www.feedspot.com/widgets/Assets/images/template_images/4.webp"
                alt="small"
                className="max-w-full max-h-80 object-contain"
              />
            </div>
            <div
              className={`
                cursor-pointer
                border-2
                rounded
                overflow-hidden
                ${magazineStyle === 'large' ? 'border-blue-500' : 'border-gray-300'}
              `}
              onClick={() => setMagazineStyle('large')}
            >
              <img
                src="https://www.feedspot.com/widgets/Assets/images/template_images/5.webp"
                alt="large"
                className="max-w-full max-h-80 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* List style selector */}
      {viewType === 'list' && (
        <div className="flex justify-center items-center overflow-hidden mt-3">
          <div className="flex gap-2">
            <div className="cursor-pointer border-2 rounded overflow-hidden border-blue-500">
              <img
                src="https://www.feedspot.com/widgets/Assets/images/template_images/1.webp"
                alt="list-style"
                className="max-w-full max-h-80 object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Grid style selector */}
      {viewType === 'grid' && (
        <div className="flex justify-center items-center overflow-hidden mt-3">
          <div className="flex gap-2">
            <div className="cursor-pointer border-2 rounded overflow-hidden border-blue-500">
              <img
                src="https://www.feedspot.com/widgets/Assets/images/template_images/6.webp"
                alt="grid-style"
                className="max-w-full max-h-80 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStyleSelector;
