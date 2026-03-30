interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  hasCheckbox?: boolean;
}

function SkeletonCell({ width = "w-full" }: { width?: string }) {
  return (
    <div className={`h-3.5 ${width} rounded-md bg-gradient-to-r from-[#f9e5f2] via-[#fdf0f9] to-[#f9e5f2] bg-[length:400%_100%] animate-shimmer`} />
  );
}

export function TableSkeleton({ rows = 6, columns = 6, hasCheckbox = true }: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#f9e5f2] px-[8px] py-[0px]">
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f9e5f2]">
              {hasCheckbox && (
                <th className="px-2 py-3 w-[60px]">
                  <div className="h-4 w-4 rounded bg-[#f9e5f2]" />
                </th>
              )}
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-2 py-3">
                  <div className="h-3 w-16 rounded-md bg-[#f9e5f2]" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-[#f9e5f2]">
                {hasCheckbox && (
                  <td className="px-2 py-4">
                    <div className="h-4 w-4 rounded bg-[#f9e5f2] animate-pulse" />
                  </td>
                )}
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-2 py-4">
                    <SkeletonCell width={colIdx === 0 ? "w-24" : colIdx === columns - 1 ? "w-10" : "w-full"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
