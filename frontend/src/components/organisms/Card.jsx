export const Card = ({ title, className, children, loading }) => (
  <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
    {loading ? (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/4"></div>
        </div>
      </div>
    ) : (
      <>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
      </>
    )}
  </div>
);
