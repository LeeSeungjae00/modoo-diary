import React from "react";

type RadioListType = {
  inputArg: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  lable: string;
};

export default function Radio({ radioList }: { radioList: RadioListType[] }) {
  return (
    <ul
      id="region"
      className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      {radioList.map((radioItem) => {
        return (
          <li
            key={radioItem.lable}
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          >
            <div className="flex items-center pl-3">
              <input
                {...radioItem.inputArg}
                type="radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {radioItem.lable}
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
