'use client';

import { LayoutGrid, List, Rows3 } from 'lucide-react';

const FollowingViewsCard = ({ viewType, setViewType }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <span>Following Views</span>
      <div className="flex gap-2">
        <button
          onClick={() => setViewType('magazine')}
          className={`p-1.5 border rounded ${viewType === 'magazine' ? 'bg-gray-200' : ''}`}
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => setViewType('list')}
          className={`p-1.5 border rounded ${viewType === 'list' ? 'bg-gray-200' : ''}`}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => setViewType('grid')}
          className={`p-1.5 border rounded ${viewType === 'grid' ? 'bg-gray-200' : ''}`}
        >
          <Rows3 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FollowingViewsCard;
