// components/widgets/MyWidgets/TableSection.jsx
'use client';
import { useRouter } from 'next/navigation';

const TableSection = ({ widgets, handleDelete }) => {
  const router = useRouter();

  return (
    <div className="overflow-auto mt-6 border shadow max-w-[1000px] mx-auto">
      <table className="w-full border border-collapse text-sm min-w-[700px]">
        <thead>
          <tr className="bg-cyan-700 text-white">
            <th className="border px-4 py-2">Widget Name</th>
            <th className="border px-4 py-2">Feed URL</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {widgets.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-2">No widgets found</td>
            </tr>
          )}
          {widgets.map((w) => (
            <tr key={w.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{w.widget_name}</td>
              <td className="border px-4 py-2 max-w-[250px] truncate">
                <a
                  href={w.feed_url}
                  target="_blank"
                  className="text-blue-600 underline"
                  title={w.feed_url}
                >
                  {w.feed_url}
                </a>
              </td>
              <td className="border px-4 py-2 space-x-2 text-center">
                <button
                  onClick={() => handleDelete(w.id)}
                  className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                >
                  🗑 Delete
                </button>
                <button className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
                  Embed Code
                </button>
                <button
                  onClick={() => {
                    router.push(`/widgets/create?id=${w.id}`);
                  }}
                  className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                >
                  Edit Widget
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
