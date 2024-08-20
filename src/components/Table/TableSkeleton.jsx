import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

// Component for displaying a skeleton loader for the table
const TableSkeleton = () => {
  // Number of skeleton blocks to be displayed
  var blockCount = 5;

  return (
    // Main card container for the skeleton loader
    <Card className="w-full space-y-5 p-4" radius="lg">
      {/* Header skeleton block */}
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-secondary"></div>
      </Skeleton>

      {/* Skeleton blocks for table rows */}
      {[...Array(blockCount)].map((_, i) => (
        <div key={i} className="flex justify-between">
          {/* Skeleton block for each column */}
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
          </Skeleton>
        </div>
      ))}
    </Card>
  );
};

export default TableSkeleton;
