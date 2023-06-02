import React from "react";

export default function FormContentSkeleton() {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
      <div className="flex items-center w-full space-x-2">
        <div className="p-2.5 bg-gray-300 rounded-md dark:bg-gray-600 w-full">
          &nbsp;
        </div>
      </div>
    </div>
  );
}
