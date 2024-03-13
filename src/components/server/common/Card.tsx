import React from "react";

export default function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      {title && (
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}
