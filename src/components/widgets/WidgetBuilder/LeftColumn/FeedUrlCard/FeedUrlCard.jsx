'use client';


const FeedUrlCard = () => {
  return (

      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="http://rss.feedspot.com/folder/869089/rss"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600">
            ➤
          </button>
        </div>
        <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
          <option>Homepage</option>
          <option>Sports</option>
          <option>News</option>
        </select>
      </div>
  );
};

export default FeedUrlCard;
