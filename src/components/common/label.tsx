import React from "react";

export default function Label(
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) {
  return (
    <label
      {...props}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    ></label>
  );
}
