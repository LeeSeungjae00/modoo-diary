import React from "react";

export default function CenterFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto min-h-screen lg:py-0 ">
=======
    <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto min-h-screen ">
>>>>>>> Stashed changes
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
